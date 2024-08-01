import React, { useState, useEffect } from 'react'; // Importa React y hooks
import axios from 'axios'; // Importa axios para manejar peticiones HTTP
import ProductModal from './ProductModal'; // Importa un componente modal para productos


const ManageProducts = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [productToEdit, setProductToEdit] = useState(null); // Estado para almacenar el producto que se está editando
  const [searchQuery, setSearchQuery] = useState(''); // Estado para almacenar la consulta de búsqueda
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensajes de error
  const [successMessage, setSuccessMessage] = useState(''); // Estado para mensajes de éxito

  // Función para obtener los productos del servidor
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/productos');
      setProducts(response.data);
    } catch (error) {
      setErrorMessage('Error al obtener los productos');
    }
  };

  // Llama a fetchProducts cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para eliminar un producto
  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/productos/${id}`);
      fetchProducts(); // Actualiza la lista de productos
      setSuccessMessage(response.data.mensaje || 'Producto eliminado con éxito');
      setTimeout(() => setSuccessMessage(''), 1000); // Limpia el mensaje de éxito después de un tiempo
    } catch (error) {
      setErrorMessage('Error al eliminar el producto');
    }
  };

  // Función para iniciar la edición de un producto
  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setShowModal(true); // Muestra el modal de edición
  };

  // Función para agregar un nuevo producto
  const handleAddProduct = () => {
    setProductToEdit(null);
    setShowModal(true); // Muestra el modal de adición
  };

  // Función para buscar productos
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/productos/busqueda/${searchQuery}`);
      setProducts(response.data);
      if (response.data.length === 0) {
        setErrorMessage('No se encontraron productos');
      }
    } catch (error) {
      setErrorMessage('Error al buscar productos');
    }
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <button onClick={handleAddProduct}>Agregar Producto</button>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar productos..."
        />
        <button type="submit">Buscar</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <table className="tablaProductos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.nombre}</td>
              <td>{product.descripcion}</td>
              <td>${product.precio}</td>
              <td>{product.stock}</td>
              <td>
                {product.imagen && <img src={`http://localhost:5000/uploads/${product.imagen}`} alt={product.nombre} width="100" />}
              </td>
              <td>
                <button className="edit-button" onClick={() => handleEditProduct(product)}>Editar</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        fetchProducts={fetchProducts}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default ManageProducts;