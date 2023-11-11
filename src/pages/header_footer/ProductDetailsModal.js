import React, { useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const ProductDetailsModal = ({
  product,
  setStoreProduct,
  productModal,
  onClose,
  handleIncrement,
  handleDecrement,
}) => {
  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of product) {
      total += item.product.productQuantity * item.product.price;
    }
    return total;
  };

  const handleRemoveAll = () => {
    if (window.confirm("Do you want to remove all items from the cart?")) {
      // Set the cart state to an empty array
      setStoreProduct([]);
    }
  };

  const shouldShowRemoveAllButton = product.length > 0;

  useEffect(() => {}, [product]);

  const handleRemoveItem = (particularItem) => {
    console.log("particularItem=>", particularItem);

    if (window.confirm("Do you want to delete?")) {
      const removeItem = [...product].filter((fData, indx) => {
        console.log("fData=>", fData);
        return fData.product.id !== particularItem.product.id;
      });
      setStoreProduct(removeItem);
    }
    // setCart((prevCart) => {
    //   const updatedCart = prevCart.filter((item) => item !== itemToRemove);
    //   return updatedCart;
    // });
  };

  return (
    <Modal show={productModal} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title> <span style={{ marginRight: "10px" }}>Cart</span></Modal.Title>
        {shouldShowRemoveAllButton && (
            <Button variant="danger" onClick={handleRemoveAll}  size="sm" style={{ marginLeft: "5px",height: '30px', width : '100px'}}>
              Remove All
            </Button>
          )}
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
        {product && product.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {product &&
                product.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </td>
                    <td style={{ maxWidth: "200px" }}>{item.product.title}</td>

                    <td>
                      <div className="d-flex justify-content-between">
                        <AiOutlineMinus
                          onClick={() => handleDecrement(item)}
                        />
                        {item.product.productQuantity}
                        <AiOutlinePlus
                          onClick={() => handleIncrement(item)}
                        />
                        
                      </div>
                    </td>
                    <td>{item.product.productQuantity * item.product.price}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(item)}
                        style={{ marginRight: "5px" }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total Price:</td>
                <td>{calculateTotalPrice()}</td>
              </tr>
            </tfoot>
          </Table>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;
