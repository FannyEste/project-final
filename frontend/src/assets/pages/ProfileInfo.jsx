import React, { useState } from "react";

const ProfileInfo = ({ user, onUpdate }) => {
  const [cycleLength, setCycleLength] = useState(user.cycleLength || 28);
  const [periodDuration, setPeriodDuration] = useState(user.periodDuration || 5);

  const handleUpdate = () => {
    onUpdate({ cycleLength, periodDuration });
  };

  return (
    <div className="profile-info">
      <h2>Profile Information</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <label>
        Cycle Length (days):
        <input
          type="number"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
        />
      </label>
      <label>
        Period Duration (days):
        <input
          type="number"
          value={periodDuration}
          onChange={(e) => setPeriodDuration(e.target.value)}
        />
      </label>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default ProfileInfo;
