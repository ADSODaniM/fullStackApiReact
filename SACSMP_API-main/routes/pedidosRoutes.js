const express = require('express'); // Importar el módulo express para crear rutas
const router = express.Router(); // Crear una instancia del router de Express
const pedidosController = require('../controllers/pedidosController'); // Importar el controlador de pedidos


// Nuevos pedidos
router.post('/pedidos/nuevo', pedidosController.nuevoPedido);

// Muestra todos los pedidos
router.get('/pedidos', pedidosController.mostrarPedidos);

// Muestra un pedido por su ID
router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);


// Actualizar pedidos
router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

// Elimina un pedido
router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

// Exportar el router para que pueda ser usado en otros archivos
module.exports = router;