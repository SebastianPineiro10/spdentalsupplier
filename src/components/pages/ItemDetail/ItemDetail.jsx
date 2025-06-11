import { Box, Typography, Button, CardMedia } from "@mui/material";
import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import PropTypes from "prop-types";

const ItemDetail = ({ item }) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(item.imageUrl); // Imagen principal
  const imagesToShow = [
    item.imageUrl, // Imagen principal
    "https://via.placeholder.com/400x400.png?text=Imagen+2", // Imagen secundaria 1
    "https://via.placeholder.com/400x400.png?text=Imagen+3", // Imagen secundaria 2
  ];

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <Box sx={{ padding: "40px 0", backgroundColor: "#f9f9f9", marginTop: "160px" }}> {/* Añadido el margen superior */}
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
        {/* Imágenes del producto */}
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
          <CardMedia
            component="img"
            src={selectedImage}
            alt={item.title}
            sx={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "contain",
              borderRadius: "10px",
              marginBottom: 3,
              transition: "transform 0.5s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />

          {/* Tira de imágenes */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {imagesToShow.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                src={image}
                alt={`Imagen del producto ${index + 1}`}
                sx={{
                  width: 70,
                  height: 70,
                  objectFit: "contain",
                  cursor: "pointer",
                  borderRadius: "5px",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
                onClick={() => setSelectedImage(image)} // Cambiar imagen principal al hacer clic
              />
            ))}
          </Box>
        </Box>

        {/* Detalles del producto */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
            height: "100%",
            maxWidth: { xs: "100%", sm: "80%" },
          }}
        >
          {/* Título del producto */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              fontFamily: "'Roboto', sans-serif",
              color: "#333",
              fontSize: { xs: "1.8rem", sm: "2.2rem" },
              textAlign: "left",
            }}
          >
            {item.title}
          </Typography>

          {/* Precio más discreto */}
          <Typography
            variant="h5"
            sx={{
              color: "#333",
              fontWeight: "500",
              marginBottom: 2,
              fontSize: { xs: "1.4rem", sm: "1.6rem" },
              padding: "6px 12px",
              borderRadius: "5px",
              display: "inline-block",
            }}
          >
            ${item.price}
          </Typography>

          {/* Descripción del producto */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: 2,
              color: "#777",
              lineHeight: 1.6,
              textAlign: "left",
              fontSize: { xs: "1rem", sm: "1.1rem" },
              maxWidth: "90%",
              marginTop: 2,
            }}
          >
            {item.description}
          </Typography>

          {/* Stock disponible */}
          <Typography
            variant="body2"
            sx={{
              color: "#555",
              textAlign: "left",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              marginBottom: 2,
            }}
          >
            Stock disponible: {item.stock}
          </Typography>

          {/* Botón de añadir al carrito */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              sx={{
                padding: "8px 18px",
                fontWeight: "500",
                fontSize: { xs: "1rem", sm: "1.1rem" },
                borderRadius: "5px",
                textTransform: "none", // Evitar que el texto se transforme
                backgroundColor: "#0073e6",
                "&:hover": {
                  backgroundColor: "#005bb5",
                },
              }}
            >
              Añadir al carrito
            </Button>
          </Box>
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
    category: PropTypes.string.isRequired,
    isUploaded: PropTypes.bool.isRequired,
    additionalImages: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ItemDetail;


