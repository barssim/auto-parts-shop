import React, { useState } from "react";
import "../cssFiles/Login.css"; // Optional: Style the login form
import fr from "../locales/header/fr.json";
import ar from "../locales/header/ar.json";

const Login = ({ language, toggleLanguage }) => {
	const content = language === "fr" ? fr : ar;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Mock login logic
    if (email === "user@example.com" && password === "password123") {
      alert("Login successful!");
      setError("");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">{content.email}:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{content.password}:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-button">
          {content.login}
        </button>
      </form>
    </div>
  );
};

export default Login;
