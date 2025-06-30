import React from "react";
import type { User } from "../types/User";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p className="username">@{user.username}</p>
      <p className="email">{user.email}</p>
      <div className="details">
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
        <p>
          <strong>City:</strong> {user.address.city}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
