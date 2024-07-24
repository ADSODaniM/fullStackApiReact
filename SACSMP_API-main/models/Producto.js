const mongoose = require('mongoose'); // Importar el módulo mongoose para trabajar con MongoDB

// Definir el esquema de Producto
const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true // El campo 'nombre' es obligatorio
    },
    descripcion: {
        type: String,
        required: true // El campo 'descripcion' es obligatorio
    },
    precio: {
        type: Number,
        required: true // El campo 'precio' es obligatorio
    },
    stock: {
        type: Number,
        required: true // El campo 'stock' es obligatorio
    },
    imagen: {
        type: String // El campo 'imagen' no es obligatorio
    }
}, {
    timestamps: true // Esta línea habilita createdAt y updatedAt
});

// Exportar el modelo 'Producto' basado en el esquema 'ProductoSchema'mongod
module.exports = mongoose.model('Producto', ProductoSchema);