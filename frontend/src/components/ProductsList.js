import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admindashboard.css';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import Footer from './footer';


function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 5000  }); // Sample initial range
const handleBrandChange = (e) => {
  if (e.target.checked) {
      setSelectedBrand(e.target.value);
  } else {
      setSelectedBrand(null); // Reset the brand filter when unchecked
  }
};
  useEffect(() => {
    async function fetchProducts() {
      try {
        
        const response = await axios.get('http://localhost:5000/api/products/all', {
            params: {
                brand: selectedBrand,
                minPrice: selectedPriceRange.min,
                maxPrice: selectedPriceRange.max,
                sortBy: sortField,
                sortOrder: sortOrder
             }
        });
        
        setProducts(response.data);
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedPriceRange,sortField, sortOrder]);

  return (
    
    <div className="product-page">
  <Navbar />
  <div className='products-div'>
      <h2>Mobile Phones</h2>

<div className="products-box">
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-container">
          {products.map(product => (
            <div key={product.product_id} className="product-card">
                <Link to={`/products/${product.product_id}`}>
              <img src={`http://localhost:5000/${product.image_path}`} alt={product.product_model} className='product-img'/>
              </Link>
              <h3>{product.product_model}</h3>
              <p>${product.price}</p>
              {/* Add other product details as needed */}
            </div>
          ))}
        </div>
      )}
    <div>
    
<div className="filters">
  <h4>Sort by:</h4>
<div>
<select onChange={(e) => setSortField(e.target.value)}>
<option value="price">Price Change</option>
<option value="brand">Brand</option>
</select>

<select onChange={(e) => setSortOrder(e.target.value)}>
<option value="asc">Ascending</option>
<option value="desc">Descending</option>
</select>
</div>
<h4>Filter By:</h4>

<div>
<div className='brand-container'>
    <h4>Brands:</h4>
    <div className='brand-check'>
        <input 
            type="checkbox" 
            value="Apple" 
            onChange={handleBrandChange} 
            checked={selectedBrand === "Apple"}
        />
        <label>Apple</label>
    </div>
    <div className='brand-check'>
        <input 
            type="checkbox" 
            value="Samsung" 
            onChange={handleBrandChange} 
            checked={selectedBrand === "Samsung"}
        />
        <label>Samsung</label>
    </div>
    <div className='brand-check'>
        <input 
            type="checkbox" 
            value="Google" 
            onChange={handleBrandChange} 
            checked={selectedBrand === "Google"}
        />
        <label>Google</label>
    </div>
    <div className='brand-check'>
        <input 
            type="checkbox" 
            value="Nokia" 
            onChange={handleBrandChange} 
            checked={selectedBrand === "Nokia"}
        />
        <label>Nokia</label>
    </div>
    <div className='brand-check'>
        <input 
            type="checkbox" 
            value="OPPO" 
            onChange={handleBrandChange} 
            checked={selectedBrand === "OPPO"}
        />
        <label>OPPO</label>
    </div>
    <div className='brand-check'>
        <input 
            type="checkbox" 
            value="Motorola" 
            onChange={handleBrandChange} 
            checked={selectedBrand === "Motorola"}
        />
        <label>Motorola</label>
    </div>

    
<label className='price-label'>Price Range:</label>
<input 
   type="number" 
   placeholder="Min price" 
   onChange={(e) => setSelectedPriceRange(prev => ({ ...prev, min: parseFloat(e.target.value) || 0 }))}
/>
<input 
   type="number" 
   placeholder="Max price" 
   onChange={(e) => setSelectedPriceRange(prev => ({ ...prev, max: parseFloat(e.target.value) || 5000 }))}
/>
</div>

</div>


</div>
</div>
</div>
</div>
<Footer />
</div>
  );
}

export default ProductsList;
