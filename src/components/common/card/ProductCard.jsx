import PropTypes from 'prop-types';
import { Box, Typography, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import c1200, { c1200Set } from '../../../utils/c1200';
import './ProductCard.css';

const FALLBACK_IMG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='100%' height='100%' fill='%23f2f2f2'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='14'>Imagen no disponible</text></svg>";

const ProductCard = ({ title, price, image, id, aboveFold = false }) => {
  // Cards: 480px + compresión eco
  const src    = c1200(image, 480, { eco: true, mode: 'limit' });
  const srcSet = c1200Set(image, [320, 480, 640], { eco: true, mode: 'limit' });
  const sizes  = "(max-width: 760px) 50vw, 300px";

  return (
    <Box
      className="product-card"
      sx={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}
    >
      {image && (
        <CardMedia
          component="img"
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={title}
          loading={aboveFold ? "eager" : "lazy"}
          fetchpriority={aboveFold ? "high" : "low"}
          decoding="async"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
          sx={{
            width:'100%', height:'auto', maxHeight:160, objectFit:'contain',
            borderRadius:'4px', mb:'16px', display:'block'
          }}
        />
      )}

      <Typography variant="h6" sx={{ fontWeight:600, mb:'8px', textAlign:'center' }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color:'gray', mb:'16px' }}>
        Precio: ${price}
      </Typography>

      <div className="product-card-content" style={{ width:'100%' }}>
        <Link to={`/item/${id}`} style={{ width:'100%', textDecoration:'none' }}>
          <Button
            variant="contained"
            sx={{
              width:'100%', p:'12px', fontSize:'1rem', borderRadius:'6px',
              backgroundColor:'#007BFF', color:'white',
              '&:hover': { backgroundColor:'#0056b3' }
            }}
          >
            Ver detalles
          </Button>
        </Link>
      </div>
    </Box>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  id: PropTypes.string.isRequired,
  aboveFold: PropTypes.bool
};

export default ProductCard;
