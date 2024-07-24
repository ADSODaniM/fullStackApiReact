const mongoose = require('mongoose');

// Función asincrónica para conectar a la base de datos MongoDB
const conectarDB = async () => {
  try {
    // Intentar conectar a la base de datos con los parámetros de configuración
    await mongoose.connect('mongodb://127.0.0.1:27017/authdb', {
      serverSelectionTimeoutMS: 5000,  // Tiempo de espera para la selección del servidor
      socketTimeoutMS: 45000  // Tiempo máximo de inactividad del socket
    });
    console.log('MongoDB conectado'); // Imprimir mensaje de éxito si la conexión es exitosa
  } catch (error) {
    // Si ocurre un error, imprimir el mensaje de error y terminar el proceso
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

// Exportar la función para poder usarla en otros archivos
module.exports = conectarDB;