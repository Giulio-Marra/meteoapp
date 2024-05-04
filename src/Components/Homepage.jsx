import React from "react";
import imageBackground from "../img/cloudy_1163657.png";

const Homepage = () => {
  return (
    <div className="text-center homePage mt-5 p-3">
      <h1>Benvenuti nella nostra App Meteo!</h1>
      <p>Scopri le previsioni meteo accurate e aggiornate per la tua città.</p>
      <div className="weather-intro">
        <img
          src={imageBackground}
          alt="Clima soleggiato"
          className="img-fluid"
        />
        <p>
          Consulta il meteo in tempo reale o scopri le previsioni a lungo
          termine con facilità.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
