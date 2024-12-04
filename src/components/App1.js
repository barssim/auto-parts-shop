// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";


const App1 = () => {
	const [articles, setArticles] = useState([]); // State for storing API data
	const [loading, setLoading] = useState(true); // State for loading status
	const [error, setError] = useState(null); // State for error handling

	useEffect(() => {
		// Function to fetch data from the API
		const fetchArticles = async () => {
			try {
				const response = await axios.get("http://localhost:8080/articles");
				setArticles(response.data); // Update state with API response
				setLoading(false);
			} catch (err) {
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

export default App1;
