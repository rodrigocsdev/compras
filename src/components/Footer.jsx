// Footer.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">Desenvolvido por {' '}
          <a href="https://github.com/rodrigocsdev" target="_blank" rel="noopener noreferrer" className="footer-link">
            Rodrigo Santos
          </a>
        </p>
        <a href="https://github.com/rodrigocsdev" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
