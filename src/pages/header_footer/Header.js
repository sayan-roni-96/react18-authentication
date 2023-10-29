import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProductDetailsModal from './ProductDetailsModal';
import { useState } from 'react';

const Header = ({ storeProduct }) => {
  console.log('storeProduct=>',storeProduct);
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
      {storeProduct && <><AiOutlineShoppingCart />{storeProduct?.length}</>}
      
      </button>
      
      <button onClick={LogOut}>Logout</button>
      {storeProduct && (<ProductDetailsModal product={storeProduct}  productModal={productModal} onClose={closeProductModal}/>) }
      
    </header>
  );
};

export default Header;
