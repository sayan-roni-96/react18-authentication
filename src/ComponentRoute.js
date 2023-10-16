import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CategoryProducts from './pages/CategoryProducts';

const ComponentRoute = () => {
  function PrivateRoute({ children }) {
    const getLocalstorageData = JSON.parse(localStorage.getItem('userdata'));
    console.log('getLocalstorageData->', getLocalstorageData);
    return getLocalstorageData !== null ? (
      <>{children}</>
    ) : (
      <>
        <Navigate to="/login" />
      </>
    );
  }

  function PublicRoute({ children }) {
    const getLocalstorageData = JSON.parse(localStorage.getItem('userdata'));
    console.log('getLocalstorageData->', getLocalstorageData);

    return getLocalstorageData === null ? (
      <>{children}</>
    ) : (
      <>
        <Navigate to="/" />
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* <Route path="/categories/:categoryId/products" component={CategoryProducts} /> */}
        <Route path="/category-products" element={<PrivateRoute><CategoryProducts /></PrivateRoute>} />
      </Routes>
      
    </>
  );
};

export default ComponentRoute;
