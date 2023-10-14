import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Header from './header_footer/Header';
import Footer from './header_footer/Footer';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  

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
      <Header/>
      <div className="banner-container">
        <img src="/assets/banner_1.jpeg" alt="Background" />
        <div className="banner-content">
          <div className="container">
            <h2 className="banner-title">NEW SEASON ARRIVALS</h2>
            <p className="banner-subtitle">CHECK OUT ALL THE TRENDS</p>
          </div>
        </div>
      </div>
      <Container>
      <Row>
      {categories.slice(0, showAllCategories ? categories.length : 4).map((category) => (
          <Col key={category.id} sm={6} md={3}>
            <Card>
              <Card.Img variant="top" src={category.image} />
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
      {/* <div className="categories">
        {categories.slice(0, showAllCategories ? categories.length : 4).map((category) => (
          <div key={category.id} className="category">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div> */}
      <button onClick={toggleCategoriesView} className="view-more-button">
        {showAllCategories ? 'Show Less' : 'View More'}
      </button>
     
      <Footer />
    </div>
  );
};

export default Dashboard;
