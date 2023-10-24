import React from 'react';
import { useCart } from './CartContext';
import './checkout.css'; 

function Checkout() {
    const { cart } = useCart();

    // Calculate total using reduce
    const total = cart.reduce((acc, item) => {
        return typeof item.price === 'number' ? acc + item.price : acc;
    }, 0);
    

    return (
        <div className='checkout-container'>
            <h2>Checkout</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.product_id}>
                       {item.product_model} - ${typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}

                    </li>
                ))}
            </ul>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={() => alert('Thank you for your purchase!')}>Checkout</button>
        </div>
    );
}

export default Checkout;
