import React from "react";
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";

const Footer = ({ language }) => {
	const content = language === "fr" ? fr : ar;
    return (
        <footer>
            <p>© 2024 Solide. {content.rigths_reserved}</p>
        </footer>
    );
};

export default Footer;
