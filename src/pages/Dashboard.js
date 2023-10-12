import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const LogOut = () => {
    localStorage.removeItem('userdata');
    window.location.reload();
  };

  useEffect(() => {
    // Fetch categories data from your API
    fetch('https://api.escuelajs.co/api/v1/categories') // Replace with your API URL
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const toggleCategoriesView = () => {
    setShowAllCategories(!showAllCategories);
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>Dashboard</h1>
        <button onClick={LogOut}>Logout</button>
      </header>
      <div className="banner-container">
        <img src="/assets/banner_1.jpeg" alt="Background" />
        <div className="banner-content">
          <div className="container">
            <h2 className="banner-title">NEW SEASON ARRIVALS</h2>
            <p className="banner-subtitle">CHECK OUT ALL THE TRENDS</p>
          </div>
        </div>
      </div>
      <div className="categories">
        {categories.slice(0, showAllCategories ? categories.length : 4).map((category) => (
          <div key={category.id} className="category">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
      <button onClick={toggleCategoriesView} className="view-more-button">
        {showAllCategories ? 'Show Less' : 'View More'}
      </button>
     
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Your E-commerce Site</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
