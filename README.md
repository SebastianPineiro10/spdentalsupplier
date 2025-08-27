# Ecommerce Coderhouse

Este proyecto es un sistema de comercio electrónico desarrollado por **Sebastián Piñeiro Madero** como parte de una practica utilizando React Js. El objetivo es ofrecer un catálogo de productos conectado a Firebase para simular un entorno básico de e-commerce.

🌐 **[Visita la aplicación en vivo aquí](https://spdentalsupplier.vercel.app/)**

---

## 🚀 Funcionalidades

- **Catálogo dinámico de productos:** Los datos se obtienen de Firebase Firestore.
- **Carrito de compras:** Permite agregar productos seleccionados para simular un flujo de compra.
- **Diseño responsivo:** Adaptado a dispositivos móviles y de escritorio utilizando Material-UI.
- **Navbar interactivo:** Incluye navegación por las secciones principales del sitio.

---

## 🛠️ Tecnologías utilizadas

### **Frontend**
- React.js
- Vite
- Material-UI
- CSS

### **Backend**
- Firebase Firestore (base de datos)

### **Despliegue**
- Vercel

---

## 📂 Estructura del proyecto

```plaintext
src/
├── assets/               # Recursos estáticos como imágenes
├── components/           # Componentes reutilizables como Navbar, CartWidget, etc.
│   ├── Navbar.jsx        # Barra de navegación
│   ├── ItemListContainer.jsx  # Contenedor para productos
│   └── CartWidget.jsx    # Ícono del carrito
├── firebase/             # Configuración de Firebase
│   └── firebaseConfig.js # Credenciales y conexión a Firestore
├── App.jsx               # Componente raíz
└── main.jsx              # Punto de entrada principal
