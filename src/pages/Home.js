import React from "react";
import "../App.css"; // External CSS file for styling
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";

const Home = ({ language }) => {
    const content = language === "fr" ? fr : ar;
    return (
        <div>
            <br /><br />
            <div className="side-menu">
                <a 
                    href="/commonSearchNew"
                    title="Chercher Pièce Neuve"
                    className="menu-item new-piece"
                >
                    {content.newPiece}
                </a>
                <a
                    href="/commonSearchOld"
                    title="Chercher Pièce d'Occasion"
                    className="menu-item used-piece"
                >
                    {content.usedPiece}
                </a>
                <a
                    href="/allArticle"
                    title="Chercher tout les sorte de Pièces"
                    className="menu-item used-piece"
                >
                    {content.allProducts}
                </a>
            </div>t 
        </div>
    );
}

export default Home;
