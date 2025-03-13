/*
  Parcial 1 - PROGRAMACIÓN WEB
  Respetado estudiante teniendo en cuenta el proyecto proporcionado deberá desarrollar las siguientes funcionalidades en el sitio web:

  1) Solicitar datos del clima a la API de https://open-meteo.com/en/docs usando las coordenadas seleccionadas por el usuario en el mapa. 
  2) Solicitar los datos de Geolocalización en la API de https://geocodify.com/
  3) Solicitar la imágen de la bandera del pais donde está ubicado el punto seleccionado al servicio:https://documenter.getpostman.com/view/1134062/T1LJjU52#89ad7ab2-e3e1-4d8a-b99d-44e1c149e788  
  2) Cuando llega la respuesta del servidor, si es correcta mostrar los datos en la tabla correspondiente. 
  3) Desarrollar un historial de busquedas anteriores que vaya cargando en la medida que el usuario 
  selecciona diferentes ubicaciones en el mapa, dicho historial debe ser una TABLA.
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
        let coordinates = ol.proj.toLonLat(evt.coordinate);
        let latitud = coordinates[1];
        let longitud = coordinates[0];
        console.log("Latitud:",latitud);
        console.log("Longitud:",longitud);

        obtenerDatos (latitud, longitud);
    });

})

function obtenerDatos(latitud, longitud){
  obtenerDatosOpenMeteo(latitud, longitud);
  obtenerDatosGeoCodify(latitud, longitud);
}

async function obtenerDatosOpenMeteo(latitud, longitud) {
  try {
    let urlOpenMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m`;     
    let respuesta = await fetch(urlOpenMeteo);

    if (respuesta.ok){
      let datos = await respuesta.json();
      
      datosObjeto.latitud = datos.latitude
      datosObjeto.longitud = datos.longitude
      datosObjeto.temperatura = `${datos.current.temperature_2m} ${datos.current_units.temperature_2m}`
      datosObjeto.humedad = `${datos.current.relative_humidity_2m} ${datos.current_units.relative_humidity_2m}`; 

      }
  } catch (error){
    console.error ("Error al obtener los datos: ", error);
  }
}

async function obtenerDatosGeoCodify(latitud, longitud) {
  try {
    let urlGeoCodify = `https://api.geocodify.com/v2/reverse?api_key=FZZKiPVQpostGBSKGWOOmL1Oyc1osBkH&lat=${latitud}&lng=${longitud}`;     
    let respuesta = await fetch(urlGeoCodify);

    if (respuesta.ok){
      let datos = await respuesta.json();
      
      console.log (datos)
      datosObjeto.pais = datos.response.features[0].properties.country;
      datosObjeto.region = datos.response.features[0].properties.region; 
      datosObjeto.ciudad = datos.response.features[0].properties.county; 

      colocarDatos();
      }
  } catch (error){
    console.error ("Error al obtener los datos: ", error);
  }
}

async function obtenerBandera(latitud, longitud) {
  try {
    let urlGeoCodify = `https://api.geocodify.com/v2/reverse?api_key=FZZKiPVQpostGBSKGWOOmL1Oyc1osBkH&lat=${latitud}&lng=${longitud}`;     
    let respuesta = await fetch(urlGeoCodify);

    if (respuesta.ok){
      let datos = await respuesta.json();
      
      datosObjeto.pais = datos.response.features[0].properties.country;
      datosObjeto.region = datos.response.features[0].properties.region; 
      datosObjeto.ciudad = datos.response.features[0].properties.county; 

      colocarDatos();
      }
  } catch (error){
    console.error ("Error al obtener los datos: ", error);
  }
}

let datosObjeto = {
  pais:null,
  region:null,
  ciudad:null,
  latitud:null,
  longitud:null,
  temperatura:null,
  humedad:null
}

function colocarDatos() {
  document.getElementById("pais").innerText = datosObjeto.pais;
  document.getElementById("region").innerText = datosObjeto.region;
  document.getElementById("ciudad").innerText = datosObjeto.ciudad;
  document.getElementById("latitud").innerText = datosObjeto.latitud;
  document.getElementById("longitud").innerText = datosObjeto.longitud;
  document.getElementById("temperatura").innerText = datosObjeto.temperatura;
  document.getElementById("humedad").innerText = datosObjeto.humedad;

  let tablaTotal = document.querySelector("#tabla_historial");
  let tablaContenido = document.createElement("tbody");
  let filaContenedora = document.createElement("tr");

  tablaTotal.appendChild (tablaContenido)
  tablaContenido.appendChild (filaContenedora)

  let celPais = document.createElement("td");
  celPais.innerText = datosObjeto.pais;
  filaContenedora.appendChild (celPais); 

  let celRegion = document.createElement("td");
  celRegion.innerText = datosObjeto.region;
  filaContenedora.appendChild (celRegion); 

  let celCiudad = document.createElement("td");
  celCiudad.innerText = datosObjeto.ciudad; 
  filaContenedora.appendChild (celCiudad); 

  let celLatitud = document.createElement("td");
  celLatitud.innerText = datosObjeto.latitud;
  filaContenedora.appendChild (celLatitud); 

  let celLongitud = document.createElement("td");
  celLongitud.innerText = datosObjeto.longitud;
  filaContenedora.appendChild (celLongitud); 

  let celTemperatura = document.createElement("td");
  celTemperatura.innerText = datosObjeto.temperatura; 
  filaContenedora.appendChild (celTemperatura); 

  let celHumedad = document.createElement("td");
  celHumedad.innerText = datosObjeto.humedad;
  filaContenedora.appendChild (celHumedad); 

  fetch ("https://countriesnow.space/api/v0.1/countries/flag/images", {
    method: 'POST',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    },
    body:JSON.stringify({country: datosObjeto.pais})
  }).then((response)=>{
    if (response.ok){
      let datos = response.json();
      console.log(datos)
      document.getElementById("bandera").src = datos.data.flag //Error
  }
  })
}