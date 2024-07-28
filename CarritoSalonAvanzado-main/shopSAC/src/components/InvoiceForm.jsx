// src/components/InvoiceForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Componente funcional InvoiceForm que recibe la prop cartItems
const InvoiceForm = ({ cartItems }) => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({ name: '', email: '', address: '', barrio: '', municipio: '', departamento: '' });
  const navigate = useNavigate(); // Hook para la navegación programática

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const paymentCode = Math.floor(Math.random() * 1000000); // Genera un código de pago aleatorio
    
    // Construye el objeto 'pedido' con la información del carrito y los datos del formulario
    const pedido = {
      cliente: localStorage.getItem('userId'), // Obtiene el ID del usuario del localStorage 
      pedido: cartItems.map(item => ({
        producto: item.product.id, // ID del producto
        cantidad: item.quantity // Cantidad de cada producto
      })),
      // Calcula el total sumando el precio de cada producto multiplicado por su cantidad
      total: cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0), 
      paymentCode, // Incluye el código de pago aleatorio
      nombreEnvio: formData.name, // Nombre para el envío
      telefonoEnvio: formData.email, // Suponiendo que el email se usa como teléfono
      direccionEnvio: formData.address, // Dirección de envío
      barrioEnvio: formData.barrio, // Barrio de envío
      municipioEnvio: formData.municipio, // Municipio de envío
      departamentoEnvio: formData.departamento // Departamento de envío
    };

    console.log(pedido); // Añadir esta línea para verificar el objeto pedido

    try {
      // Envía el objeto pedido al servidor mediante una solicitud POST
      await axios.post('http://localhost:5000/api/pedidos/nuevo', pedido);
      // Navega a la página de la factura PDF, pasando los datos del formulario, los ítems del carrito y el código de pago
      navigate('/invoice-pdf', { state: { ...formData, cartItems, paymentCode } });
    } catch (error) {
      // Imprime un mensaje de error en la consola si hay un problema al enviar el pedido
      console.error('Error al enviar el pedido', error);
    }
  };

  return (
    <div className="payment-form">
      <h1>Invoice Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo de entrada para el nombre completo */}
        <div>
          <label>Nombres y apellidos completos</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        {/* Campo de entrada para el email */}
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        {/* Campo de entrada para la dirección */}
        <div>
          <label>Dirección de residencia</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        {/* Campo de entrada para el barrio */}
        <div>
          <label>Barrio</label>
          <input type="text" name="barrio" value={formData.barrio} onChange={handleChange} required />
        </div>
        {/* Campo de entrada para el municipio */}
        <div>
          <label>Municipio</label>
          <input type="text" name="municipio" value={formData.municipio} onChange={handleChange} required />
        </div>
        {/* Campo de entrada para el departamento */}
        <div>
          <label>Departamento</label>
          <input type="text" name="departamento" value={formData.departamento} onChange={handleChange} required />
        </div>
        {/* Botón para enviar el formulario */}
        <button type="submit">Generar factura</button>
      </form>
    </div>
  );
};

// Exporta el componente InvoiceForm como la exportación predeterminada del módulo
export default InvoiceForm;
