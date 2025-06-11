import React from 'react';
import { Carousel } from 'react-responsive-carousel';  
import "react-responsive-carousel/lib/styles/carousel.min.css";  
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Sección: Carrusel */}
      <div className="carousel-container">
        <Carousel
          autoPlay
          infiniteLoop
          showArrows={true}
          showThumbs={false}
          dynamicHeight={false}
        >
          <div>
            <img
              src="https://res.cloudinary.com/dcerhiol0/image/upload/f_auto,q_auto/v1735259632/220_swcqya.jpg"
              alt="Oferta 1"
              style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
            />
            <div className="legend">¡Descuento del 20% en Guantes de Nitrilo!</div>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dcerhiol0/image/upload/f_auto,q_auto/v1735259632/220_swcqya.jpg"
              alt="Oferta 2"
              style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
            />
            <div className="legend">¡Compra 2 Batas Quirúrgicas y la tercera es gratis!</div>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dcerhiol0/image/upload/f_auto,q_auto/v1735260756/braces-2886588_1280_vrl3xi.jpg"
              alt="Oferta 3"
              style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
            />
            <div className="legend">¡Hasta 30% de descuento en Material de Ortodoncia!</div>
          </div>
        </Carousel>
      </div>

      {/* Sección: Filosofía */}
      <div className="philosophy-section">
        <h3 className="section-title">Nuestra Filosofía</h3>
        <div className="philosophy-container">
          <div className="philosophy-item">
            <h4>Misión</h4>
            <p>En SP Dental Supplier nos dedicamos a ofrecer productos de alta calidad para profesionales dentales.</p>
          </div>
          <div className="philosophy-item">
            <h4>Visión</h4>
            <p>Ser líderes en el mercado de insumos dentales, brindando soluciones efectivas a nuestros clientes.</p>
          </div>
          <div className="philosophy-item">
            <h4>Valores</h4>
            <p>Nos guiamos por principios de integridad, responsabilidad, innovación y servicio al cliente.</p>
          </div>
        </div>
      </div>

      {/* Sección Informativa: ¿Por qué elegirnos? */}
      <div className="info-section">
        <h3 className="section-title">¿Por qué elegirnos?</h3>
        <div className="info-container">
          <div className="info-item">
            <h4>Calidad Garantizada</h4>
            <p>Ofrecemos productos de alta calidad que cumplen con los más altos estándares para profesionales dentales.</p>
          </div>
          <div className="info-item">
            <h4>Envíos Rápidos</h4>
            <p>Contamos con envíos rápidos y seguros para que recibas tus productos a tiempo.</p>
          </div>
          <div className="info-item">
            <h4>Atención Personalizada</h4>
            <p>Nuestro equipo está disponible para ayudarte y resolver todas tus dudas de manera eficiente.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
