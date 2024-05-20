import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Container } from "react-bootstrap";

const WeatherMap = () => {
  const [layer, setLayer] = useState("clouds_new");
  const [zoom] = useState(5);
  const [position] = useState([51.505, -0.09]);

  const handleLayerChange = (event) => {
    setLayer(event.target.value);
  };

  return (
    <Container className="text-center homePage mt-5 p-5">
      <h1>Benvenuti nella nostra App Meteo!</h1>
      <p>Usa la barra di ricerca,</p>
      <p>
        per scoprire le previsioni meteo accurate e aggiornate per la tua città.
      </p>

      <div>
        <label htmlFor="layer-select">Scegli il livello:</label>
        <select id="layer-select" value={layer} onChange={handleLayerChange}>
          <option value="clouds_new">Nuvole</option>
          <option value="precipitation_new">Precipitazioni</option>
          <option value="pressure_new">Pressione</option>
          <option value="wind_new">Vento</option>
          <option value="temp_new">Temperatura</option>
        </select>
      </div>
      <div className="text-center">
        <MapContainer
          center={position}
          zoom={zoom}
          className="mapContainer text-center"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <TileLayer
            url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=76cfda9e30f39e2af936fca60ce65c9f`}
            opacity={1}
          />
        </MapContainer>
      </div>
    </Container>
  );
};

export default WeatherMap;
