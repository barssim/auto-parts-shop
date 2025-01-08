import React, { useState } from "react";
import "../cssFiles/Login.css"; // Optional: Style the login form
import axios from 'axios';
import { REST_API_GATEWAY_URL } from "../globals.js";
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";

const Login = ({language}) => {
	const content = language === "fr" ? fr : ar;
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
	const handleLogin = (e) => {
		e.preventDefault();

		const userCredentials = { username, password };

		// Send POST request to the backend to authenticate the user
		axios.post(REST_API_GATEWAY_URL + "api/auth/login", userCredentials)
			.then(response => {
				// Store the JWT token in sessionStorage
				sessionStorage.setItem('jwt_token', response.data.token);
				// Store the login status in localStorage
				localStorage.setItem("isLoggedIn", "true");
				localStorage.setItem("LoggedIn", username);
				// Set login status to true in the state
				setIsLoggedIn(true);
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
			<form className="h2" onSubmit={handleLogin}>
				<div>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<br />
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
				<br />
				<div>
					<button
						className="buttonStyle" type="submit">{content.enter}</button>
				</div>
				<br />
			</form>
		</div>
	);
};

export default Login;
