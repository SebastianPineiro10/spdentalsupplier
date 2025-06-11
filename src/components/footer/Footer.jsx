import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <div className="footer-column">
          <h4>Sobre Nosotros</h4>
          <ul>
            <li><a href="#">Nuestra Historia</a></li>
            <li><a href="#">Nuestro Equipo</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Servicios</h4>
          <ul>
            <li><a href="/services">Servicios Dentales</a></li>
            <li><a href="/pricing">Precios</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Soporte</h4>
          <ul>
            <li><a href="#">Preguntas Frecuentes</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
      </div>
      
      {/* Aquí están las secciones de contacto y redes sociales al final */}
      <div className="footer-content">
        <div className="contact">
          <h4>Contacto</h4>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt />
              <span> Calle Ficticia 123</span>
            </div>
            <div className="contact-item">
              <FaPhoneAlt />
              <span> +123 456 7890</span>
            </div>
            <div className="contact-item">
              <FaEnvelope />
              <span> contacto@spdepositodental.com</span>
            </div>
          </div>
        </div>
        <div className="social-media">
          <h4>Redes Sociales</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




