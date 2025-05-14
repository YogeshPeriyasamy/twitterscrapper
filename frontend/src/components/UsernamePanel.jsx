import React, { useState, useEffect } from 'react';

const UsernamePanel = ({ setInput, closePanel }) => {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('usernames') || '';
    setUsernames(stored.trim().split(/\s+/));
  }, []);

  const handleEdit = (name) => {
    const filtered = usernames.filter(n => n !== name);
    localStorage.setItem('usernames', filtered.join(" "));
    setUsernames(filtered);
    setInput(name);
    closePanel();
  };

  const handleDelete = (name) => {
    const filtered = usernames.filter(n => n !== name);
    localStorage.setItem('usernames', filtered.join(" "));
    setUsernames(filtered);
  };

  return (
    <div className="username-panel">
      <div className="username-panel-header">
        <span>Saved Usernames</span>
        <button onClick={closePanel}>✖</button>
      </div>
      <div className="username-list">
        {usernames.map((name, idx) => (
          <div key={idx} className="username-item">
            <span>{name}</span>
            <div className="username-actions">
              <button onClick={() => handleEdit(name)}>✏️</button>
              <button onClick={() => handleDelete(name)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsernamePanel;
