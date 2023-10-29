import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import CartOverlay from './CartOverlay';
import './CartOverlay.css';
import './navbar.css'
import { useNavigate } from 'react-router-dom'; 
import logo from './images/mobile-hour-logo.png';
import cartIcon from './images/shopping-cart.png';

function Navbar(props) {
    const navigate = useNavigate();
    const { cart } = useCart();
    const userType = localStorage.getItem('userType');  // Retrieve user type

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isLoggedIn = Boolean(localStorage.getItem('authToken'));

    const toggleCartOverlay = () => {
        setIsCartOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');  // Consider removing userType when logging out
        navigate('/account-login');
    };

    return (
        <nav>
            <Link to="/" className="brand-logo-link">
                <img src={logo} alt="MyBrand Logo" className="brand-logo" />
            </Link>
            <div className='nav-links'>
                <Link to="/mobile-phones">Shop All Mobiles</Link>
                {userType === 'admin' || userType === 'admin manager' ? (
                    <Link to="/admin/dashboard">Dashboard</Link>
                ) : null}
                {isLoggedIn ? (
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/account-login">Login</Link>
                )}

                {/* Conditionally render the Dashboard button for admin users */}


                <div className="cart-icon" onClick={toggleCartOverlay}>
                    <span>{cart.length}</span>
                    <img src={cartIcon} alt="Cart" />
                </div>
            </div>
            <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                ☰
            </div>
            {isMobileMenuOpen && (
                <div className='nav-links-mobile'>
                    <div className="cart-icon" onClick={toggleCartOverlay}>
                        <span>{cart.length}</span>
                        <img src={cartIcon} alt="Cart" />
                    </div>
                    <Link to="/mobile-phones">Shop All Mobiles</Link>
                </div>
            )}

            <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </nav>
    );
}

export default Navbar;
