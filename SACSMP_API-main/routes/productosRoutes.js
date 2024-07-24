const express = require('express'); // Importar el módulo express
const router = express.Router(); // Crear un enrutador usando express
const productosController = require('../controllers/productosController'); // Importar el controlador de productos

// Nuevos productos
router.post('/productos', 
    productosController.subirArchivo, // Middleware para subir archivos
    productosController.nuevoProducto // Controlador para crear un nuevo producto
);

// Muestra todos los productos
router.get('/productos', 
    productosController.mostrarProductos); // Controlador para mostrar todos los productos

// Muestra un producto específico por su ID
router.get('/productos/:idProducto', 
    productosController.mostrarProducto); // Controlador para mostrar un producto por su ID

// Actualizar Productos
router.put('/productos/:idProducto', 
    productosController.subirArchivo, // Middleware para subir archivos
    productosController.actualizarProducto // Controlador para actualizar un producto
);

// Eliminar Productos
router.delete('/productos/:idProducto', 
    productosController.eliminarProducto // Controlador para eliminar un producto
);

// Búsqueda de Productos
router.post('/productos/busqueda/:query',
    productosController.buscarProducto); // Controlador para buscar productos por una consulta

// Exportar el enrutador para usarlo en otros archivos
module.exports = router;