// ProductModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { AiOutlineMinus, AiOutlinePlus, AiOutlinePlusSquare } from 'react-icons/ai';

const ProductModal = ({
  show,
  product,
  onHide,
  onAddToCart,
  storeProduct,
  quantity,
  addTocart,
  handleIncrement,
  handleDecrement,
}) => {
  console.log('quantity=>', quantity);

  return (
    <>
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
              {storeProduct.length !== 0 && (
                <>
                  <div className="container">
                    <div className="row">
                      <h1>{storeProduct.quantityValue}</h1>
                    </div>
                  </div>
                </>
              )}
              <strong>
                <p>{product.title}</p>
              </strong>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p><span className='d-flex justify-content-between w-2'>Quantity:<AiOutlineMinus onClick={() => handleDecrement(product)} />{product.productQuantity} <AiOutlinePlus onClick={() => handleIncrement(product)}/></span></p>
              
              <Button
              //  disabled={quantity === 0 || storeProduct.length === 0}
                variant="primary"
                onClick={() => {
                  //addToCart(product, quantity); // Add the product to the cart
                  // Close the modal after adding to cart

                  addTocart();
                }}
              >
                Add to Cart
              </Button>
              {/* <div className="d-flex justify-content-between mt-2">
              
                 <AiOutlinePlus onClick={() => handleIncrement(product)}/>
              </div> */}
              {/* Add more product details here */}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductModal;
