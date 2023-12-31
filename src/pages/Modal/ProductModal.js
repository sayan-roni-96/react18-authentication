// ProductModal.js
import React from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlinePlusSquare,
} from "react-icons/ai";

const ProductModal = ({
  show,
  product,
  onHide,
  storeProduct,
  addTocart,
  handleIncrement,
  handleDecrement,
  toGetDataFromChild,
}) => {
  console.log("product=>", product);

  let childData = "Sayan";

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
                  maxWidth: "100%", // Adjust the width as needed
                  maxHeight: "300px", // Adjust the height as needed
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
              <p>
                <span className="d-flex justify-content-between w-2">
                  Quantity:
                  <AiOutlineMinus onClick={() => handleDecrement(product)} />
                  {product.productQuantity}{" "}
                  <AiOutlinePlus onClick={() => handleIncrement(product)} />
                </span>
              </p>
              {product.productQuantity === 0 ? (
                <></>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    //addToCart(product, quantity); // Add the product to the cart
                    // Close the modal after adding to cart

                    addTocart();
                    toGetDataFromChild(childData);
                  }}
                >
                  Add to Cart
                </Button>
              )}

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
