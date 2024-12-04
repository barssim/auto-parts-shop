// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";

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
								fontSize: "35px",
								letterSpacing: "normal",
								position: "relative",
								textAlign: "center",
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
			<Routes>
				<Route path="/Home" element={<Home language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/about" element={<About language={language} toggleLanguage={toggleLanguage} />} />
				<Route path="/contact" element={<Contact language={language} toggleLanguage={toggleLanguage} />} />
			</Routes>
			<Footer language={language} toggleLanguage={toggleLanguage} />
		</Router>
	);
}

export default App;
