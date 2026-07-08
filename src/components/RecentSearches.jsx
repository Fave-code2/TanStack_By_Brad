import React from "react";
import { FaClock, FaUser } from "react-icons/fa";

const RecentSearches = ({ users, onSelect }) => {
  return (
    <div className="recent-searches">
      <div className="recent-header">
        <FaClock />
        <h3>Recent Searches</h3>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <button onClick={() => onSelect(user)}>
              <FaUser className="user-icon" />
              {user}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
