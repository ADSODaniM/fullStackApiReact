const Producto = require('../models/Producto'); // Importar el modelo de Producto
const multer = require('multer'); // Importar multer para la subida de archivos
const shortid = require('shortid'); // Importar shortid para generar nombres únicos para los archivos
const path = require('path'); // // Importar path para manejar rutas de archivos

// Configuración de multer para la subida de archivos
const configuracionMulter = {
    // Configurar el almacenamiento
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // Definir el directorio de destino para los archivos subidos
            const uploadsDir = path.join(__dirname, '../uploads'); // Usar path.join para asegurar compatibilidad SO
            cb(null, uploadsDir);
        },
        filename: (req, file, cb) => {
            // Definir el nombre del archivo subido
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    // Filtrar archivos por tipo
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'));
        }
    }
};

// Crear una instancia de multer con la configuración
const upload = multer(configuracionMulter).single('imagen');

// Middleware para subir archivos
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error.message });
        }
        return next();
    });
};

// Controlador para crear un nuevo producto
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Producto(req.body);

    try {
        // Si hay un archivo, añadir el nombre del archivo al producto
        if (req.file) {
            producto.imagen = req.file.filename;
        }
        // Guardar el producto en la base de datos
        await producto.save();
        res.json({ mensaje: 'Se agregó un nuevo producto' });
    } catch (error) {
        console.log(error);
        next();
    }
};

// Controlador para mostrar todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Producto.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Controlador para mostrar un producto específico por su ID
exports.mostrarProducto = async (req, res, next) => {
    try {
        const producto = await Producto.findById(req.params.idProducto);

        if (!producto) {
            res.json({ mensaje: 'Ese Producto no existe' });
            return next();
        }

        res.json(producto);
    } catch (error) {
        console.log('Error al buscar el producto:', error);
        next();
    }
};

// Controlador para actualizar un producto
exports.actualizarProducto = async (req, res, next) => {
    try {
        let nuevoProducto = req.body;
        // Si hay un archivo, añadir el nombre del archivo al producto
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            // Si no hay archivo, mantener la imagen anterior
            let productoAnterior = await Producto.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        // Actualizar el producto en la base de datos
        let producto = await Producto.findOneAndUpdate({ _id: req.params.idProducto }, nuevoProducto, {
            new: true
        });

        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Controlador para eliminar un producto
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Producto.findByIdAndDelete({ _id: req.params.idProducto });
        res.json({ mensaje: 'El Producto se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
};

// Controlador para buscar productos por una consulta
exports.buscarProducto = async (req, res, next) => {
    try {
        const { query } = req.params;
        const producto = await Producto.find({ nombre: new RegExp(query, 'i') });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
};