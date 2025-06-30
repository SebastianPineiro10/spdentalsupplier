import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div className="home-container">
      {/* Carrusel de Promociones */}
      <div className="carousel-container">
        <Carousel autoPlay infiniteLoop showArrows showThumbs={false}>
          <div>
            <img src="https://res.cloudinary.com/dcerhiol0/image/upload/f_auto,q_auto/v1735259632/220_swcqya.jpg" alt="Oferta 1" />
            <div className="legend">¡Descuento del 20% en Guantes de Nitrilo!</div>
          </div>
          <div>
            <img src="https://res.cloudinary.com/dcerhiol0/image/upload/f_auto,q_auto/v1735259632/220_swcqya.jpg" alt="Oferta 2" />
            <div className="legend">¡Compra 2 Batas Quirúrgicas y la tercera es gratis!</div>
          </div>
          <div>
            <img src="https://res.cloudinary.com/dcerhiol0/image/upload/f_auto,q_auto/v1735260756/braces-2886588_1280_vrl3xi.jpg" alt="Oferta 3" />
            <div className="legend">¡Hasta 30% de descuento en Ortodoncia!</div>
          </div>
        </Carousel>
      </div>

      {/* Sección: Filosofía */}
      <section className="philosophy-section">
        <h3 className="section-title">Nuestra Filosofía</h3>
        <div className="philosophy-container">
          <div className="philosophy-item">
            <h4>Misión</h4>
            <p>Ofrecemos productos de alta calidad para profesionales dentales que buscan confianza y eficiencia.</p>
          </div>
          <div className="philosophy-item">
            <h4>Visión</h4>
            <p>Ser líderes en distribución de insumos dentales en México, con un enfoque innovador y humano.</p>
          </div>
          <div className="philosophy-item">
            <h4>Valores</h4>
            <p>Integridad, responsabilidad, servicio personalizado y mejora continua.</p>
          </div>
        </div>
      </section>

      {/* Sección: ¿Por qué elegirnos? */}
      <section className="info-section">
        <h3 className="section-title">¿Por qué elegirnos?</h3>
        <div className="info-container">
          <div className="info-item">
            <h4>Calidad Garantizada</h4>
            <p>Productos confiables que cumplen con los más altos estándares.</p>
          </div>
          <div className="info-item">
            <h4>Envíos Rápidos</h4>
            <p>Logística eficiente para entregas puntuales en todo el país.</p>
          </div>
          <div className="info-item">
            <h4>Atención Personalizada</h4>
            <p>Te asesoramos y respondemos tus dudas con rapidez y claridad.</p>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <Testimonials />
    </div>
  );
};

export default Home;
