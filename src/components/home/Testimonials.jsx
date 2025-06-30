import { useState } from 'react';
import { Quote, Star } from 'lucide-react';
import './Testimonials.css';          // Asegúrate de que la ruta sea correcta

const testimonials = [
  { id: 1, quote: 'Excelente servicio, muy profesional y confiable.', author: 'María Gómez' },
  { id: 2, quote: 'Encontraron justo lo que necesitaba. ¡Gracias!',     author: 'Carlos Ramírez' },
  { id: 3, quote: 'Muy atentos y con gran conocimiento del mercado.',   author: 'Lucía Hernández' },
  { id: 4, quote: 'Productos de excelente calidad, muy recomendados.', author: 'Javier Torres' },
  { id: 5, quote: 'Siempre me atienden con amabilidad y rapidez.',      author: 'Ana López' },
  { id: 6, quote: 'Muy buena experiencia, volveré a comprar.',          author: 'Luis Fernández' }
];

export default function Testimonials() {
  const itemsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => setStartIndex(prev => Math.max(prev - itemsPerPage, 0));
  const handleNext = () =>
    setStartIndex(prev => Math.min(prev + itemsPerPage, testimonials.length - itemsPerPage));

  const visible = testimonials.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-title">
          <h2>Lo que dicen nuestros clientes</h2>
        </div>

        <div className="testimonial-controls">
          <button onClick={handlePrev} disabled={startIndex === 0}>
            &lt;
          </button>

          <div className="testimonials-grid">
            {visible.map(t => (
              <div key={t.id} className="testimonial-card">
                <Quote size={48} className="testimonial-quote-icon" />
                <p className="testimonial-quote">“{t.quote}”</p>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} />
                  ))}
                </div>
                <p className="testimonial-author">– {t.author}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= testimonials.length}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
