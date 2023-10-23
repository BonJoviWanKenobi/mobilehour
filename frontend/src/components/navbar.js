import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import CartOverlay from './CartOverlay';
import './CartOverlay.css' // Import the CartOverlay

import logo from './images/mobile-hour-logo.png';
import cartIcon from './images/shopping-cart.png';

function Navbar(props) {
    const { cart } = useCart();

    const [isCartOpen, setIsCartOpen] = useState(false); // This state is for the cart overlay

    // Event handler to toggle cart overlay
    const toggleCartOverlay = () => {
        setIsCartOpen(prevState => !prevState);
    };
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <nav>
            <Link to="/" className="brand-logo-link">
                <img src={logo} alt="MyBrand Logo" className="brand-logo" />
            </Link>
            <div className='nav-links'>
                <Link to="/mobile-phones">Shop All Mobiles</Link>
                <div className="cart-icon" onClick={toggleCartOverlay}> {/* Add the event handler here */}
                    <span>{cart.length}</span>
                    <img src={cartIcon} alt="Cart" />
                </div>
            </div>
            <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
   ☰
</div>
{isMobileMenuOpen && (
    <div className='nav-links-mobile'>
        <div>
        <div className="cart-icon" onClick={toggleCartOverlay}> {/* Add the event handler here */}
                    <span>{cart.length}</span>
                    <img src={cartIcon} alt="Cart" />
                </div>
        <Link to="/mobile-phones">Shop All Mobiles</Link>
        </div>
    </div>
)}
            {/* Cart Overlay */}
            <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </nav>
    );
}

export default Navbar;
