// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import CommonSearchNew from './pages/CommonSearchNew';
import CommenSearchOld from './pages/CommonSearchOld';
import CartPage from './pages/CartPage';
import Inscription from './pages/Inscription';
import Contact from './pages/Contact';
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";
import "./App.css";
import ArticleDetail from './pages/ArticleDetail'; // Component for the article detail page

function App() {
	const [language, setLanguage] = useState("fr"); // Track current language
	const content = language === "fr" ? fr : ar;
	const [cart, setCart] = useState([]);
const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };
	const toggleLanguage = () => {
		setLanguage((prevLang) => (prevLang === "fr" ? "ar" : "fr"));
	};
	return (
		<Router>
			<Header language={language} toggleLanguage={toggleLanguage} cartItemCount={cart.length || 0}/>;
			<div style={{ display: "flex", alignItems: "center" }}>
				{/* Left Menu */}
				<div style={{ width: "15%", padding: "10px", textAlign: "left", borderRight: "1px solid #ccc" }}>
					<Home language={language} toggleLanguage={toggleLanguage} />
				</div>

				{/* Right Content */}
				<div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
					<h2>{content.whatWeDo}</h2>
					<div
						className="marquee-container"
						style={{
							fontSize: "25px",
							letterSpacing: "normal",
							position: "relative",
							textAlign: "center",
							overflow: "hidden",
							whiteSpace: "nowrap",
							width: "800px", // Limit the width
							height: "80px", // Optional: for better vertical centering
							lineHeight: "40px", // Match height for vertical centering
							margin: "0 auto", // Center the container itself if needed
						}}
					>
						<div className="scroll-images">
							<img src="images/aile.jpg" alt="Aile" />
							<img src="images/pare_choc.jpg" alt="Pare Choc" />
							<img src="images/porte.jpg" alt="Porte" />
							<img src="images/capot.jpg" alt="Capot" />
							<img src="images/pare_brise.jpg" alt="Pare Brise" />
							<img src="images/vitre.jpg" alt="Vitre" />
							<img src="images/poignee.jpg" alt="Poignée" />
						</div>
					</div>
				</div>

			</div>

			<br />
			<Routes>
				<Route path="/about" element={<About language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/contact" element={<Contact language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/login" element={<Login language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/inscription" element={<Inscription language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/commonSearchNew" element={<CommonSearchNew language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/commonSearchOld" element={<CommenSearchOld language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/details/:articleno" element={<ArticleDetail addToCart={addToCart} language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/cart" element={<CartPage cart={cart}/>} />
			</Routes>
			<Footer language={language} toggleLanguage={toggleLanguage} />
		</Router>
	);
}

export default App;
