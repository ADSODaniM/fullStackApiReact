// Importa las bibliotecas necesarias para el proyecto
import React from 'react'; // Importa React, una biblioteca para construir interfaces de usuario
import ReactDOM from 'react-dom/client'; // Importa ReactDOM para manipular el DOM
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter para manejar el enrutamiento en la aplicación
import App from './App'; // Importa el componente principal de la aplicación
import './index.css'; // Importa los estilos globales de la aplicación

// Renderiza la aplicación dentro del elemento con id 'root' en el HTML
ReactDOM.createRoot(document.getElementById('root')).render(
   // Envolviendo la aplicación en BrowserRouter para habilitar el enrutamiento
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
