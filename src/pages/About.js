import React from 'react';
import styles from '../cssFiles/styles.css';
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";

const About = ({ language }) => {
	const content = language === "fr" ? fr : ar;
	return (
		<div style={styles.container}>
			<h1 style={styles.heading}> {content.group_solide}</h1>
			<p style={styles.paragraph}>
				Le Groupe Solide est une plateforme solide de e-commerce pour la vente
		de toutes sortes de pièces de carrosserie automobile. <br /> Vous
		avez la possibilité de chercher parmi une large gamme de pièces
		d'origine et d'occasion. <br />
			</p>
			<h3 style={styles.heading}>Passer une commande :</h3>
			<p style={styles.paragraph}>
				Notre stratégie de vente est très simple : <br /> Après avoir
		trouvé la pièce souhaitée, veuillez passer commande pour que nous la
		livrions à votre domicile. <br /> Cette opération ne doit pas durer
		au-delà de 24h. <br /> Dès que vous recevez la pièce, vous devez
		régler le paiement en espèces, y compris les frais de transport. <br />
		Le Groupe Solide vous offre une garantie d'une semaine pour retourner
		la pièce et récupérer 100 % de votre argent, à l'exception des frais
		de transport. <br />
			</p>
			<h3 style={styles.heading}>La Livraison :</h3>
			<p style={styles.paragraph}>
			Sur Solide.ma, vous commandez et recevez votre envoi à domicile, la
		livraison se fait partout à Rabat, Salé et Témara. <br /> La
		livraison est assurée par notre service logistique de transport. <br />
		Le livreur ne peut pas assister à l'ouverture du colis. <br /> Les
		frais de livraison sont d'environ 20 Dhs TTC. <br /> Vous pouvez
		également récupérer votre commande à l'un de nos dépôts, après avoir
		été informé du dépôt où elle se trouve. <br />
			</p>
			<h3 style={styles.heading}>Protocole de Réception :</h3>
			<p style={styles.paragraph}>
			Après avoir reçu l'envoi, le livreur vous remet un protocole
		de réception à signer, qui contient toutes les informations concernant
		votre commande et la date exacte de réception de l'envoi. Après avoir
		payé la pièce, vous recevrez un reçu de paiement de la part du
		livreur. <br />
			</p>
			<h3 style={styles.heading}>Retour de la Pièce :</h3>
			<p style={styles.paragraph}>
			Si la pièce reçue ne correspond pas à votre demande, Solide
		vous offre la possibilité de la retourner dans un délai d'une semaine
		et de récupérer 100 % du montant payé. Dans ce cas, vous avez le choix
		soit de l'apporter à l'un de nos dépôts les plus proches, soit de
		commander un transport de retour chez Solide. Pour ce dernier service,
		des frais d'environ 15 Dhs seront appliqués. <br />
			</p>
		<h3 style={styles.heading}>Retour de la Pièce :</h3>
		<h3 style={styles.heading}>Retour de la Pièce :</h3>	
			
	   </div>
   );
};

export default About;
