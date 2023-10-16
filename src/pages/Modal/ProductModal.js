// ProductModal.js
import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';

const ProductModal = ({ show, product, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <img
              src={product.images}
              alt={product.title}
              style={{
                maxWidth: '100%', // Adjust the width as needed
                maxHeight: '300px', // Adjust the height as needed
              }}
            />
          </Col>
          <Col md={6}>
            <strong><p>${product.title}</p></strong> 
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Add more product details here */}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
