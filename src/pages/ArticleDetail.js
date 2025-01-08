import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { REST_API_GATEWAY_URL } from "../globals.js";
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { manifacturerWithModels } from "../selectArticleOptions.js"
import { manifacturers } from "../selectArticleOptions.js"
import { categories } from "../selectArticleOptions.js"

const ArticleDetail = ({ language }) => {
	const content = language === "fr" ? fr : ar;
	const { articleno } = useParams();
	const [article, setArticle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [manifacturer, setManifacturer] = useState("");
	const [model, setModel] = useState("");
	const [category, setCategory] = useState("");
	const [cart, setCart] = useState(() => {
		// Retrieve the cart from local storage when the component loads
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	});

	// Save cart to local storage whenever it changes
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);


	const addToCart = (item) => {
		setCart((prevCart) => [...prevCart, item]);
	};
	
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

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const response = await fetch(`${REST_API_GATEWAY_URL}articles/${articleno}`);
				if (!response.ok) {
					throw new Error("Failed to fetch article details");
				}
				const data = await response.json();
				setArticle(data); // Update the state with the fetched article
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false); // Set loading to false when the fetch is complete
			}
		};

		fetchArticle();
	}, [articleno]);

	if (loading) {
		return <h2>Loading...</h2>; // Display a loading indicator
	}

	if (error) {
		return <h2>Error: {error}</h2>; // Display an error message
	}

	if (!article) {
		return <h2>Article not found</h2>; // Handle cases where the article doesn't exist
	}
	return (
		<div style={{ display: "flex" }}>
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
					<button className="buttonStyle" type="submit">{content.search}</button>
				</form>
				{error && (
					<div>
						<h2>Error</h2>
						<p>{error}</p>
					</div>
				)}
			</div>
			<div style={{ flex: 1, padding: "20px", textAlign: "center" }}>

				<table style={{ borderCollapse: "separate" }}>
					<tbody>
						<React.Fragment key={article.articleno}>
							<tr className="cell" style={{ backgroundColor: "#87CEEB" }}>

								<td style={{ width: "200px", border: "2px solid", textAlign: "left", padding: "10px" }}>
									<img id="myImg" src={article.articleImg1} width="200" alt="" />
								</td>


								<td style={{ verticalAlign: "top", width: "200px", textAlign: "left" }}>
									<div key={article.articleno} style={{ marginBottom: "20px" }}>
										<Link
											to={`/details/${article.articleno}`}
											style={{
												fontSize: "15px",
												textDecoration: "none",
												color: "blue",
											}}
										>
											<b>{article.name}</b>
										</Link>
									</div>
									<span style={{ fontSize: "10px", letterSpacing: "normal", position: "relative", top: "0px" }}>
										<b>Article No: {article.articleno}</b>
									</span>
									<br />
									<br />
									<h4>{article.price} DH</h4>
								</td>

								<td style={{ verticalAlign: "top", width: "800px", textAlign: "left" }}>
									<div>
										<span
											style={{
												fontSize: "18px",
												letterSpacing: "normal",
												position: "relative",
												top: "0px",
												textDecoration: "underline",
												display: "block",
												marginBottom: "10px",
											}}
										>
											<b>Description:</b>
										</span>
										<textarea
											style={{
												fontSize: "15px",
												letterSpacing: "normal",
												width: "100%",
												height: "100px",
												resize: "none",
												padding: "10px",
												backgroundColor: "#87CEFB",
												boxSizing: "border-box",
											}}
											value={article.description}
											readOnly
										/>
									</div>
								</td>
							</tr>
						</React.Fragment>
					</tbody>
				</table>
				<table style={{ borderCollapse: "separate" }}>
					<tbody>
						<tr className="cell" style={{ backgroundColor: "#87CEEB", borderSpacing: "2px" }}>
							<td style={{ width: "400px", border: "2px solid", textAlign: "left", padding: "10px" }}>
								<img id="myImg" src={article.articleImg1} width="400" alt="" />
							</td>
							<td style={{ width: "400px", border: "2px solid", textAlign: "left", padding: "10px" }}>
								<img id="myImg" src={article.articleImg2} width="400" alt="" />
							</td>
							<td style={{ width: "400px", border: "2px solid", textAlign: "left", padding: "10px" }}>
								<img id="myImg" src={article.articleImg3} width="400" alt="" />
							</td>
						</tr>

					</tbody>
				</table>
				<button className="buttonStyle" onClick={() => addToCart(article)}>Ajouter au panier</button>
			</div>
		</div>
	);


}

export default ArticleDetail;
