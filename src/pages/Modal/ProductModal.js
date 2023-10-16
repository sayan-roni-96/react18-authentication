// ProductModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';

const ProductModal = ({ show, product, onHide }) => {
    const modalBodyStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      };
    
      const imageStyle = {
        maxWidth: '100%', // Adjust the width as needed
        maxHeight: '300px', // Adjust the height as needed
      };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalBodyStyle}>
        <img src={product.images} alt={product.title} style={imageStyle} />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        {/* Add more product details here */}
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
