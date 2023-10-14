import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Your E-commerce Site</p>
        </div>
      </footer>
  )
}

export default Footer