// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import AllArticle from './pages/AllArticle';
import CommenSearchNew from './pages/CommonSearchNew';
import Inscription from './pages/Inscription';
import Contact from './pages/Contact';
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";
import "./App.css";

function App() {
	const [language, setLanguage] = useState("fr"); // Track current language
	const content = language === "fr" ? fr : ar;

	const toggleLanguage = () => {
		setLanguage((prevLang) => (prevLang === "fr" ? "ar" : "fr"));
	};
	return (
		<Router>
			<Header language={language} toggleLanguage={toggleLanguage} />
			<div style={{ textAlign: "center" }}>
				<h2>{content.whatWeDo}</h2>
				<div
					className="marquee"
					style={{
						fontSize: "25px",
						letterSpacing: "normal",
						position: "relative",
						textAlign: "center",
						overflow: "hidden", // Ensure content stays within bounds
						whiteSpace: "nowrap", // Prevent wrapping
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
			<br />
			<Routes>
				<Route path="/Home" element={<Home language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/about" element={<About language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/contact" element={<Contact language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/login" element={<Login language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/inscription" element={<Inscription language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/allArticle" element={<AllArticle language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/commonSearchNew" element={<CommenSearchNew language={language} toggleLanguage={toggleLanguage} />} />
			</Routes>
			<Footer language={language} toggleLanguage={toggleLanguage} />
		</Router>
	);
}

export default App;
