import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import AdminLogin from './components/adminlogin';
import AdminDashboard from './components/admindashboard';
import ProductsList from './components/ProductsList';
import ProductDetail from './components/productdetail';
import HomePage from './components/home';
import { CartProvider } from './components/CartContext';
import CustomerAuth from './components/customerlogin'
import Checkout from './components/checkout';
import Login from './components/accountLogin';
 // Import the new component


function App() {
  return (
    <CartProvider>
    <Router>
<Routes>
    <Route path="/" element={<Home />} exact />
    <Route path="/admin/login" element={<AdminLogin />} />
    <ProtectedRoute path="/admin/dashboard">
  <AdminDashboard />
</ProtectedRoute>

    <Route path="/mobile-phones" element={<ProductsList />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/customer/login" element={<CustomerAuth />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/account-login" element={<Login />} />
</Routes>

    </Router>
    </CartProvider>
  );
}



export default App;