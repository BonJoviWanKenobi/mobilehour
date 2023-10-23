import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import AdminLogin from './components/adminlogin';
import AdminDashboard from './components/admindashboard';


function App() {
  return (
    <Router>
<Routes>
    <Route path="/" element={<Home />} exact />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
</Routes>
    </Router>
  );
}



export default App;