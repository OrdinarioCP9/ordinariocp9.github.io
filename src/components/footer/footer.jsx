import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#acerca">Acerca de</a>
          <a href="#contacto">Contacto</a>
        </div>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Inversiones Ramirez Group. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
