import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const componentStyles = {
    container:{
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
 },
 formStyle: {
    color: 'red',
 }
}

function CustomerAuth() {
    const [isLogin, setIsLogin] = useState(true);  // Toggle between login and register
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/customer/login', { cust_email: email, cust_password: password });
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            navigate('/customer/dashboard');  // Adjust this route based on where you want customers to go post-login
        } catch (err) {
            setError('Invalid login credentials. Please try again.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const customerData = {
            firstname,
            lastname,
            cust_email: email,
            cust_password: password
        };
        try {
            const response = await axios.post('http://localhost:5000/api/customer/register', customerData);
            if(response.data.success) {
                setIsLogin(true);  // Switch back to the login form after successful registration
            }
        } catch (err) {
            setError('Error registering. Please try again.');
        }
    };

    return (
        <div style={componentStyles.container}>
            {isLogin ? (
                <>
                    <h2>Customer Login</h2>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button type="submit">Login</button>
                        <button type="button" onClick={() => setIsLogin(false)}>Register</button>
                    </form>
                </>
            ) : (
                <>
                    <h2>Customer Registration</h2>
                    <form onSubmit={handleRegister}>
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            value={firstname} 
                            onChange={(e) => setFirstname(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            value={lastname} 
                            onChange={(e) => setLastname(e.target.value)} 
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button type="submit">Register</button>
                        <button type="button" onClick={() => setIsLogin(true)}>Login</button>
                    </form>
                </>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default CustomerAuth;
