// Importamos las dependencias necesarias de React y la biblioteca createChart de lightweight-charts
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

// Definimos el componente SalesReport que recibe una prop: data
const SalesReport = ({ data }) => {
  // Usamos useRef para crear una referencia al contenedor del gráfico
  const chartContainerRef = useRef();

  // useEffect se utiliza para ejecutar código después de que el componente se monte
  useEffect(() => {
    // Creamos el gráfico usando createChart y configuramos sus dimensiones y estilos
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        textColor: 'black',
        backgroundColor: 'white',
      },
    });

    // Añadimos una serie de área al gráfico con colores personalizados
    const salesSeries = chart.addAreaSeries({
      lineColor: '#2962FF',
      topColor: 'rgba(41, 98, 255, 0.5)',
      bottomColor: 'rgba(41, 98, 255, 0.1)',
    });

    // Establecemos los datos de la serie de área utilizando la prop data
    salesSeries.setData(data);

    // Limpiamos el gráfico cuando el componente se desmonte
    return () => chart.remove();
  }, [data]); // La dependencia de useEffect es el array data, lo que significa que se ejecutará cada vez que data cambie

  return (
    // Renderizamos el contenedor del reporte de ventas
    <div className="sales-report">
      <h1>Reporte de Ventas</h1>
      {/* Contenedor para el gráfico, referenciado por chartContainerRef */}
      <div ref={chartContainerRef} />
    </div>
  );
};

// Exportamos el componente para su uso en otras partes de la aplicación
export default SalesReport;
