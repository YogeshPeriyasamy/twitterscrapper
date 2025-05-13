import React from 'react';

const Header = ({ input, setInput, fetchStats, handleRefresh }) => {
  return (
    <div className="header">
  <div className="left-controls">
    <input
      type="text"
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="@username1 @username2"
    />
    <button onClick={fetchStats}>Search</button>
  </div>
  <div className="right-controls">
    <button onClick={handleRefresh}>Refresh</button>
  </div>
</div>
  );
};

export default Header;
