import React from 'react';

const StatCard = ({ data }) => {
  return (
    <div className="card">
      <div className="avatar-placeholder" />
      <div className="user-info">
        <div className="username">@{data.username}</div>
        <div className="stats">
          <span>Followers <strong>{data.followers}</strong></span>
          <span>Following <strong>{data.following}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
