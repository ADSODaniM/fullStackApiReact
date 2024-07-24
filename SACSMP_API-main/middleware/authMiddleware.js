// Importar el módulo jsonwebtoken
const jwt = require('jsonwebtoken');

// Definir el middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Obtener el token de la cabecera de autorización
  const token = req.header('Authorization').replace('Bearer ', '');
  // Si no se proporciona un token, devolver un error 401 (no autorizado)
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
  }
  try {
    // Verificar el token usando la clave secreta
    const verified = jwt.verify(token, 'your_jwt_secret');
    // Añadir el usuario verificado al objeto de solicitud
    req.user = verified;
    // Pasar al siguiente middleware o controlador
    next();
  } catch (error) {
    // Si el token no es válido, devolver un error 400 (solicitud incorrecta)
    res.status(400).json({ error: 'Token no válido' });
  }
};

// Exportar el middleware para que pueda ser usado en otras partes de la aplicación
module.exports = authMiddleware;
