// src/App.js
import React, { useState, useEffect } from "react";
import { REST_API_GATEWAY_URL } from "../globals.js";

const CommonSearchNew = () => {
	const [articles, setArticles] = useState([]); // State for storing API data
	const [loading, setLoading] = useState(true); // State for loading status
	const [error, setError] = useState(null); // State for error handling

	useEffect(() => {
		// Function to fetch data from the API
		const token = sessionStorage.getItem('jwt_token');
		const fetchNewArticles = async (token) => {
			
			 try {
				 const response = await fetch(REST_API_GATEWAY_URL + "articles/newArticles", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setArticles(data); 
      console.log('Protected Data:', data);
      setLoading(false);
			} catch (err) {
				setError("Failed to fetch Articles");
				setLoading(false);
			}
		};

		if (token) {
			console.log('JWT Token:', token);
			// You can use the token, for example, in an API request
			fetchNewArticles(token);
		} else {
			console.log('No token found in sessionStorage.');
		}
	}, []); // Empty dependency array ensures this runs once when the component mounts

	// Render loading, error, or Articles
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (

		<div>
			<h1>Article List</h1>
			<ul>
				{articles.map((article) => (
					<li key={article.articleno}>
						{article.articleName} - {article.articleDescription}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CommonSearchNew;
