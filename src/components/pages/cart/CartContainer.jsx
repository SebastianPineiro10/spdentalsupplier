import {
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { useCart } from "../../../context/CartContext";
import {
  Delete as DeleteIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/* Formateo MXN consistente */
const fmt = (n) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(n);

const CartContainer = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotal,
    getTotalQuantity,
    startCheckout,
  } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromCart = (prodId) => removeFromCart(prodId);
  const incrementQuantity = (prodId, quantity, stock) => {
    if (quantity < stock) updateQuantity(prodId, quantity + 1);
  };
  const decrementQuantity = (prodId, quantity) => {
    if (quantity > 1) updateQuantity(prodId, quantity - 1);
  };
  const handleCheckout = () => {
    startCheckout();
    navigate("/checkout");
  };
  const handleGoToBrief = () => navigate("/brief");

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 3, md: 4 },
        py: { xs: 1.25, sm: 2.5, md: 4 },
        backgroundColor: "#f6f7fb",
        borderRadius: { xs: "12px", sm: "16px" },
        boxShadow: { 
          xs: "0 2px 8px rgba(0,0,0,0.04)",
          sm: "0 8px 32px rgba(0,0,0,0.08)" 
        },
        mt: { xs: "170px", sm: "180px", md: "180px" },
        mx: { xs: 1.5, sm: "auto" },
        maxWidth: "1000px",
        mb: { xs: 2, sm: 4 },
      }}
    >
      {/* Encabezado compacto */}
      <Stack alignItems="center" spacing={0.5} sx={{ mb: { xs: 1, sm: 2.5 } }}>
        <Badge
          overlap="circular"
          color="primary"
          badgeContent={getTotalQuantity()}
          sx={{ "& .MuiBadge-badge": { fontWeight: 700, fontSize: { xs: "0.6rem", sm: "0.7rem" } } }}
        >
          <ShoppingCartIcon sx={{ fontSize: { xs: 20, sm: 28 }, color: "#003366" }} />
        </Badge>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#1b1f24",
            fontSize: { xs: "0.9rem", sm: "1.1rem" },
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Carrito ({getTotalQuantity()}) — {fmt(getTotal())}
        </Typography>
      </Stack>

      {/* Vacío */}
      {cart.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            textAlign: "center",
            borderRadius: "12px",
            border: "1px dashed #e2e8f0",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="body1" sx={{ color: "#6b7280", mb: 0.5 }}>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body2" sx={{ color: "#9aa1ab" }}>
            Agrega productos para verlos aquí
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Lista compacta */}
          <Box>
            {cart.map((product) => {
              const isMin = product.quantity <= 1;
              const isMax = product.quantity >= product.stock;

              return (
                <Paper
                  key={product.cartItemId}
                  elevation={0}
                  sx={{
                    p: { xs: 1.25, sm: 1.75 },
                    mb: { xs: 1, sm: 1.5 },
                    borderRadius: "10px",
                    border: "1px solid #e8ecf3",
                    backgroundColor: "#fff",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }}>
                    {/* Imagen pequeña */}
                    <Box
                      sx={{
                        width: { xs: 40, sm: 52 },
                        height: { xs: 40, sm: 52 },
                        borderRadius: "6px",
                        overflow: "hidden",
                        flexShrink: 0,
                        border: "1px solid #eef1f6",
                      }}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                    {/* Título y precio */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#111827",
                          fontSize: { xs: "0.75rem", sm: "0.85rem" },
                          lineHeight: 1.2,
                          mb: 0.2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: "#6b7280",
                          fontSize: { xs: "0.65rem", sm: "0.7rem" }
                        }}
                      >
                        {fmt(product.price)} c/u
                      </Typography>
                    </Box>

                    {/* Controles cantidad */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        p: 0.25,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => decrementQuantity(product.cartItemId, product.quantity)}
                        disabled={isMin}
                        sx={{ 
                          color: isMin ? "#cbd5e1" : "#374151",
                          width: { xs: 22, sm: 26 },
                          height: { xs: 22, sm: 26 },
                        }}
                      >
                        <RemoveIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
                      </IconButton>

                      <Typography
                        sx={{
                          mx: { xs: 0.5, sm: 0.75 },
                          color: "#111827",
                          fontWeight: 700,
                          fontSize: { xs: "0.75rem", sm: "0.85rem" },
                          minWidth: { xs: 18, sm: 22 },
                          textAlign: "center",
                        }}
                      >
                        {product.quantity}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={() => incrementQuantity(product.cartItemId, product.quantity, product.stock)}
                        disabled={isMax}
                        sx={{ 
                          color: isMax ? "#cbd5e1" : "#374151",
                          width: { xs: 24, sm: 28 },
                          height: { xs: 24, sm: 28 },
                        }}
                      >
                        <AddIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                      </IconButton>
                    </Stack>

                    {/* Subtotal */}
                    <Typography
                      sx={{
                        color: "#111827",
                        fontWeight: 700,
                        fontSize: { xs: "0.8rem", sm: "0.9rem" },
                        minWidth: { xs: 60, sm: 80 },
                        textAlign: "right",
                      }}
                    >
                      {fmt(product.price * product.quantity)}
                    </Typography>

                    {/* Eliminar */}
                    <IconButton
                      onClick={() => handleRemoveFromCart(product.cartItemId)}
                      sx={{
                        color: "#ef4444",
                        backgroundColor: "#fff1f2",
                        border: "1px solid #fee2e2",
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 },
                        "&:hover": { backgroundColor: "#ffe4e6" },
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                    </IconButton>
                  </Stack>
                </Paper>
              );
            })}
          </Box>

          <Divider sx={{ my: { xs: 1, sm: 1.5 }, opacity: 0.3 }} />

          {/* Footer compacto */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems="center"
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800, 
                color: "#111827",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                flex: { sm: 1 }
              }}
            >
              Total: {fmt(getTotal())}
            </Typography>

            <Stack direction="row" spacing={1.5}>
              <Button
                variant="contained"
                onClick={handleGoToBrief}
                size="small"
                sx={{
                  py: { xs: 1, sm: 1.25 },
                  px: { xs: 2, sm: 3 },
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  borderRadius: "8px",
                  backgroundColor: "#003366",
                  "&:hover": { backgroundColor: "#002244" },
                  fontWeight: 600,
                }}
              >
                Resumen
              </Button>

              <Button
                variant="contained"
                onClick={handleCheckout}
                size="small"
                sx={{
                  py: { xs: 1, sm: 1.25 },
                  px: { xs: 2, sm: 3 },
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  borderRadius: "8px",
                  backgroundColor: "#7e57c2",
                  "&:hover": { backgroundColor: "#6b46c1" },
                  fontWeight: 600,
                }}
              >
                Finalizar
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default CartContainer;