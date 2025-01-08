import React from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic, such as clearing session, cookies, etc.
    // For example, if you're using localStorage or sessionStorage:
    localStorage.removeItem('isLoggedIn'); // remove authentication token
    sessionStorage.removeItem('jwt_token'); // if stored in sessionStorage
    // Redirect to login page after logout
    navigate('/login');
 }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
};

export default Logout;
