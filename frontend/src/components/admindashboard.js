import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admindashboard.css';
import { useNavigate } from 'react-router-dom'; 

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newProduct, setNewProduct] = useState({
        product_model: '',
        manufacturer: '',
        price: '',
        stock_on_hand: '',
        feature_id: ''
    });

    const [selectedProduct, setSelectedProduct] = useState({
        product_id: '',
        product_model: '',
        manufacturer: '',
        price: '',
        stock_on_hand: '',
        feature_id: ''
    });

    const [newUser, setNewUser] = useState({
        firstname: '',
        lastname: '',

        username: '',
        user_password: '',
        user_role: ''
    });
    
const [productImage, setProductImage] = useState(null);

const navigate = useNavigate();

    const handleAddUser = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            };
            const response = await axios.post('http://localhost:5000/api/users/create', newUser, config);
            console.log('User added:', response.data);
            alert('User added successfully!');
            // Clear the input fields
            setNewUser({ firstname: '', lastname: '', username: '', user_password: '', user_role: '' });
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Error adding user.');
        }
    };
    useEffect(() => {
        async function fetchProducts() {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                };
                const response = await axios.get('http://localhost:5000/api/products/all', config);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        try {
            const formData = new FormData();
formData.append('productImage', productImage);
formData.append('product_model', newProduct.product_model);
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
    
            // Make the POST request with the config object
            const response = await axios.post('http://localhost:5000/api/products/add', formData, config);
    
            if (response.data && response.data.success) {
                alert('Product added successfully!');
    
                // Directly update the local products state, no need to call the API again
                setProducts(prevProducts => [...prevProducts, { ...newProduct, product_id: response.data.insertId }]);
                
                // Clear the input fields
                setNewProduct({
                    product_model: '',
                    manufacturer: '',
                    price: '',
                    stock_on_hand: '',
                    feature_id: ''
                });
            } else {
                alert('Failed to add product.');
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    

    const handleUpdateProduct = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            };
            await axios.put(`http://localhost:5000/api/products/update/${selectedProduct.product_id}`, selectedProduct, config);
            alert('Product updated successfully!');
            // Refresh the product list after updating
            const response = await axios.get('http://localhost:5000/api/products/all');
            setProducts(response.data);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            };
            await axios.delete(`http://localhost:5000/api/products/delete/${id}`, config);
            alert('Product deleted successfully!');
            
            // Refresh the product list after deletion
            const response = await axios.get('http://localhost:5000/api/products/all');
            setProducts(response.data);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const [changelog, setChangelog] = useState([]);

useEffect(() => {
    async function fetchChangelog() {
        try {
            const response = await axios.get('http://localhost:5000/api/users/changelog');  // Adjust the URL based on your setup
            setChangelog(response.data);
        } catch (error) {
            console.error("Error fetching changelog:", error);
        }
    }

    fetchChangelog();
}, []);

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('authToken');
 
        navigate('/admin/login')
        
    };



    return (
        <div className='admin-dashboard'>
            <h2>Admin Dashboard</h2>
        <div className='dashboard-div'>
            {/* Add Product Section */}
            <div>
                <h3>Add Product</h3>
                <input 
                    type="text"
                    placeholder="Product Model"
                    value={newProduct.product_model}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, product_model: e.target.value }))}
                />
                <input 
                    type="text"
                    placeholder="Manufacturer"
                    value={newProduct.manufacturer}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, manufacturer: e.target.value }))}
                />
                <input 
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                />
                <input 
                    type="number"
                    placeholder="Stock On Hand"
                    value={newProduct.stock_on_hand}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, stock_on_hand: e.target.value }))}
                />
                <input 
                    type="number"
                    placeholder="Feature ID"
                    value={newProduct.feature_id}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, feature_id: e.target.value }))}
                />
                <input 
    type="file"
    onChange={(e) => setProductImage(e.target.files[0])}
/>
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

            {/* Edit Product Section */}
            <div>
                <h3>Edit Product</h3>
                <select 
                    value={selectedProduct.product_id} 
                    onChange={(e) => {
                        const productToEdit = products.find(p => p.product_id === Number(e.target.value));
                        setSelectedProduct(productToEdit);
                    }}
                >
                    <option value="" disabled>Select product to edit</option>
                    {products.map(product => (
                        <option key={product.product_id} value={product.product_id}>
                            {product.product_model}
                        </option>
                    ))}
                </select>
                <input 
                    type="text"
                    placeholder="Product Model"
                    value={selectedProduct.product_model}
                    onChange={(e) => setSelectedProduct(prev => ({ ...prev, product_model: e.target.value }))}
                />
                <input 
                    type="text"
                    placeholder="Manufacturer"
                    value={selectedProduct.manufacturer}
                    onChange={(e) => setSelectedProduct(prev => ({ ...prev, manufacturer: e.target.value }))}
                />
                <input 
                    type="number"
                    placeholder="Price"
                    value={selectedProduct.price}
                    onChange={(e) => setSelectedProduct(prev => ({ ...prev, price: e.target.value }))}
                />
                <input 
                    type="number"
                    placeholder="Stock On Hand"
                    value={selectedProduct.stock_on_hand}
                    onChange={(e) => setSelectedProduct(prev => ({ ...prev, stock_on_hand: e.target.value }))}
                />
                <input 
                    type="number"
                    placeholder="Feature ID"
                    value={selectedProduct.feature_id}
                    onChange={(e) => setSelectedProduct(prev => ({ ...prev, feature_id: e.target.value }))}
                />
               

                <button onClick={handleUpdateProduct}>Update Product</button>
            </div>

            {/* Display Product List */}
            <div>
                <h3>Products List</h3>
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <ul>
                        {products.map(product => (
                            <li key={product.product_id}>
                                {product.product_model} - {product.manufacturer} - ${product.price} - Stock: {product.stock_on_hand}
                                <button onClick={() => handleDeleteProduct(product.product_id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
    <h3>Create New User</h3>
    <input 
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
    />
     <input 
        type="text"
        placeholder="firstname"
        value={newUser.firstname}
        onChange={(e) => setNewUser(prev => ({ ...prev, firstname: e.target.value }))}
    />
     <input 
        type="text"
        placeholder="lastname"
        value={newUser.lastname}
        onChange={(e) => setNewUser(prev => ({ ...prev, lastname: e.target.value }))}
    />
    <input 
        type="password"
        placeholder="Password"
        value={newUser.user_password}
        onChange={(e) => setNewUser(prev => ({ ...prev, user_password: e.target.value }))}
    />
    <select 
        value={newUser.user_role} 
        onChange={(e) => setNewUser(prev => ({ ...prev, user_role: e.target.value }))}
    >
        <option value="" disabled>Select role</option>
        <option value="admin">Admin</option>
        <option value="admin manager">Admin Manager</option>
    </select>
    <button onClick={handleAddUser}>Add User</button>
<div>
    <h3>Changelog</h3>
    <table>
    <thead>
        <tr>
            <th>Date Created</th>
            <th>Date Last Modified</th>
            <th>User ID</th>
            <th>Product ID</th>
        </tr>
    </thead>
    <tbody>
        {changelog.map(log => (
            <tr key={log.changelog_id}>
                <td>{log.date_created}</td>
                <td>{log.date_last_modified}</td>
                <td>{log.user_id}</td>
                <td>{log.product_id}</td>
            </tr>
        ))}
    </tbody>
</table>

</div>
</div>
<div><button onClick={handleLogout}>Logout</button></div>
            </div>
        </div>
    );
}

export default AdminDashboard;
