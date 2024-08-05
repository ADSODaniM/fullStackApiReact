// Importar módulos necesarios
const bcrypt = require('bcryptjs'); // Para el hash de contraseñas
const Joi = require('joi'); // Para la validación de datos
const User = require('../models/User'); // Modelo de usuario
const jwt = require('jsonwebtoken'); // Para la creación y verificación de tokens JWT

// Definir el esquema de validación para el registro de usuarios
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Controlador para el registro de usuarios
exports.register = async (req, res) => {
  // Validar los datos de la solicitud con el esquema definido
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'El usuario ya existe' });

    // Crear un nuevo usuario con la contraseña hasheada
    user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10)
    });

    // Guardar el usuario en la base de datos
    await user.save();
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Definir el esquema de validación para el inicio de sesión
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Controlador para el inicio de sesión
exports.login = async (req, res) => {
  // Validar los datos de la solicitud con el esquema definido
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;

  try {
    // Buscar el usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Credenciales inválidas' });

    // Crear un token JWT
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token, username: user.username, role: user.role, userId: user._id, email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Definir el esquema de validación para la actualización de datos del usuario
const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6)
});

// Controlador para la actualización de datos del usuario
exports.updateUser = async (req, res) => {
  // Validar los datos de la solicitud con el esquema definido
  const { error } = updateUserSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const updates = req.body;

  try {
    
    // Validar si el nuevo email ya está en uso
    if (updates.email) {
        const existingUser = await User.findOne({ email: updates.email });
        if (existingUser && existingUser._id.toString() !== req.user.userId) {
          return res.status(400).json({ error: 'El email ya está en uso, usar otro' }); // Línea agregada
        }
      }
    // Si la contraseña se está actualizando, hashearla
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Encontrar y actualizar el usuario por ID
    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.status(200).json({ mensaje: 'Datos del usuario actualizados exitosamente', user });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
