import React from 'react';

const Header = ({ input, setInput, fetchStats, saveUser, manageUsernames }) => (
  <div className="header">
    <div className="left-controls">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="@username1 @username2"
      />
      <button onClick={saveUser}>Save</button>
    </div>
    <div className="right-controls">
      <button onClick={manageUsernames}>Manage Usernames</button>
      <button onClick={fetchStats}>Fetch</button>
    </div>
  </div>
);

export default Header;
