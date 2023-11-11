import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProductDetailsModal from "./ProductDetailsModal";
import { Link } from "react-router-dom";
import "./Header.css"; // Import a CSS file for styling

const Header = ({
  storeProduct,
  setStoreProduct,
  handleIncrement,
  handleDecrement,
}) => {
  // console.log("selectedParticularProduct=>", selectedParticularProduct);
  const [productModal, setProductModal] = useState(false);

  const LogOut = () => {
    localStorage.removeItem("userdata");
    window.location.reload();
  };

  const openProductModal = () => {
    setProductModal(true);
  };

  const closeProductModal = () => {
    setProductModal(false);
  };

  return (
    <header>
      {/* Use Link to navigate to the Dashboard */}
      <Link to="/" className="dashboard-link"> {/* Add a class for styling */}
        <h3 className="dashboard-text">Dashboard</h3> {/* Add a class for styling */}
      </Link>

      <button onClick={openProductModal}>
        <AiOutlineShoppingCart />
        {storeProduct && storeProduct.length}
      </button>

      <button onClick={LogOut}>Logout</button>
      {storeProduct && (
        <ProductDetailsModal
          product={storeProduct}
          setStoreProduct={setStoreProduct}
          productModal={productModal}
          onClose={closeProductModal}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
      )}
    </header>
  );
};

export default Header;
