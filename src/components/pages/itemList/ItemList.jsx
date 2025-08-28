import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ProductCard from "../../common/card/ProductCard";
import c1200, { c1200Set } from "../../../utils/c1200";
import "./itemlist.css";

const ItemList = ({ items }) => {
  if (!Array.isArray(items)) return null;

  // Primeras 6 arriba del pliegue
  const top = items.slice(0, 6);

  return (
    <HelmetProvider>
      <>
        <Helmet>
          {/* Acelera conexión */}
          <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
          <link rel="dns-prefetch" href="https://res.cloudinary.com" />
          <link rel="preconnect" href="https://firebasestorage.googleapis.com" crossOrigin="" />
          <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
          {/* Preload de las primeras 6 imágenes */}
          {top.map((p) => {
            const image = p.image || p.imageUrl;
            if (!image) return null;
            const href = c1200(image, 480, { eco: true, mode: 'limit' });
            const srcset = c1200Set(image, [320, 480, 640], { eco: true, mode: 'limit' });
            return (
              <link
                key={p.id}
                rel="preload"
                as="image"
                href={href}
                imagesrcset={srcset}
                imagesizes="(max-width: 760px) 50vw, 300px"
                fetchpriority="high"
              />
            );
          })}
        </Helmet>

        <Box className="product-grid" sx={{ p: 2 }}>
          {items.map((p, i) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              price={p.price}
              image={p.image || p.imageUrl}
              aboveFold={i < 6}
            />
          ))}
        </Box>
      </>
    </HelmetProvider>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      imageUrl: PropTypes.string
    })
  ).isRequired
};

export default ItemList;
