const Pedido = require('../models/Pedido'); // Importar el modelo Pedido

// Controlador para crear un nuevo pedido
exports.nuevoPedido = async (req, res, next) => {
    // Crear una instancia de Pedido con los datos del cuerpo de la solicitud
    const pedido = new Pedido(req.body);
    try {
        // Guardar el pedido en la base de datos
        await pedido.save();
        // Enviar una respuesta con un mensaje de éxito
        res.json({ mensaje: 'Se agregó un nuevo pedido' });
    } catch (error) {
        // En caso de error, imprimirlo en la consola y pasarlo al middleware de manejo de errores
        console.log(error);
        next(error);
    }
};

// Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        // Buscar todos los pedidos y poblar los campos 'cliente' y 'pedido.producto'
        const pedidos = await Pedido.find({})
            .populate('cliente', '-password') // Poblar el campo 'cliente' y excluir el campo 'password'
            .populate('pedido.producto'); // Poblar el campo 'producto' dentro del array 'pedido'
        // Enviar la lista de pedidos como respuesta
            res.json(pedidos);
    } catch (error) {
        // En caso de error, imprimirlo en la consola y pasarlo al middleware de manejo de errores
        console.log(error);
        next();
    }
};

// Muestra un pedido por su ID
exports.mostrarPedido = async (req, res, next) => {
    try {
        // Buscar un pedido por su ID y poblar los campos 'cliente' y 'pedido.producto'
        const pedido = await Pedido.findById(req.params.idPedido)
            .populate('cliente', '-password') // Poblar el campo 'cliente' y excluir el campo 'password'
            .populate('pedido.producto'); // Poblar el campo 'producto' dentro del array 'pedido'

        // Si el pedido no existe, enviar un mensaje de error
        if(!pedido) {
            res.json({mensaje : 'Ese pedido no existe'});
            return next();
        }
        // Enviar el pedido como respuesta
        res.json(pedido);
    } catch (error) {
        // En caso de error, imprimirlo en la consola y pasarlo al middleware de manejo de errores
        console.log(error);
        next();
    }
}; 

// Actualizar el pedido via ID
exports.actualizarPedido = async (req, res, next) => {
    try {
        // Buscar un pedido por su ID y actualizarlo con los datos del cuerpo de la solicitud
        const pedido = await Pedido.findOneAndUpdate({_id: req.params.idPedido}, req.body, {new: true})
            .populate('cliente', '-password') // Poblar el campo 'cliente' y excluir el campo 'password'
            .populate('pedido.producto'); // Poblar el campo 'producto' dentro del array 'pedido'

        // Enviar el pedido actualizado como respuesta
        res.json(pedido);
    } catch (error) {
        // En caso de error, imprimirlo en la consola y pasarlo al middleware de manejo de errores
        console.log(error);
        next();
    }
};

// Elimina un pedido por su ID
exports.eliminarPedido = async (req, res, next) => {
    try {
        // Buscar un pedido por su ID y eliminarlo
        await Pedido.findByIdAndDelete(req.params.idPedido);
        // Enviar una respuesta con un mensaje de éxito
        res.json({ mensaje : 'El pedido se ha eliminado' });
    } catch (error) {
        // En caso de error, imprimirlo en la consola y pasarlo al middleware de manejo de errores
        console.log(error);
        next();
    }
};