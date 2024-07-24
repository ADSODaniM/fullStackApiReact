import React from 'react';
import { Link } from 'react-router-dom';

// Componente funcional CartPage que recibe props: cartItems, onAddToCart, onRemoveFromCart, onReduceQuantity
const CartPage = ({ cartItems, onAddToCart, onRemoveFromCart, onReduceQuantity }) => {
  // Calcula el total del carrito sumando el precio de cada producto multiplicado por su cantidad
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h2>Tu Carrito</h2>
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
      {/* Muestra el total del carrito */}
      <div className="cart-total">
        <strong>Total: ${total}</strong>
      </div>
      {/* Acción disponible para proceder al pago */}
      <div className="cart-menu-actions">
        <Link to="/invoice">Pagar</Link>
      </div>
    </div>
  );
};

// Exporta el componente CartPage como la exportación predeterminada del módulo
export default CartPage;
