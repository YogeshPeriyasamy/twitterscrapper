import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import StatCard from './components/StatCard';
import './styles.css';

const App = () => {
  const [input, setInput] = useState('');
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('twitterStats')) || [];
    setStats(localData);
  }, []);

  const fetchStats = async () => {
    if (!input.trim()) return;

    try {
      const response = await axios.get('/api/twitter-stats', {
        params: { username: input }
      });
      let localdata=JSON.parse(localStorage.getItem('twitterStats')) || [];
      let alldata=[...localdata, ...response.data];
      const sortedData = alldata.sort((a, b) => b.followers - a.followers);
      localStorage.setItem('twitterStats', JSON.stringify(sortedData));
      setStats(sortedData);
      //clear the input field bar
      setInput("");
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleRefresh = () => {
    localStorage.removeItem('twitterStats');  // Clear localStorage
    setStats([]);                             // Clear the stats container
  };

  return (
    <div className="app-container">
      <Header
        input={input}
        setInput={setInput}
        fetchStats={fetchStats}
        handleRefresh={handleRefresh}
      />
      <div className="stats-container">
        {stats.map((user, index) => (
          <StatCard key={index} data={user} />
        ))}
      </div>
    </div>
  );
};

export default App;
