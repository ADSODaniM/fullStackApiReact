import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalOrders = ({ order, setSelectedOrder, setOrders, setFilteredOrders, orders, filteredOrders }) => {
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [localOrder, setLocalOrder] = useState(order);

  // Al cambiar el pedido seleccionado, restablecer el localOrder
  useEffect(() => {
    setLocalOrder(order);
  }, [order]);

  const handleUpdateOrder = async () => {
    // Si el pedido está en estado "ENVIADO", no permitir actualizar
    if (localOrder.estado === 'ENVIADO') {
      setErrorMessage('No se puede actualizar el pedido. El pedido ya ha sido enviado.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/api/pedidos/${localOrder._id}`, localOrder);
      setOrders(orders.map(o => (o._id === localOrder._id ? response.data : o)));
      setFilteredOrders(filteredOrders.map(o => (o._id === localOrder._id ? response.data : o)));
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error al actualizar el pedido', error);
    }
  };

  const confirmDeleteOrder = () => {
    setOrderToDelete(order._id);
  };

  const handleDeleteOrder = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/pedidos/${orderToDelete}`);
      setOrders(orders.filter(o => o._id !== orderToDelete));
      setFilteredOrders(filteredOrders.filter(o => o._id !== orderToDelete));
      setOrderToDelete(null);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error al eliminar el pedido', error);
    }
  };

  const handleCloseErrorMessage = () => {
    setErrorMessage('');
  };

  return (
    <div className="modal">
      <div className="modal-contenido">
        <button className="cerrar-boton" onClick={() => setSelectedOrder(null)}>×</button>
        <h3>Actualizar Pedido</h3>
        {errorMessage && (
          <div className="error-mensaje">
            <p>{errorMessage}</p>
            <button onClick={handleCloseErrorMessage}>Cerrar</button>
          </div>
        )}
        <div className="form-fila">
          <label>
            Estado:
            <select
              value={localOrder.estado}
              onChange={(e) => setLocalOrder({ ...localOrder, estado: e.target.value })}
              className="estado-select"
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="PAGADO">Pagado</option>
              <option value="ENVIADO">Enviado</option>
            </select>
          </label>
        </div>
        <div className="form-fila">
          <div className="form-columna">
            <label>
              Nombre de Envío:
              <input
                type="text"
                value={localOrder.nombreEnvio}
                onChange={(e) => setLocalOrder({ ...localOrder, nombreEnvio: e.target.value })}
                disabled={localOrder.estado === 'ENVIADO'}
              />
            </label>
          </div>
          <div className="form-columna">
            <label>
              Teléfono de Envío:
              <input
                type="text"
                value={localOrder.telefonoEnvio}
                onChange={(e) => setLocalOrder({ ...localOrder, telefonoEnvio: e.target.value })}
                disabled={localOrder.estado === 'ENVIADO'}
              />
            </label>
          </div>
          <div className="form-columna">
            <label>
              Dirección de Envío:
              <input
                type="text"
                value={localOrder.direccionEnvio}
                onChange={(e) => setLocalOrder({ ...localOrder, direccionEnvio: e.target.value })}
                disabled={localOrder.estado === 'ENVIADO'}
              />
            </label>
          </div>
        </div>
        <div className="form-fila">
          <div className="form-columna">
            <label>
              Barrio:
              <input
                type="text"
                value={localOrder.barrioEnvio}
                onChange={(e) => setLocalOrder({ ...localOrder, barrioEnvio: e.target.value })}
                disabled={localOrder.estado === 'ENVIADO'}
              />
            </label>
          </div>
          <div className="form-columna">
            <label>
              Municipio:
              <input
                type="text"
                value={localOrder.municipioEnvio}
                onChange={(e) => setLocalOrder({ ...localOrder, municipioEnvio: e.target.value })}
                disabled={localOrder.estado === 'ENVIADO'}
              />
            </label>
          </div>
          <div className="form-columna">
            <label>
              Departamento:
              <input
                type="text"
                value={localOrder.departamentoEnvio}
                onChange={(e) => setLocalOrder({ ...localOrder, departamentoEnvio: e.target.value })}
                disabled={localOrder.estado === 'ENVIADO'}
              />
            </label>
          </div>
        </div>
        <div className="boton-fila">
          <button onClick={handleUpdateOrder}>Actualizar</button>
          <button onClick={confirmDeleteOrder}>Eliminar</button>
        </div>
        {orderToDelete && (
          <div className="modal-confirmacion">
            <div className="modal-contenido-confirmacion">
              <div className="confirmacion-logo">⚠️</div>
              <div className="confirmacion-mensaje">¿Está seguro de que desea eliminar este pedido?</div>
              <div className="boton-confirmacion-fila">
                <button className="confirmar" onClick={handleDeleteOrder}>Eliminar</button>
                <button className="cancelar" onClick={() => setOrderToDelete(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalOrders;


