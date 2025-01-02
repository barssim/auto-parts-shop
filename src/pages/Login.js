import React, { useState } from "react";
import "../cssFiles/Login.css"; // Optional: Style the login form
import axios from 'axios';
import { REST_API_GATEWAY_URL } from "../globals.js";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const userCredentials = { username, password };

        // Send POST request to the backend to authenticate the user
        axios.post(REST_API_GATEWAY_URL + "api/auth/login", userCredentials)
            .then(response => {
                // Store the JWT token in sessionStorage
                sessionStorage.setItem('jwt_token', response.data.token);
                // Redirect the user to a protected page (you can use react-router here)
                window.location.href = '/dashboard';  // Example redirection
            })
            .catch(error => {
                setErrorMessage('Invalid credentials. Please try again.');
            });
    };

    return (
        <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form class="h2" onSubmit={handleLogin}>
                <div>
                    <label  htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <br/>
                <div>
                    <button
					className="buttonStyle" type="submit">Login</button>
                </div>
                <br/>
            </form>
        </div>
    );
};

export default Login;
