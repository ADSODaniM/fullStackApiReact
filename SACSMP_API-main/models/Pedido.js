// Importar mongoose y Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de pedidos
const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId, // Referencia al ID del cliente (usuario)
        ref: 'User',  // Referencia al modelo 'User'
        required: true // Campo obligatorio
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId, // Referencia al ID del producto
            ref: 'Producto', // Referencia al modelo 'Producto'
            required: true // Campo obligatorio
        },
        cantidad: {
            type: Number, // Cantidad del producto pedido
            required: true // Campo obligatorio
        }
    }],
    total: {
        type: Number, // Total del pedido
        required: true // Campo obligatorio
    },
    estado: {
        type: String, // Estado del pedido
        enum: ['PENDIENTE', 'PAGADO', 'ENVIADO'], // Valores permitidos
        default: 'PENDIENTE' // Valor por defecto
    },
// Datos para el envio del producto
    paymentCode: {
        type: Number, // Código de pago
        required: true // Campo obligatorio
    },    
    nombreEnvio: {
        type: String, // Nombre del destinatario del envío
        required: true // Campo obligatorio
    },
    telefonoEnvio: {
        type: String, // Teléfono del destinatario del envío
        required: true // Campo obligatorio
    },
    direccionEnvio: {
        type: String, // Dirección del destinatario del envío
        required: true // Campo obligatorio
    },
    barrioEnvio: {
        type: String, // Barrio del destinatario del envío
        required: true // Campo obligatorio
    },
    municipioEnvio: {
        type: String, // Municipio del destinatario del envío
        required: true // Campo obligatorio
    },
    departamentoEnvio: {
        type: String, // Departamento del destinatario del envío
        required: true // Campo obligatorio
    }
}, {
    timestamps: true  // Para tener campos createdAt y updatedAt
});

// Exportar el modelo de Pedido basado en el esquema
module.exports = mongoose.model('Pedido', pedidosSchema);