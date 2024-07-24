// Importar el módulo mongoose para trabajar con MongoDB
const mongoose = require('mongoose');

// Definir el esquema de usuario usando mongoose.Schema
const UserSchema = new mongoose.Schema({
  // Campo username
  username: {
    type: String, // Tipo de dato: cadena de texto
    required: true, // Este campo es obligatorio
    minlength: 3, // Longitud mínima: 3 caracteres
    maxlength: 50 // Longitud máxima: 50 caracteres
  },
  // Campo email
  email: {
    type: String, // Tipo de dato: cadena de texto
    required: true, // Este campo es obligatorio
    unique: true, // El valor debe ser único en la base de datos
    match: /^\S+@\S+\.\S+$/ // Debe cumplir con el formato de correo electrónico
  },
  // Campo password
  password: {
    type: String, // Tipo de dato: cadena de texto
    required: true, // Este campo es obligatorio
    minlength: 6 // Longitud mínima: 6 caracteres
  },
  // Campo role
  role: {
    type: String, // Tipo de dato: cadena de texto
    enum: ['usuario', 'admin', 'profesional'], // Solo puede tener uno de estos valores
    default: 'usuario' // Valor por defecto: 'usuario'
  }
});

// Crear el modelo de usuario a partir del esquema definido
const User = mongoose.model('User', UserSchema);

// Exportar el modelo para que pueda ser usado en otras partes de la aplicación
module.exports = User;
