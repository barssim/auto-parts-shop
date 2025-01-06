import React from 'react';
import fr from "../locales/header/fr.json";
import ar from "../locales/header/ar.json";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Header = ({ language, toggleLanguage, cartItemCount }) => {
	const content = language === "fr" ? fr : ar;

	const navigate = useNavigate();
	return (
		<header
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "10px 20px",
				boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
				backgroundColor: "#ffffff",
			}}
		>
			{/* Logo Section */}
			<div className="header-logo">
				<img
					src="../images/logoS.png"
					alt="Logo"
					style={{
						width: "70px",
						height: "50px",
						padding: "5px 10px",
					}}
				/>
			</div>

			{/* Navigation Links */}
			<nav style={{ display: "flex", gap: "15px" }}>
				<a href="/Home" className="linkStyle">{content.home}</a>
				<a href="/about" className="linkStyle">{content.about}</a>
				<a href="/contact" className="linkStyle">{content.contact}</a>
			</nav>

			{/* Action Buttons */}
			<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
				{/* Shopping Cart */}
				<div>
					<button
						style={{
							position: "relative",
							padding: "20px 20px",
							backgroundColor: "#FFA500",
							color: "white",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
							backgroundImage: `url("../images/panier.png")`, // Set the background image
							backgroundSize: "cover", // Ensure the image scales to fit the button
							backgroundPosition: "left center", // Position the image to the left
							backgroundRepeat: "no-repeat", // Prevent the image from repeating
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							paddingLeft: "30px", // Adjust padding to prevent text overlapping with the image
						}}
						onClick={() => navigate("/cart")}
					>
						{/* Badge for item count */}
						{cartItemCount > 0 && (
							<span
								style={{
									position: "absolute",
									top: 0,
									right: 0,
									backgroundColor: "red",
									color: "white",
									borderRadius: "50%",
									width: "18px",
									height: "18px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									fontSize: "12px",
									fontWeight: "bold",
								}}
							>
								{cartItemCount}
							</span>
						)}
					</button>
				</div>

				<button className="buttonStyle"
					onClick={() => (window.location.href = "/login")}
				>
					{content.login}
				</button>
				<button
					className="buttonStyle"
					onClick={() => (window.location.href = "/inscription")}
				>
					{content.inscription}
				</button>
				<button
					className="language-toggle"
					onClick={toggleLanguage}
					style={{
						backgroundImage: `url(${language === "ar" ? "../images/frensh.jpg" : "../images/maroc.jpg"})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						width: "40px",
						height: "40px",
						padding: 0,
						borderRadius: "50%",
					}}
				/>
			</div>
		</header>
	);
};

export default Header;
