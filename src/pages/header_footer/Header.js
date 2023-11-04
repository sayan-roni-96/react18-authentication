import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProductDetailsModal from './ProductDetailsModal';

const Header = ({ storeProduct }) => {
  const [productModal, setProductModal] = useState(false);

  const LogOut = () => {
    localStorage.removeItem('userdata');
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
      <h1>Dashboard</h1>

      <button onClick={openProductModal}>
        <AiOutlineShoppingCart />
        {storeProduct && storeProduct.length}
      </button>

      <button onClick={LogOut}>Logout</button>
      {storeProduct &&  (
        <ProductDetailsModal
          product={storeProduct}
          productModal={productModal}
          onClose={closeProductModal}
        />
      )}
    </header>
  );
};

export default Header;
