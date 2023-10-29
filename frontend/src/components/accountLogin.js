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

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/login/account-login', { username, password }); 
            const { token, userType } = response.data;
            
            // Store token and userType in local storage or context for further requests
            localStorage.setItem('authToken', token);
            localStorage.setItem('userType', userType);

            // Redirect based on the user type
            if (userType === 'admin' || userType === 'admin manager' ) {
                navigate('/admin/dashboard');
            } else if (userType === 'customer') {
                navigate('/mobile-phones');  // Modify as per your requirement
            } else {
                console.log('Unknown user type.');
            }

        } catch (err) {
            setError('Invalid login credentials. Please try again.');
        }
    };

    return (
        <div style={componentStyles.container}>
            <h2>Login</h2>  {/* Change to a generic title */}
            <form onSubmit={handleSubmit} style={componentStyles.formStyle}>
                <input 
                    type="text" 
                    placeholder="Username/Email" 
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

export default Login;
