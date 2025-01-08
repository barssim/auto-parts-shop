import React, { useState } from 'react';
import { REST_API_GATEWAY_URL } from "../globals.js";
import "../cssFiles/styles.css";
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";
import { manifacturerWithModels } from "../selectArticleOptions.js"
import { manifacturers } from "../selectArticleOptions.js"
import { categories } from "../selectArticleOptions.js"
import { Link } from "react-router-dom";
import { useEffect } from "react";
const CartPage = ({ language }) => {
	const content = language === "fr" ? fr : ar;
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

	const removeFromCart = (item) => {
		const updatedCart = cart.filter((cartItem) => cartItem.articleno !== item.articleno);
		setCart(updatedCart);
		return updatedCart.length < cart.length; // True if an item was removed
	};



	const handleSubmit = async (event) => {
		event.preventDefault();

		const oldNew = "old"; // Example value for oldNew
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
					<button className="buttonStyle" type="submit">{content.search}</button>
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
				<>
					<table style={{ borderCollapse: "separate", borderSpacing: "0 10px", width: "100%" }}>
						<tbody>
							{cart.map((article) => (
								<React.Fragment key={article.articleno}>
									<tr className="cell" style={{ backgroundColor: "#87CEEB" }}>
										<td style={{ width: "150px", border: "2px solid", textAlign: "left" }}>
											<img id="myImg" src={article.articleImg} width="200" alt="Article Image" />
										</td>
										<td style={{ width: "20px" }}></td>
										<td style={{ verticalAlign: "top", width: "800px", textAlign: "left" }}>
											<div key={article.id} style={{ marginBottom: "20px" }}>
												<Link
													to={`/details/${article.articleno}`}
													style={{
														display: "inline-block",
														marginTop: "10px",
														textDecoration: "none",
														color: "blue",
														fontWeight: "bold",
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
										<button className="buttonStyle" onClick={() => removeFromCart(article)}>
											Supprimer
										</button>
									</tr>

								</React.Fragment>
							))}
						</tbody>

					</table>


				</>
				{cart && cart.length > 0 ? (
					<button className="buttonStyle" >Aller á la caisse</button>
				) : (
					<h3>Le Panier est vide</h3>)}
			</div>
		</div>
	);
};
export default CartPage;
