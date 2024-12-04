import React from "react";
import "../App.css"; // External CSS file for styling
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";

const Home = ({ language }) => {
	const content = language === "fr" ? fr : ar;
	return (
		<div>

			<br />

			{/* Scrolling Images */}
			<div className="row" style={{ zIndex: 999 ,
								textAlign: "center" }}>
				<div className="col gu1">&nbsp;</div>
				<div className="col gu6">
					<div className="row" style={{ zIndex: 999 ,
								textAlign: "center" }}>

						<br />
						<br />

						{/* Links */}
						<a
							href="/commonSearchNew"
							title="Chercher Pièce Neuve"
							className="search-link new-piece"
						>
							{content.newPiece}
						</a>
						<a
							href="/commonSearchOld"
							title="Chercher Pièce d'Occasion"
							className="search-link used-piece"
						>
							{content.usedPiece}
						</a>

						<br className="clear" />
					</div>
				</div>
			</div>

			<br />
			<br />

		</div>
	);
}

export default Home;
