import React from 'react';
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";

const Header = ({ language, toggleLanguage }) => {
	const content = language === "fr" ? fr : ar;
	return (
		<header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
			<div className="header-logo">
				<img style={{
					width: "70px", // Set fixed width
					height: "50px", //
					padding: "5px 10px"
				}} src="../images/logoS.png" alt="Logo" />
			</div>
			<nav>
				<a href="/Home">{content.home}</a>
				<a href="/about">{content.about}</a>
				<a href="/contact">{content.contact}</a>
			</nav>
			<button
				onClick={toggleLanguage}
				style={{
					width: "50px", // Set fixed width
					height: "30px", //
					padding: "5px 10px",
					backgroundColor: "#007bff",
					color: "white",
					border: "none",
					borderRadius: "5px",
					cursor: "pointer",
					backgroundImage: `url(${language === "ar" ? "images/frensh.jpg" : "images/maroc.jpg"})`,
					backgroundSize: "cover", // Ensure the image covers the button
					backgroundPosition: "center", // Center the image
				}}
			>
				{/* Optional: Text inside the button */}
			</button>

		</header>
	);
};

export default Header;
