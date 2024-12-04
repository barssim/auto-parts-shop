import React from 'react';
import fr from "../locales/footer/fr.json";
import ar from "../locales/footer/ar.json";

const Footer = ({ language, toggleLanguage }) => {
	const content = language === "fr" ? fr : ar;
   return (
       <footer>
           <p>&copy; 2024 {content.companyName}</p>
           <div>
               <a href={content.facebook_link} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>Facebook</a>
               <a href={content.twitter_link} target="_blank" rel="noopener noreferrer">Twitter</a>
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
