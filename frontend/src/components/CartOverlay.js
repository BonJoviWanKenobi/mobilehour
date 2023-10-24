import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';  // Import if you're using react-router-dom


function CartOverlay({ isOpen, onClose }) {
    const { cart, removeFromCart } = useCart();

    return (
        <div className={`cart-overlay ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>X</button>
            <h2>Your Cart</h2>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        {item.product_model} - {item.quantity} x ${item.price}   {/* Display quantity */}
                        <button onClick={() => removeFromCart(item.product_id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <Link to="/checkout">  {/* Link to the Checkout component */}
                <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
        </div>
    );
}

export default CartOverlay;
