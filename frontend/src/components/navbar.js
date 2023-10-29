import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import CartOverlay from './CartOverlay';
import './CartOverlay.css';
import { useNavigate } from 'react-router-dom'; 

import logo from './images/mobile-hour-logo.png';
import cartIcon from './images/shopping-cart.png';

function Navbar(props) {
    const navigate = useNavigate();
    const { cart } = useCart();

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isLoggedIn = Boolean(localStorage.getItem('authToken'));

    const toggleCartOverlay = () => {
        setIsCartOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('authToken');
        navigate('/account-login');
    };

    return (
        <nav>
            <Link to="/" className="brand-logo-link">
                <img src={logo} alt="MyBrand Logo" className="brand-logo" />
            </Link>
            <div className='nav-links'>
                <Link to="/mobile-phones">Shop All Mobiles</Link>

                {isLoggedIn ? (
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/account-login">Login</Link>
                )}

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
