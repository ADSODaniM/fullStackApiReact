// Importación de React y Hooks necesarios
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Importación de los componentes
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartMenu from './components/CartMenu';
import CartPage from './components/CartPage';
import SalesReport from './components/SalesReport';
import InvoiceForm from './components/InvoiceForm';
import InvoicePDF from './components/InvoicePDF';

// Datos iniciales de los productos
const initialProducts = [
  { id: 1, name: 'Secador De Uñas Lampara Led', price: 49.99, image: '/images/Lampara.jpg' },
  { id: 2, name: 'Estuche Kit Uñas', price: 39.99, image: '/images/Kituñas.jpg' },
  { id: 3, name: 'Removedor de Esmalte', price: 6.99, image: '/images/Removedor.jpg' },
  { id: 4, name: 'Lima' , price: 29.99, image: '/images/Lima.jpg' },
  { id: 5, name: 'Corta Uñas', price: 14.99, image: '/images/Cortauñas.jpg' },
  { id: 6, name: 'Alicate Cortacuticula', price: 10.99, image: '/images/Alicate.jpg' },
  { id: 7, name: 'Esmaltes Masglo', price: 7.99, image: '/images/Esmalte.jpg' },
  { id: 8, name: 'Separadores de Dedos', price: 4.99, image: '/images/Separadores.jpg' },
  { id: 9, name: 'Raspacallos', price: 2.99, image: '/images/Raspacallos.jpg' },
];

// Datos iniciales de las ventas
const initialSalesData = [
  { time: '2023-01-01', value: 100 },
  { time: '2023-02-01', value: 200 },
  { time: '2023-03-01', value: 150 },
  { time: '2023-04-01', value: 400 },
  { time: '2023-05-01', value: 300 },
  { time: '2023-06-01', value: 250 },
  { time: '2023-07-01', value: 350 },
  { time: '2024-01-01', value: 450 },
  { time: '2024-02-01', value: 500 },
  { time: '2024-03-01', value: 550 },
  { time: '2024-04-01', value: 600 },
  { time: '2024-05-01', value: 650 },
  { time: '2024-06-01', value: 700 },
];

// Componente principal de la aplicación
const App = () => {
   // Estado para los productos, datos de ventas y el carrito
  const [products] = useState(initialProducts);
  const [salesData] = useState(initialSalesData);
  const [cartItems, setCartItems] = useState([]);
  const [showCartMenu, setShowCartMenu] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({});
  const navigate = useNavigate();

  // Función para agregar un producto al carrito
  const handleAddToCart = (product, quantity) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { product, quantity }]);
    }
    setShowCartMenu(true);
  };

  // Función para eliminar un producto del carrito
  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.product.id !== productId));
  };

  // Función para reducir la cantidad de un producto en el carrito
  const handleReduceQuantity = (productId) => {
    const existingItem = cartItems.find(item => item.product.id === productId);
    if (existingItem.quantity > 1) {
      setCartItems(cartItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      handleRemoveFromCart(productId);
    }
  };

  // Función para cerrar el menú del carrito
  const handleCloseCartMenu = () => {
    setShowCartMenu(false);
  };

  // Función para manejar la información de pago
  const handlePaymentInfo = (info) => {
    setPaymentInfo(info);
  };

  return (
    <div className="app">
  
      {/* Renderiza el componente Header, pasando el número de artículos en el carrito como una propiedad */}
      <Header cartCount={cartItems.length} />
 
      {/* Definición de rutas para la navegación de la aplicación */}
      <Routes> 

        {/* Ruta para la lista de productos. Se renderiza en la raíz del sitio ("/") */}
        <Route
          path="/"
          element={<ProductList products={products} onAddToCart={handleAddToCart} />}
        />
       
        {/* Ruta para la página del carrito. Se renderiza en "/cart" */}
        <Route
          path="/cart"
          element={<CartPage
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onReduceQuantity={handleReduceQuantity}
          />}
        />
        
        {/* Ruta para el reporte de ventas. Se renderiza en "/sales-report" */}
        <Route path="/sales-report" element={<SalesReport data={salesData} />} />

        {/* Ruta para el formulario de factura. Se renderiza en "/invoice" */}
        <Route path="/invoice" element={<InvoiceForm cartItems={cartItems} />} />

        {/* Ruta para la vista PDF de la factura. Se renderiza en "/invoice-pdf" */}
        <Route path="/invoice-pdf" element={<InvoicePDF />} />
        
      </Routes>
            {/* Condicional para mostrar el menú del carrito si showCartMenu es verdadero */}
      {showCartMenu && (
        <CartMenu
          cartItems={cartItems} // Artículos en el carrito
          onClose={handleCloseCartMenu} // Función para cerrar el menú del carrito
          onAddToCart={handleAddToCart} // Función para agregar un producto al carrito
          onRemoveFromCart={handleRemoveFromCart} // Función para eliminar un producto del carrito
          onReduceQuantity={handleReduceQuantity} // Función para reducir la cantidad de un producto en el carrito
        />
      )}

    </div>
  );
};

export default App; // Exporta el componente App como la exportación predeterminada del módulo
