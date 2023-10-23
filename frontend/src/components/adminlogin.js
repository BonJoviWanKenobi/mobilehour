import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add this line

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/users/auth', { username, user_password: password });
            const token = response.data.token;
            
            // Store token in local storage or context for further requests
            localStorage.setItem('authToken', token);

            // Redirect to dashboard or wherever you want after login
            navigate('/admin/dashboard');
            // For now, just console log a success message
            console.log('Logged in successfully!');
        } catch (err) {
            setError('Invalid login credentials. Please try again.');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default AdminLogin;
