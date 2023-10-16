// CategoryProducts.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './header_footer/Header';
import Footer from './header_footer/Footer';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import ProductModal from './Modal/ProductModal';

const CategoryProducts = () => {
  const location = useLocation();
  const categoryId = location.state.categoryId;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the selected product
  const [showModal, setShowModal] = useState(false);

    // Function to open the modal with the selected product
    const openProductModal = (product) => {
      setSelectedProduct(product);
      setShowModal(true);
    };
  
    // Function to close the modal
    const closeProductModal = () => {
      setSelectedProduct(null);
      setShowModal(false);
    };

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
    // fetch(`${process.env.REACT_APP_USER_CATEGORY_ONLINE_API}/${categoryId}/products`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response data
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [categoryId]);
  
  return (
    <div className="dashboard-container">
      <Header />
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
          {products.map((product) => (
            <Col key={product.id} sm={6} md={3}>
              <Card onClick={() => openProductModal(product)}>
                <Card.Img variant="top" src={product.images} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
      {showModal && (
      <ProductModal show={showModal} product={selectedProduct} onHide={closeProductModal} />
    )}
    </div>
    // Wrap the ProductModal inside a parent element
    
  );
};

export default CategoryProducts;
