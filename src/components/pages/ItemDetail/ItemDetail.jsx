import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import PropTypes from "prop-types";
import c1200, { c1200Set } from "../../../utils/c1200"; // <-- agregado

const ItemDetail = ({ item }) => {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesToShow, setImagesToShow] = useState([]);

  // LÓGICA ORIGINAL (igualita)
  useEffect(() => {
    if (Array.isArray(item.images) && item.images.length > 0) {
      setImagesToShow(item.images);
      setSelectedImage(item.images[0]);
    } else {
      const original = item.imageUrl;
      const grayscale = original.replace("/upload/", "/upload/e_grayscale/");
      const sepia = original.replace("/upload/", "/upload/e_sepia/");
      const fallbackImages = [original, grayscale, sepia];
      setImagesToShow(fallbackImages);
      setSelectedImage(original);
    }
  }, [item]);

  const handleImageChange = (img) => {
    if (img !== selectedImage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedImage(img);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleAddToCart = () => {
    addToCart(item);
  };

  // 👉 SOLO COMPRESIÓN/FORMATO (AVIF) Y RESPONSIVE EN RENDER
  const mainSrc    = selectedImage ? c1200(selectedImage, 1200, { mode: "limit", fmt: "avif" }) : "";
  const mainSrcSet = selectedImage ? c1200Set(selectedImage, [800, 1200, 1600], { mode: "limit", fmt: "avif" }) : "";
  const mainSizes  = "(max-width: 900px) 90vw, 900px";

  return (
    <Box sx={{ padding: "40px 0", backgroundColor: "#f9f9f9", marginTop: "160px" }}>
      <Box
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "row",
          gap: 4,
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
          margin: "0 auto",
          width: "80%",
          maxWidth: "1200px",
          flexWrap: "wrap",
        }}
      >
        {/* Imagen principal */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: { xs: 3, md: 0 },
          }}
        >
          <img
            src={mainSrc || selectedImage}
            srcSet={mainSrcSet}
            sizes={mainSizes}
            alt={item.title}
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
              marginBottom: "16px",
              opacity: isTransitioning ? 0.3 : 1,
              transition: "opacity 0.25s ease-in-out",
            }}
          />

          {/* Miniaturas */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {imagesToShow.map((img, idx) => (
              <img
                key={idx}
                src={c1200(img, 140, { mode: "limit", eco: true, fmt: "avif" })}
                alt={`Miniatura ${idx + 1}`}
                onClick={() => handleImageChange(img)}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "contain",
                  cursor: "pointer",
                  border: selectedImage === img ? "2px solid #007BFF" : "1px solid #ccc",
                  borderRadius: "6px",
                  transition: "border 0.2s ease",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Información del producto (sin cambios) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
            {item.title}
          </Typography>
          <Typography variant="h6" sx={{ color: "black", marginBottom: 2 }}>
            ${item.price}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {item.description}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 3 }}>
            Stock disponible: {item.stock}
          </Typography>

          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              width: "100%",
              padding: "12px",
              fontSize: "1rem",
              borderRadius: "6px",
              backgroundColor: "#007BFF",
              color: "white",
              "&:hover": { backgroundColor: "#0056b3" },
            }}
          >
            Añadir al carrito
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

ItemDetail.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ItemDetail;
