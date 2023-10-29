import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/home';
import AdminDashboard from './components/admindashboard';
import ProductsList from './components/ProductsList';
import ProductDetail from './components/productdetail';
import HomePage from './components/home';
import { CartProvider } from './components/CartContext';
import Checkout from './components/checkout';
import Login from './components/accountLogin';

function ProtectedAdminRoute() {
  const userType = localStorage.getItem('userType');
  const navigate = useNavigate();

  // If user is not an admin, immediately redirect
  if (userType !== 'admin' &&  userType != 'admin manager') {
    navigate('/');
    return null;  // Return null so nothing renders when user is redirected
  }

  // If user is an admin, render the dashboard
  return <AdminDashboard />;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<ProtectedAdminRoute />} />
          <Route path="/mobile-phones" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account-login" element={<Login />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
