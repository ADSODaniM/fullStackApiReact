// Importamos las dependencias necesarias de React
import React, { useState } from 'react';

// Definimos el componente Product que recibe dos props: product y onAddToCart
const Product = ({ product, onAddToCart }) => {
  // Utilizamos el hook useState para manejar el estado de la cantidad del producto
  const [quantity, setQuantity] = useState(1);

  const imageURL = `http://localhost:5000/uploads/${product.imagen}`;

  return (
    // Contenedor principal del producto con la clase "product"
    <div className="product">
      {/* Imagen del producto */}
      <img src={imageURL} alt={product.name} />
      {/* Nombre del producto */}
      <h2>{product.name}</h2>
      {/* Precio del producto formateado a dos decimales */}
      <p>${product.price.toFixed(2)}</p>
      {/* Controles de cantidad */}
      <div className="quantity-controls">
        {/* Botón para reducir la cantidad. La cantidad no puede ser menor que 1 */}
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        {/* Muestra la cantidad actual */}
        <span>{quantity}</span>
        {/* Botón para aumentar la cantidad */}
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      {/* Botón para añadir el producto al carrito con la cantidad seleccionada */}
      <button onClick={() => onAddToCart(product, quantity)}>Añadir al Carrito</button>
    </div>
  );
};

// Exportamos el componente para su uso en otras partes de la aplicación
export default Product;
