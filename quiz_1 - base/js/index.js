/*
  QUIZ 1 - PROGRAMACIÓN WEB
  Respetado estudiante teniendo en cuenta el proyecto proporcionado deberá desarrollar las siguientes funcionalidades en el sitio web:

  1) Solicitar datos del clima a la API de https://api.open-meteo.com/ usando las coordenadas seleccionadas por el usuario en el mapa. 
  2) Cuando llega la respuesta del servidor, si es correcta mostrar los datos en la tabla correspondiente. 
  3) Desarrollar un historial de busquedas anteriores que vaya cargando en la medida que el usuario selecciona diferentes ubicaciones en el mapa.
*/

let mapa;

window.addEventListener("load",function(){

    map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM(),
          }),
        ],
        view: new ol.View({
          center: ol.proj.transform([-72.265911,3.7644111], 'EPSG:4326', 'EPSG:3857'),
          zoom: 5,
        }),
      });
    
    map.on('click', function(evt){
        let coordinates = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        let latitud = coordinates[1];
        let longitud = coordinates[0];

        obtenerDatos (latitud, longitud)

        console.log("Latitud:",latitud);
        console.log("Longitud:",longitud);
    });
})

async function obtenerDatos(latitud, longitud) {
  try {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m`;     
    let respuesta = await fetch(url);

    if (respuesta.ok){
      let datos = await respuesta.json();
            
      document.getElementById("latitud").innerText = datos.latitude; 
      document.getElementById("longitud").innerText = datos.longitude;
      document.getElementById("temperatura").innerText = `${datos.current.temperature_2m} ${datos.current_units.temperature_2m}`;
      document.getElementById("humedad").innerText = `${datos.current.relative_humidity_2m} ${datos.current_units.relative_humidity_2m}`; 

      let tablaTotal = document.querySelector("#tabla_historial");
      let tablaContenido = document.createElement("tbody");
      let filaContenedora = document.createElement("tr");

      tablaTotal.appendChild (tablaContenido)
      tablaContenido.appendChild (filaContenedora)

      let celLatitud = document.createElement("td");
      celLatitud.innerText = datos.latitude;
      filaContenedora.appendChild (celLatitud); 

      let celLongitud = document.createElement("td");
      celLongitud.innerText = datos.longitude;
      filaContenedora.appendChild (celLongitud); 

      let celTemperatura = document.createElement("td");
      celTemperatura.innerText = `${datos.current.relative_humidity_2m} ${datos.current_units.relative_humidity_2m}`; 
      filaContenedora.appendChild (celTemperatura); 

      let celTemperaturaC = document.createElement("td");
      celTemperaturaC.innerText = `${datos.current.temperature_2m} ${datos.current_units.temperature_2m}`;
      filaContenedora.appendChild (celTemperaturaC); 

      }
  } catch (error){
    console.error ("Error al obtener los datos: ", error);
  }
}
