import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Header from './header_footer/Header';
import Footer from './header_footer/Footer';
import {useNavigate } from 'react-router-dom';
import Loaders from './Loaders/Loaders';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState('');
  
  // Initialize useNavigate
  const navigate = useNavigate();

  // Function to navigate to the products page for a category
  const navigateToCategoryProducts = (categoryId) => {
    console.log(categoryId);
    navigate('/category-products', { state: { categoryId } });
  };
  

  useEffect(() => {
    setLoading(true);
    // Fetch categories data from your API
    fetch('https://api.escuelajs.co/api/v1/categories') // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false); // Set loading to false after the fetch is complete
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const toggleCategoriesView = () => {
    setShowAllCategories(!showAllCategories);
  };
   // Search Function
   const onSearch = (evt) => {
    setSearch(evt.target.value);
  };

  const onGetSearch = (e) => {
    e.preventDefault();
    setSearchQuery(search);
    setSearch('');
  };


  return (
    <div className="dashboard-container">
      <Header/>
      <div className="banner-container" style={{ marginBottom: '20px' }}>
        <img src="/assets/banner_1.jpeg" alt="Background" />
        <div className="banner-content">
          <div className="container">
            <h2 className="banner-title">NEW SEASON ARRIVALS</h2>
            <p className="banner-subtitle">CHECK OUT ALL THE TRENDS</p>
          </div>
        </div>
      </div>
      <Container>

      <Form onSubmit={onGetSearch} style={{ marginBottom: '20px' }}>
          <Form.Group className="mb-3" >
            <Form.Control type="text" placeholder="Search Products by name" value={search} onChange={(e) => onSearch(e)}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={() => setSearch('')}>
               Reset
           </Button>
      </Form>
  <Row style={{ marginBottom: '20px' }}>
    {loading ? (<Loaders/>):(categories.filter((value) => {
                  if (search === '') {
                    return value;
                  } else if (
                    value.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return value;
                  } else {
                    return;
                  }
                }).slice(0, showAllCategories ? categories.length : 4).map((category) => (
      <Col key={category.id} sm={6} md={3} style={{ marginBottom: '20px' }}>
        
        <Card onClick={() => navigateToCategoryProducts(category.id)}>
            <Card.Img variant="top" src={category.image} />
            <Card.Body>
              <Card.Title><h6>{category.name}</h6></Card.Title>
            </Card.Body>
          </Card>
       
      </Col>
    )))}
    
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
