// CategoryProducts.js

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./header_footer/Header";
import Footer from "./header_footer/Footer";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ProductModal from "./Modal/ProductModal";
import Loaders from "./Loaders/Loaders";

const CategoryProducts = () => {
  const location = useLocation();
  const categoryId = location.state.categoryId;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the selected product
  const [showModal, setShowModal] = useState(false);

  // For add to cart
  const [quantity, setQuantity] = useState();
  const [newQuantity, setNewQuantity] = useState();
  const [storeProduct, setStoreProduct] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");

  // Function to open the modal with the selected product
  const openProductModal = (product) => {
    console.log("product=>", product);
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
        console.log("data=>", data);
       
        const newProductData = data.map((product) => ({
          ...product,
          productQuantity: 0,
        }));

        console.log("newListOfProduct=>", newProductData);
        setProducts(newProductData);
        setLoading(false); // Set loading to false after the fetch is complete
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [categoryId]);

  const handleIncrement = (productValue) => {
    console.log("productValue@@@=I>", productValue);
    const incrementedDataProduct = products?.map((pData) => {
      if (productValue?.product) {
        if (pData.id === productValue?.product?.id) {
          setQuantity(productValue.product.productQuantity++);
          setNewQuantity(pData.productQuantity);
          return { ...pData, productQuantity: pData.productQuantity };
          // return { ...pData, productQuantity: quantity };
        }
      } else {
        if (pData.id === productValue.id) {
          setQuantity(productValue.productQuantity++);
          setNewQuantity(pData.productQuantity);
          return { ...pData, productQuantity: pData.productQuantity };
          // return { ...pData, productQuantity: quantity };
        }
      }
      return pData;
    });
    console.log("incrementedDataProduct=>", incrementedDataProduct);
    return incrementedDataProduct;
  };

  const handleDecrement = (productValue) => {
    console.log("productValue@@@=D>", productValue);

    const decrementedDataProduct = products?.map((pData) => {
      if (productValue?.product) {
        if (pData.id === productValue?.product?.id) {
          setQuantity(productValue.product.productQuantity--);
          setNewQuantity(pData.productQuantity);
          return { ...pData, productQuantity: pData.productQuantity };
          // return { ...pData, productQuantity: quantity };
        }
      } else if (pData?.id === productValue?.id) {
        if (productValue.productQuantity === 0) {
          setQuantity(productValue.productQuantity);
        } else {
          setQuantity(productValue.productQuantity--);
          setNewQuantity(pData.productQuantity);
        }
        return { ...pData, productQuantity: pData.productQuantity };
      }
      return pData;
    });
    console.log("decrementedDataProduct=>", decrementedDataProduct);
    return decrementedDataProduct;
  };

  const addTocart = () => {
    const getCurrentProduct = {
      product: selectedProduct,
    };

    if (
      storeProduct.findIndex((p) => p.product.id === selectedProduct.id) === -1
    ) {
      setStoreProduct([...storeProduct, getCurrentProduct]);
    }
    closeProductModal();
  };
  // Search Function
  const onSearch = (evt) => {
    setSearch(evt.target.value);
  };

  const onGetSearch = (e) => {
    e.preventDefault();
    setSearchQuery(search);
    setSearch("");
  };

  const toGetDataFromChild = (chdData) => {
    console.log("chdData=>", chdData);
  };

  console.log("selectedProduct=>", selectedProduct);

  // useEffect(() => {}, [selectedProduct]);

  return (
    <div className="dashboard-container">
      <Header
        storeProduct={storeProduct}
        setStoreProduct={setStoreProduct}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        selectedParticularProduct={selectedProduct}
      />
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
        <form onSubmit={onGetSearch} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search Products by name"
            value={search}
            onChange={(e) => onSearch(e)}
          />
          <Button type="submit" variant="primary">
            Reset
          </Button>
        </form>
        <Row style={{ marginBottom: '20px' }}>
          {loading ? (<Loaders/>):(products &&
            products
              .filter((value) => {
                if (search === "") {
                  return value;
                } else if (
                  value.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return value;
                } else {
                  return;
                }
              })
              .map((product) => (
                <Col key={product.id} sm={6} md={3} style={{ marginBottom: '20px' }}>
                  <Card onClick={() => openProductModal(product)}>
                    <Card.Img variant="top" src={product.images} />
                    <Card.Body>
                      <Card.Title><h6>{product.title}</h6></Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              )))}
          
        </Row>
      </Container>
      <Footer />
      {showModal && (
        <ProductModal
          show={showModal}
          product={selectedProduct}
          onHide={closeProductModal}
          storeProduct={storeProduct}
          addTocart={addTocart}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          toGetDataFromChild={toGetDataFromChild}
        />
      )}
    </div>
    // Wrap the ProductModal inside a parent element
  );
};

export default CategoryProducts;
