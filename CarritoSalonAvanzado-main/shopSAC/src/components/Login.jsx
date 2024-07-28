// Importaciones necesarias desde React, axios y react-router-dom
import React, { useState } from 'react'; // Importa React y useState para manejar el estado del componente
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación programática

// Definición del componente Login
const Login = () => {
    // Definición de los estados locales con useState
  const [formData, setFormData] = useState({ email: '', password: '' }); // Estado para manejar los datos del formulario
  const [message, setMessage] = useState(''); // Estado para manejar mensajes de feedback
  const navigate = useNavigate(); // Hook para la navegación

  // Manejador de cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Extrae el nombre y el valor del input que disparó el evento
    setFormData({ ...formData, [name]: value }); // Actualiza el estado del formulario
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    try {
        // Realiza una solicitud POST a la API para el login
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      // Si la solicitud es exitosa, actualiza el mensaje y almacena datos en el localStorage
      setMessage('Login exitoso');
      localStorage.setItem('token', response.data.token);
  
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('role', response.data.role); // Guardar el rol del usuario
      localStorage.setItem('userId', response.data.userId); // Guardar el ID del usuario
      localStorage.setItem('email', response.data.email); // Almacena el email
      window.dispatchEvent(new Event('storage')); // Disparar evento de almacenamiento
      navigate('/'); // Navega a la página de inicio
    } catch (error) {
        // Si hay un error, actualiza el mensaje de error
      setMessage(error.response?.data?.error || 'Error en el login');
    }
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {message && <p>{message}</p>}
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login; // Exporta el componente para ser usado en otras partes de la aplicación