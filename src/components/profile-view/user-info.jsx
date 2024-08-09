import React from "react";

export const UserInfo = ({username, email}) => {
  return (
    <div className="profile-view">
        <h1>Profile</h1>
          <div>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
          </div>
      </div>
  );
}