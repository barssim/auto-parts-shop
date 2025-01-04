import React, { useState } from 'react';
import { REST_API_GATEWAY_URL } from "../globals.js";
import "../cssFiles/styles.css";
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";
import { manifacturerWithModels } from "../selectArticleOptions.js"
import { manifacturers } from "../selectArticleOptions.js"
import { categories } from "../selectArticleOptions.js"


const CommonSearchNew = ({ language }) => {
	const content = language === "fr" ? fr : ar;
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [manifacturer, setManifacturer] = useState("");
	const [model, setModel] = useState("");
	const [category, setCategory] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const oldNew = "new"; // Example value for oldNew
		const category = event.target.category.value;
		const model = event.target.model.value;
		const manifacturer = event.target.manifacturer.value;
		try {
			// Create an object with the parameters
			const queryParams = {
				oldNew,
				category,
				model,
				manifacturer,
			};

			// Remove null or empty parameters
			const filteredParams = Object.fromEntries(
				Object.entries(queryParams).filter(([key, value]) => value !== null && value.trim() !== "")
			);

			// Convert filtered parameters to a query string
			const queryString = new URLSearchParams(filteredParams).toString();

			// Construct the full URL with query parameters
			const url = `${REST_API_GATEWAY_URL}articles?${queryString}`;



			const res = await fetch(url, {
				method: 'GET',
			});

			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}

			const result = await res.json();
			setResponse(result);
			console.log(JSON.stringify(response, null, 2));
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div style={{ width: "15%", padding: "10px", textAlign: "left", borderRight: "1px solid #ccc" }}>
			<h3>Filtrer:</h3>
			<form onSubmit={handleSubmit}>

			
				<div>
					<label htmlFor="category">{content.category}:</label>
					<select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
						<option value="">Select a category</option>
						{categories.map((category, index) => (
							<option key={index} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="manifacturer"> {content.manifacturer}:</label>
					<select id="manifacturer" value={manifacturer} onChange={(e) => setManifacturer(e.target.value)}>
						<option value="">Select a manifacturer</option>
						{manifacturers.map((manifacturer, index) => (
							<option key={index} value={manifacturer}>
								{manifacturer}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="model">{content.model}:</label>
					<select
						id="model"
						value={model}
						onChange={(e) => setModel(e.target.value)}
						disabled={!manifacturer} // Disable until a category is selected
					>
						<option value="">Select a model</option>
						{manifacturer &&
							manifacturerWithModels[manifacturer].map((model, index) => (
								<option key={index} value={model}>
									{model}
								</option>
							))}
					</select>
				</div>
				<button type="submit">{content.search}</button>
			</form>
			{response && (
				<div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
					<h3>Response</h3>
					<ul>
						{response.map((article) => (
							<li key={article.articleno}>
								{article.name} - {article.description}
							</li>
						))}
					</ul>
				</div>
			)}
			{error && (
				<div>
					<h2>Error</h2>
					<p>{error}</p>
				</div>
			)}
		</div>
	);
};

export default CommonSearchNew;
