import React from 'react';

const Dashboard = () => {
  const LogOut = () => {
    localStorage.removeItem('userdata');
    window.location.reload();
  };
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={() => LogOut()}>Logout</button>
    </>
  );
};

export default Dashboard;
