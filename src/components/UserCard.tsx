import React from "react";
import { User } from "../types/User";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold">{user.name}</h3>
      <p className="text-gray-600">@{user.username}</p>
      <p className="text-sm">{user.email}</p>
      <div className="mt-2">
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
        <p>
          <strong>City:</strong> {user.address.city}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
