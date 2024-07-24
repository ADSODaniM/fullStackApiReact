import React from 'react';
import { Link } from 'react-router-dom';

// Componente funcional Header que recibe la prop cartCount
const Header = ({ cartCount }) => (
  // Definición del encabezado con la clase "header"
  <header className="header">
    {/* Título de la aplicación */}
    <h1>Aplicación de Carrito de Compras</h1>
    {/* Sección de navegación */} 
    <nav>
      {/* Enlaces de navegación usando el componente Link de react-router-dom */}
      <Link to="/">Inicio</Link> {/* Enlace de navegación que dirige a la página de inicio */}
      <Link to="/cart">Carrito ({cartCount})</Link> {/* Enlace de navegación que dirige a la página del carrito y muestra la cantidad de productos en el carrito */}
      <Link to="/sales-report">Reporte de Ventas</Link> {/* Enlace de navegación que dirige a la página del reporte de ventas */}
    </nav>
  </header>
);

// Exporta el componente Header como la exportación predeterminada del módulo
export default Header;
