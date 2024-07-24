const express = require('express'); // Importar el módulo express
const conectarDB = require('./config/db'); // Importar la función para conectar a la base de datos
const authRoutes = require('./routes/authRoutes'); // Importar las rutas de autenticación
const productosRoutes = require('./routes/productosRoutes'); // Importar rutas de productos
const pedidosRoutes = require('./routes/pedidosRoutes'); // Importar rutas de pedidos 

// Conectar a la base de datos
conectarDB();

// Crear una instancia de Express
const app = express();

// Middleware para analizar el cuerpo de las solicitudes
// Esto permite que el servidor entienda los datos JSON enviados en las solicitudes
app.use(express.json());

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