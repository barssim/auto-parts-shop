// src/App.js
import React, { useState, useEffect } from "react";
import { REST_API_GATEWAY_URL } from "../globals.js";

const AllArticle = () => {
	const [articles, setArticles] = useState([]); // State for storing API data
	const [loading, setLoading] = useState(true); // State for loading status
	const [error, setError] = useState(null); // State for error handling

	useEffect(() => {
		// Function to fetch data from the API
		const fetchArticles = async () => {
			
			 try {
				 const response = await fetch(REST_API_GATEWAY_URL + "articles", {
        method: 'GET'
      });
      const data = await response.json();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch Articles");
      setLoading(false);
    }
		};

			fetchArticles();
		
	}, []); // Empty dependency array ensures this runs once when the component mounts

	// Render loading, error, or Articles
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
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

export default AllArticle;
