import React from 'react';
import fr from "../locales/footer/fr.json";
import ar from "../locales/footer/ar.json";

const Footer = ({ language, toggleLanguage }) => {
	const content = language === "fr" ? fr : ar;
   return (
       <footer>
           <p>&copy; 2024 {content.companyName}</p>
           <div>
               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
           </div>
           <address>
               {content.companyAdresse}
               <br />
               Phone: {content.companyPhone}
           </address>
       </footer>
   );
};

export default Footer;
