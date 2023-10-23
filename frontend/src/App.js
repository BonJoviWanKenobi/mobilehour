import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import AdminLogin from './components/adminlogin';
import AdminDashboard from './components/admindashboard';
import ProductsList from './components/ProductsList';
import ProductDetail from './components/productdetail';
import HomePage from './components/home';
import { CartProvider } from './components/CartContext';

 // Import the new component


function App() {
  return (
    <CartProvider>
    <Router>
<Routes>
    <Route path="/" element={<Home />} exact />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/mobile-phones" element={<ProductsList />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/home" element={<HomePage />} />
</Routes>
    </Router>
    </CartProvider>
  );
}



export default App;