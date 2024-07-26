const express = require('express'); // Importar el módulo express
const conectarDB = require('./config/db'); // Importar la función para conectar a la base de datos
const authRoutes = require('./routes/authRoutes'); // Importar las rutas de autenticación
const productosRoutes = require('./routes/productosRoutes'); // Importar rutas de productos
const pedidosRoutes = require('./routes/pedidosRoutes'); // Importar rutas de pedidos
const cors = require('cors'); // Importar cors
const path = require('path'); // Importar path


// Conectar a la base de datos
conectarDB();

// Crear una instancia de Express
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Reemplaza con el dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  credentials: true // Habilita el manejo de cookies y otros credenciales
};
app.use(cors(corsOptions));

// Middleware para analizar el cuerpo de las solicitudes
// Esto permite que el servidor entienda los datos JSON enviados en las solicitudes
app.use(express.json());

// Middleware para servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar rutas de autenticación
// Todas las rutas que comienzan con '/api/auth' utilizarán las definiciones en authRoutes
app.use('/api/auth', authRoutes);

// Rutas de productos
app.use('/api', productosRoutes); // Usar rutas de productos

// Rutas de pedidos
app.use('/api', pedidosRoutes); // Usar rutas de pedidos

// Configurar el puerto en el que escuchará el servidor
const PORT = 5000;

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});