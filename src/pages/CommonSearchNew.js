// src/App.js
import React, { useState , useEffect } from "react";
import axios from "axios";
import { REST_API_GATEWAY_URL } from "../globals.js";

const CommonSearchNew = () => {
	const [articles, setArticles] = useState([]); // State for storing API data
	const [loading, setLoading] = useState(true); // State for loading status
	const [error, setError] = useState(null); // State for error handling

	useEffect(() => {
		// Function to fetch data from the API
		const fetchNewArticles = async () => {
			try {
				const response = await axios.get(REST_API_GATEWAY_URL + "articles/newArticles");
				setArticles(response.data); // Update state with API response
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch Articles");
				setLoading(false);
			}
		};

		fetchNewArticles();
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
