import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const MeteoPage = () => {
  const { dynamicId } = useParams();
  const [lat, lon] = dynamicId.split(",");
  const [weather, setWeather] = useState(null);
  const [dayweather, setDayweather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=76cfda9e30f39e2af936fca60ce65c9f`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setWeather(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchDaysWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=76cfda9e30f39e2af936fca60ce65c9f`
        );
        if (!response.ok) {
          throw new Error("failed to fetch days");
        }
        const data = await response.json();
        setDayweather(data);
        console.log(data);
      } catch (error) {
        console.error("errore fetching data days", error);
      }
    };
    fetchWeather();
    fetchDaysWeather();
  }, [dynamicId]);

  const getBackgroundColor = (weather) => {
    if (weather) {
      switch (weather.weather[0].main) {
        case "Clear":
          return "src=https://images.unsplash.com/photo-1620385019253-b051a26048ce?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        case "Clouds":
          return "src=https://images.unsplash.com/photo-1620385019253-b051a26048ce?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        case "Rain":
          return "#4682b4";
        default:
          return "#ffffff";
      }
    } else {
      return "#ffffff";
    }
  };

  return (
    <Container
      className="text-center pt-5 m-0 p-2"
      style={{ backgroundImage: getBackgroundColor(weather), maxWidth: "100%" }}
    >
      {weather ? (
        <>
          <h1 className="cityText">
            {weather.name} {weather.sys.country}
          </h1>
          <h2 className="temp">{Math.round(weather.main.temp)}°</h2>
          <h3 className="typeTemp">{weather.weather[0].main}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
          />

          <Row className="justify-content-center">
            <Col xs="auto">
              <h2 className="gradeMinMax">
                H {Math.round(weather.main.temp_min)}°C
              </h2>
            </Col>
            <Col xs="auto">
              <h2 className="gradeMinMax">
                L {Math.round(weather.main.temp_max)}°C
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xs="auto">
              <p>Wind: {weather.wind.speed} m/s</p>
            </Col>
            <Col xs="auto">
              <p>Humidity: {weather.main.humidity}%</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col>
              <p>Visibility: {weather.visibility} meters</p>
            </Col>
          </Row>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </Container>
  );
};

export default MeteoPage;
