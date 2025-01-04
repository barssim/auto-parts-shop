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
		<div style={{ display: "flex" }}>
			{/* Filter Form */}
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
						<label htmlFor="manifacturer">{content.manifacturer}:</label>
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
							disabled={!manifacturer}
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
				{error && (
					<div>
						<h2>Error</h2>
						<p>{error}</p>
					</div>
				)}
			</div>

			{/* Response Section */}
			<div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
				{response && response.length > 0 ? (
					<>
						<table style={{ borderCollapse: "separate", borderSpacing: "0 10px", width: "100%" }}>
							<tbody>
								{response.map((article) => (
									<React.Fragment key={article.articleno}>
										<tr className="cell" style={{ backgroundColor: "#87CEEB" }}>
											<td style={{ width: "150px", textAlign: "left" }}></td>
											<td style={{ width: "150px", border: "2px solid", textAlign: "left" }}>
												<img id="myImg" src={article.articleImg} width="200" alt="Article Image" />
											</td>
											<td style={{ width: "20px" }}></td>
											<td style={{ verticalAlign: "top", width: "800px", textAlign: "left" }}>
												<span style={{ fontSize: "15px", letterSpacing: "normal", position: "relative", top: "0px" }}>
													<b>{article.name}</b>
												</span>
												<br />
												<span style={{ fontSize: "10px", letterSpacing: "normal", position: "relative", top: "0px" }}>
													<b>Article No: {article.articleno}</b>
												</span>
												<br />
												<br />
												<h4>{article.price} DH</h4>
											</td>
											<td style={{ verticalAlign: "top", width: "800px", textAlign: "left" }}>
												<span style={{ fontSize: "15px", letterSpacing: "normal", position: "relative", top: "0px" }}>
													<b>{article.description}</b>
												</span>

											</td>
										</tr>

									</React.Fragment>
								))}
							</tbody>
						</table>


					</>
				) : (
					<h3>No Results Found</h3>
				)}
			</div>
		</div>
	);
};

export default CommonSearchNew;
