import React from 'react';
import { Link } from 'react-router-dom';

// Componente funcional CartMenu que recibe props: cartItems, onClose, onAddToCart, onRemoveFromCart, onReduceQuantity
const CartMenu = ({ cartItems, onClose, onAddToCart, onRemoveFromCart, onReduceQuantity }) => {

  // Calcula el total del carrito sumando el precio de cada producto multiplicado por su cantidad
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-menu">
      {/* Botón para cerrar el menú del carrito */}
      <button className="close-button" onClick={onClose}>X</button>
      <h2>Carrito</h2>
      {cartItems.length === 0 ? (
        // Mensaje que se muestra si no hay productos en el carrito
        <p>No hay productos en el carrito.</p>
      ) : (
        // Lista de productos en el carrito
        <ul>
          {cartItems.map(item => (
            <li key={item.product.id}>
              <div className="cart-item">
                {/* Nombre del producto y cantidad */}
                <span className="cart-item-name">{item.product.name} x {item.quantity}</span>
                <div className="quantity-controls">
                  {/* Botón para reducir la cantidad del producto */}
                  <button onClick={() => onReduceQuantity(item.product.id)}>-</button>
                  <span>{item.quantity}</span>
                  {/* Botón para aumentar la cantidad del producto */}
                  <button onClick={() => onAddToCart(item.product, 1)}>+</button>
                  {/* Botón para eliminar el producto del carrito */}
                  <button className="remove-button" onClick={() => onRemoveFromCart(item.product.id)}>Eliminar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/*  Muestra el total del carrito  */}
      <div className="cart-total">
        <strong>Total: ${total}</strong>
      </div>
      {/* Acciones disponibles en el menú del carrito */}
      <div className="cart-menu-actions">
        {/* Botón para cerrar el menú y seguir comprando */}
        <button onClick={onClose}>Seguir Comprando</button>
        {/* Enlace para ver el carrito */}
        <Link to="/cart" onClick={onClose}>Ver Carrito</Link>
        {/* Enlace para proceder al pago*/}
        <Link to="/invoice" onClick={onClose}>Pagar</Link>
      </div>
    </div>
  );
};

// Exporta el componente CartMenu como la exportación predeterminada del módulo
export default CartMenu;
