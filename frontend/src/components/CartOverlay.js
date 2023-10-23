import React from 'react';
import { useCart } from './CartContext';
// import './CartOverly.css'

function CartOverlay({ isOpen, onClose }) {
    const { cart, removeFromCart } = useCart();

    return (
        <div className={`cart-overlay ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>X</button>
            <h2>Your Cart</h2>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        {item.product_model} - ${item.price}
                        <button onClick={() => removeFromCart(item.product_id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button className="checkout-btn">Proceed to Checkout</button>
        </div>
    );
}

export default CartOverlay;
