import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import PropTypes from "prop-types";
import c1200, { c1200Set } from "../../../utils/c1200"; // <-- usa c1200

const FALLBACK_IMG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='900' height='675'><rect width='100%' height='100%' fill='%23f2f2f2'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='18'>Imagen no disponible</text></svg>";

const ItemDetail = ({ item }) => {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesToShow, setImagesToShow] = useState([]);

  useEffect(() => {
    if (!item) return;

    if (Array.isArray(item.images) && item.images.length > 0) {
      const imgs = item.images.map((u) => c1200(u, 1200, { mode: 'limit' }));
      setImagesToShow(imgs);
      setSelectedImage(imgs[0]);
    } else if (item.imageUrl) {
      const original  = c1200(item.imageUrl, 1200, { mode: 'limit' });
      const grayscale = c1200(item.imageUrl.replace("/upload/", "/upload/e_grayscale/"), 1200, { mode: 'limit' });
      const sepia     = c1200(item.imageUrl.replace("/upload/", "/upload/e_sepia/"), 1200, { mode: 'limit' });
      setImagesToShow([original, grayscale, sepia]);
      setSelectedImage(original);
    } else {
      setImagesToShow([]);
      setSelectedImage("");
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

  const handleAddToCart = () => addToCart(item);

  const mainSrc    = selectedImage;
  const mainSrcSet = selectedImage ? c1200Set(selectedImage, [800, 1200, 1600], { mode: 'limit' }) : undefined;
  const mainSizes  = "(max-width: 900px) 90vw, 900px";

  return (
    <Box sx={{ padding: "40px 0", backgroundColor: "#f9f9f9", marginTop: "160px" }}>
      <Box sx={{ p:3, display:"flex", flexDirection:"row", gap:4, backgroundColor:"#fff", borderRadius:"10px", boxShadow:"0 1px 5px rgba(0,0,0,.1)", m:"0 auto", width:"80%", maxWidth:"1200px", flexWrap:"wrap" }}>
        {/* Imagen principal */}
        <Box sx={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", maxWidth:"100%", mb:{ xs:3, md:0 } }}>
          {mainSrc ? (
            <img
              src={mainSrc}
              srcSet={mainSrcSet}
              sizes={mainSizes}
              alt={item.title}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
              style={{
                width:"100%", maxWidth:"400px", height:"auto", objectFit:"contain",
                borderRadius:"8px", marginBottom:"16px",
                opacity: isTransitioning ? 0.3 : 1, transition:"opacity .25s ease-in-out",
                display:"block"
              }}
            />
          ) : null}

          {/* Miniaturas */}
          <Box sx={{ display:"flex", gap:2 }}>
            {imagesToShow.map((img, idx) => (
              <img
                key={idx}
                src={c1200(img, 140, { mode: 'limit' })}
                alt={`Miniatura ${idx + 1}`}
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                onClick={() => handleImageChange(img)}
                style={{
                  width:60, height:60, objectFit:"contain", cursor:"pointer",
                  border: selectedImage === img ? "2px solid #007BFF" : "1px solid #ccc",
                  borderRadius:"6px", transition:"border .2s ease", display:"block"
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Info */}
        <Box sx={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <Typography variant="h5" sx={{ fontWeight:600, mb:2 }}>{item.title}</Typography>
          <Typography variant="h6" sx={{ color:"black", mb:2 }}>${item.price}</Typography>
          <Typography variant="body1" sx={{ mb:2 }}>{item.description}</Typography>
          <Typography variant="body2" sx={{ mb:3 }}>Stock disponible: {item.stock}</Typography>

          <Button variant="contained" onClick={handleAddToCart}
            sx={{ width:"100%", p:"12px", fontSize:"1rem", borderRadius:"6px", backgroundColor:"#007BFF", color:"white", "&:hover":{ backgroundColor:"#0056b3" } }}>
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
