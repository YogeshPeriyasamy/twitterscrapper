import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import StatCard from './components/StatCard';
import UsernamePanel from './components/UsernamePanel';
import './styles.css';

const App = () => {
  const [input, setInput] = useState('');
  const [stats, setStats] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('twitterStats')) || [];
    setStats(localData);
  }, []);
  
  const saveUser = () => {
    let existing = localStorage.getItem("usernames") || "";
    let updated = (existing + " " + input.trim()).trim();
    localStorage.setItem("usernames", updated);
    setInput("");
  }

  const fetchStats = async () => {
    try {
      let usernames = localStorage.getItem("usernames");
      const response = await axios.get('/api/twitter-stats', {
        params: { username: usernames }
      });
      localStorage.setItem('twitterStats', JSON.stringify(response.data));
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const togglePanel = () => setShowPanel(!showPanel);

  return (
    <div className="app-container">
      <Header
        input={input}
        setInput={setInput}
        fetchStats={fetchStats}
        saveUser={saveUser}
        manageUsernames={togglePanel}
      />
      
      <div className="stats-container">
        {stats.map((user, index) => (
          <StatCard key={index} data={user} />
        ))}
      </div>

      {showPanel && (
        <UsernamePanel
          setInput={setInput}
          closePanel={() => setShowPanel(false)}
        />
      )}
    </div>
  );
};

export default App;
