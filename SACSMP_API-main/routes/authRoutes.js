const express = require('express'); // Importar el módulo express
const { register, login, updateUser } = require('../controllers/authController'); // Importar los controladores de autenticación
const authMiddleware = require('../middleware/authMiddleware'); // Importar el middleware de autenticación

// Crear una instancia del enrutador de Express
const router = express.Router();

// Definir la ruta para el registro de usuarios
// Cuando se haga una solicitud POST a '/register', se llamará a la función 'register' del controlador de autenticación
router.post('/register', register);

// Definir la ruta para el inicio de sesión de usuarios
// Cuando se haga una solicitud POST a '/login', se llamará a la función 'login' del controlador de autenticación
router.post('/login', login);

// Ruta protegida de ejemplo
// Cuando se haga una solicitud GET a '/protected', primero se ejecutará 'authMiddleware' para verificar la autenticación
// Si el usuario está autenticado, se enviará un mensaje con el usuario autenticado
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ mensaje: 'Accediste a una ruta protegida', user: req.user });
  });

// Ruta protegida para actualizar datos del usuario
// Cuando se haga una solicitud PUT a '/update', primero se ejecutará 'authMiddleware' para verificar la autenticación
// Si el usuario está autenticado, se llamará a la función 'updateUser' del controlador de autenticación
router.put('/update', authMiddleware, updateUser);

// Exportar el enrutador para que pueda ser usado en otras partes de la aplicación
module.exports = router;
