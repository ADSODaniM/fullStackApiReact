import React, { useState } from 'react'; // Importa React y useState para manejar el estado del componente
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación programática

// Definición del componente Register
const Register = () => {
    // Definición de los estados locales con useState
  const [formData, setFormData] = useState({
    username: '', // Estado para el nombre de usuario
    password: '', // Estado para la contraseña
    email: '' // Estado para el email
  });
  const [message, setMessage] = useState(''); // Estado para manejar mensajes de feedback
  const navigate = useNavigate(); // Hook para la navegación

  // Manejador de cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Extrae el nombre y el valor del input que disparó el evento
    setFormData({
      ...formData, // Mantiene los otros valores del formulario
      [name]: value // Actualiza el campo correspondiente con el nuevo valor
    });
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    try {
        // Realiza una solicitud POST a la API para el registro
      await axios.post('http://localhost:5000/api/auth/register', formData);
      // Si la solicitud es exitosa, actualiza el mensaje y almacena el nombre de usuario en el localStorage
      setMessage('Registro exitoso');
      localStorage.setItem('username', formData.username);
      localStorage.setItem('role', 'usuario'); // Guardar el rol en localStorage
      window.dispatchEvent(new Event('storage')); // Disparar evento de almacenamiento
      navigate('/'); // Navega a la página de inicio
    } catch (error) {
        // Si hay un error, actualiza el mensaje de error
      setMessage(error.response?.data?.error || 'Error en el registro');
    }
  };

  // Renderizado del formulario de registro
  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {message && <p>{message}</p>}
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register; // Exporta el componente para ser usado en otras partes de la aplicación