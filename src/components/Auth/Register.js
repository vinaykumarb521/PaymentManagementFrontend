import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Adjust the import path accordingly

const Register = () => {
    const [userData, setUserData] = useState({ username: '', password: '', name: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); // Use navigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9090/auth/register', userData);
                  alert( userData.username + " successful");

            login(userData.username); // Assuming the API returns username upon successful registration
            setError('');
            navigate('/employees'); // Redirect to /employees after successful registration
        } catch (error) {
            console.error('Error registering:', error);
            setError('Registration failed');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit">Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Register;
