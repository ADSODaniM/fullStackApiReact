// Importación de React y Hooks necesarios
import React, { useState, useEffect } from 'react'; // Importar useEffect
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Importar useLocation

// Importación de los componentes
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartMenu from './components/CartMenu';
import CartPage from './components/CartPage';
import SalesReport from './components/SalesReport';
import InvoiceForm from './components/InvoiceForm';
import InvoicePDF from './components/InvoicePDF';
import axios from 'axios'; // Importar axios
import Register from './components/Register';
import Login from './components/Login';
import ManageProducts from './components/ManageProducts';
import Pedidos from './components/Pedidos';

// Datos iniciales de los productos
const initialProducts = [];

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

// Función de mapeo para transformar los datos de la API
const mapProductData = (product) => {
  return {
    id: product._id,
    name: product.nombre, 
    price: product.precio,
    imagen: product.imagen,
    // Agrega más mapeos según sea necesario
  };
};

// Componente principal de la aplicación
const App = () => {
   // Estado para los productos, datos de ventas y el carrito
  const [products, setProducts] = useState(initialProducts);
  const [salesData] = useState(initialSalesData);
  const [cartItems, setCartItems] = useState([]);
  const [showCartMenu, setShowCartMenu] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({});
  const navigate = useNavigate();
  const location = useLocation(); // Usar useLocation para rastrear la ubicación

  // Hook useEffect para cargar productos desde la API cuando la ruta es la raíz ('/')
  // Dependencias: location.pathname (se ejecutará cuando cambie)

  // Define una función asíncrona para obtener los productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Realiza una solicitud GET a la API para obtener los productos
        const response = await axios.get('http://localhost:5000/api/productos');
        console.log('Productos desde la API:', response.data);
        // Mapeamos los productos antes de establecerlos en el estado
        const mappedProducts = response.data.map(mapProductData);
        // Actualiza el estado con los productos mapeados
        setProducts(mappedProducts);
      } catch (error) {
        // Maneja y registra cualquier error que ocurra durante la solicitud
        console.error('Error al obtener los productos', error);
      }
    };

    // Verifica si la ruta actual es la raíz ('/') antes de llamar a fetchProducts
    if (location.pathname === '/') {
      fetchProducts();
    }
  }, [location.pathname]); // El useEffect se ejecuta cuando cambia location.pathname

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

  // Definición del componente PrivateRoute
  const PrivateRoute = ({ children }) => {
    // Obtiene el rol del usuario del localStorage
    const role = localStorage.getItem('role');
      // Si el rol es 'admin', renderiza los componentes hijos
      // Si el rol no es 'admin', muestra un mensaje de acceso denegado
    return role === 'admin' ? children : <div>No tienes acceso a esta página</div>;
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

        {/* Ruta para el registro de usuarios  */}
        <Route path="/register" element={<Register />} />
        {/* Cuando la URL coincide con "/register", se renderiza el componente Register */}

        {/* Ruta para el inicio de sesión */}
        <Route path="/login" element={<Login />} />
        {/* Cuando la URL coincide con "/login", se renderiza el componente Login */}

         {/*Define una ruta para gestionar productos, asegurando que solo usuarios con permisos (por ejemplo, administradores)
          puedan acceder a ella mediante el componente `PrivateRoute`. Si el usuario tiene el rol adecuado, 
          se renderiza el componente `ManageProducts`. De lo contrario, `PrivateRoute` muestra un mensaje de acceso denegado.*/}
        <Route path="/manage-products" element={<PrivateRoute><ManageProducts /></PrivateRoute>} />
        <Route path="/pedidos" element={<Pedidos />} /> {/* Nueva ruta para el componente Pedidos */}

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
