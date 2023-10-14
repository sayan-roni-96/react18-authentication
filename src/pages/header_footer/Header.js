import React from 'react'

const Header = () => {
    const LogOut = () => {
        localStorage.removeItem('userdata');
        window.location.reload();
      };
  return (
    <header>
        <h1>Dashboard</h1>
        <button onClick={LogOut}>Logout</button>
      </header>
  )
}

export default Header