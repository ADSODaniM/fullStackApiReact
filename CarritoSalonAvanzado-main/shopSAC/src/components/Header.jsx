import React, { useState, useEffect } from 'react'; // Importa React, useState y useEffect para manejar estado y efectos
import { Link, useNavigate } from 'react-router-dom'; // Importa Link y useNavigate para la navegación y enlaces

// Definición del componente Header
const Header = ({ cartCount }) => {
  // Definición del estado local user con useState
  const [user, setUser] = useState({
    username: localStorage.getItem('username'), // Obtiene el nombre de usuario del localStorage
    role: localStorage.getItem('role') // Obtiene el rol del usuario del localStorage
  
  });
  const navigate = useNavigate(); // Hook para la navegación

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    ['username', 'token', 'role', 'userId'].forEach(item => localStorage.removeItem(item));
    setUser({ username: null, role: null }); // Resetea el estado user
    navigate('/'); // Navega a la página de inicio
  };

  // useEffect para manejar cambios en el localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      // Actualiza el estado user con los valores del localStorage
      setUser({
        username: localStorage.getItem('username'),
        role: localStorage.getItem('role')
      });
    };

     // Agrega un event listener para el evento 'storage'
    window.addEventListener('storage', handleStorageChange);
    // Cleanup del event listener al desmontar el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

    // Renderizado del componente Header
  return (
    <header className="header">
      <h1>SAC</h1>
      <nav>
        {/* Enlaces de navegación */}
        <Link to="/">Inicio</Link>
        <Link to="/cart">Carrito ({cartCount})</Link> {/* Muestra el número de ítems en el carrito */}
        <Link to="/sales-report">Reporte de Ventas</Link>
        {/* Enlaces visibles solo para usuarios con rol 'admin' */}
        {user.role === 'admin' && <Link to="/manage-products">G. Productos</Link>}
        {user.role === 'admin' && <Link to="/manage-orders">G. Pedidos</Link>} {/* Link a la gestión de pedidos */}
        {user.username ? (
          <>
            {/* Enlaces visibles solo para usuarios autenticados */}
            <Link to="/pedidos">Mis Pedidos</Link> {/* Enlace a los pedidos */}
            <span>  <Link to="/update-user">Bienvenido, {user.username} ({user.role})</Link></span> {/* Muestra el nombre y rol del usuario */}
            <Link to="/" onClick={handleLogout}>Cerrar S.</Link> {/* Enlace para cerrar sesión */}
          </>
        ) : (
          <>
             {/* Enlaces visibles solo para usuarios no autenticados */}
            <Link to="/register">Registro</Link>
            <Link to="/login">Ingresar</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header; // Exporta el componente para ser usado en otras partes de la aplicación
