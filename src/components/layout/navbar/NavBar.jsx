import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import MasksIcon from '@mui/icons-material/HealthAndSafety';
import GlovesIcon from '@mui/icons-material/Handyman';
import GownIcon from '@mui/icons-material/LocalHospital';
import OrthodonticsIcon from '@mui/icons-material/Science';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CartWidget from '../../common/cartWidget/Cartwidget';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const pages = [
  { name: 'Inicio', route: '/' },
  { name: 'Cubrebocas', route: '/category/cubrebocas' },
  { name: 'Guantes de Nitrilo', route: '/category/guantes' },
  { name: 'Batas Quirúrgicas', route: '/category/batas' },
  { name: 'Material ortodoncia', route: '/category/ortodoncia' },
];

const socialLinks = [
  { name: 'Facebook', icon: <FacebookIcon sx={{ color: 'white' }} />, url: 'https://facebook.com' },
  { name: 'Instagram', icon: <InstagramIcon sx={{ color: 'white' }} />, url: 'https://instagram.com' },
  { name: 'Twitter', icon: <TwitterIcon sx={{ color: 'white' }} />, url: 'https://twitter.com' },
];

function ResponsiveAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#222222', boxShadow: 'none', top: 0, left: 0, right: 0 }}>
        <Container maxWidth="xl" sx={{ padding: 0 }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', padding: '0 20px' }}>
            {/* Drawer móvil */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <IconButton size="large" aria-label="menu" onClick={toggleDrawer(true)} color="inherit">
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    {pages.map((page) => (
                      <ListItem key={page.name} sx={{ width: '100%' }}>
                        <NavLink
                          to={page.route}
                          style={{
                            textDecoration: 'none',
                            color: 'white',
                            fontSize: '1.2rem',
                            display: 'block',
                            width: '100%',
                          }}
                          className={({ isActive }) => (isActive ? 'navbar-active' : '')}
                        >
                          <ListItemText primary={page.name} />
                        </NavLink>
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                  <List sx={{ display: 'flex', justifyContent: 'center', gap: '15px', paddingBottom: '10px' }}>
                    {socialLinks.map((link) => (
                      <IconButton
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        size="large"
                      >
                        {link.icon}
                      </IconButton>
                    ))}
                  </List>
                  <p className="drawer-footer">SP Dental Supplier © 2024. Todos los derechos reservados.</p>
                </Box>
              </Drawer>
            </Box>

            {/* Logo */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <img
                src="https://res.cloudinary.com/dcerhiol0/image/upload/v1735596798/a-minimalistic-and-elegant-logo-for-a-de_HzvEXQkJTGWNziV1AhZFtQ_NnMIXN3vTVu4xi_Ao1dDuQ-Photoroom_ovcvgp.png"
                alt="Logo"
                style={{ height: '150px', marginBottom: '5px' }}
              />
            </Box>

            {/* Menú Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {pages.map((page) => (
                <NavLink
                  key={page.name}
                  to={page.route}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    display: 'block',
                    marginRight: '15px',
                    backgroundColor: 'transparent',
                    padding: '10px 15px',
                    transition: 'background-color 0.3s ease',
                  }}
                  className={({ isActive }) => (isActive ? 'navbar-active' : '')}
                >
                  <Button
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                </NavLink>
              ))}
            </Box>

            {/* Carrito */}
            <CartWidget itemCount={3} />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default ResponsiveAppBar;
