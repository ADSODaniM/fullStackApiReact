// Importamos las dependencias necesarias de React y el componente Product
import React from 'react';
import Product from './Product';

// Definimos el componente ProductList que recibe dos props: products y onAddToCart
const ProductList = ({ products, onAddToCart }) => (
   // Contenedor principal de la lista de productos con la clase "product-list"
  <div className="product-list">
    {/* Recorremos el array de productos y para cada producto renderizamos un componente Product */}
    {products.map(product => (
      // Cada componente Product recibe una key única (product.id), el producto actual y la función onAddToCart
      <Product key={product.id} product={product} onAddToCart={onAddToCart} />
    ))}
  </div>
);

// Exportamos el componente para su uso en otras partes de la aplicación
export default ProductList;
