// src/components/InvoiceForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const paymentCode = Math.floor(Math.random() * 1000000); // Genera un código de pago aleatorio
    console.log(cartItems); // Verificar que cartItems contiene datos
    navigate('/invoice-pdf', { state: { ...formData, cartItems, paymentCode } }); // Navega a la página de la factura PDF con los datos del formulario
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
