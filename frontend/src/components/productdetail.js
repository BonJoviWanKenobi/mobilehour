import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import './productdetail.css';
import './navbar.css';
import { useCart } from './CartContext';
import Footer from './footer';

function ProductDetail(props) {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const { addToCart } = useCart();  // Extract the addToCart function from useCart
  
    const handleAddToCart = () => {
        addToCart(product);
        alert('Product added to your cart!')
        // You can add any other logic you want here, e.g., display a message to the user.
    };

    useEffect(() => {
      async function fetchProduct() {
        try {
          const response = await axios.get(`http://localhost:5000/api/products/${id}`);
          console.log(response.data)
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
      fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-page">
            <Navbar />
            <section className='detail-container'>
                <div>
                    <img src={`http://localhost:5000/${product.image_path}`} alt={product.product_model}  className='detail-img' />
                </div>
                <div className='features-container'>
                    <h2>{product.product_model}</h2>
                    <p className='price-p'>${product.price}</p>
                    <hr className="solid"></hr>
                    <h3>Features</h3>
                    <p className='feature-p'>Weight: {product.weight}</p>
                    <p className='feature-p'>Price: ${product.price}</p>
                    <p className='feature-p'>Dimension: {product.dimension}</p>
                    <p className='feature-p'>Operating System: {product.OS}</p>
                    <p className='feature-p'>Screen Size: {product.screensize} inches</p>
                    <p className='feature-p'>Resolution: {product.resolution}</p>
                    <p className='feature-p'>CPU: {product.CPU}</p>
                    <p className='feature-p'>RAM: {product.RAM}</p>
                    <p className='feature-p'>Storage: {product.storage}</p>
                    <p className='feature-p'>Battery: {product.battery}</p>
                    <p className='feature-p'>Rear Camera: {product.rear_camera}</p>
                    <p className='feature-p'>Front Camera: {product.front_camera}</p>
                    <button className='cart-btn' onClick={handleAddToCart}>ADD TO CART</button>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default ProductDetail;
