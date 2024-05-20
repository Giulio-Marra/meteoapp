import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
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
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=76cfda9e30f39e2af936fca60ce65c9f`
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
  }, [dynamicId, lat, lon]);

  const getBackgroundColor = (weather) => {
    if (weather) {
      switch (weather.weather[0].main) {
        case "Clear":
          return "https://images.unsplash.com/photo-1523913950023-c47b5ae5b164?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        case "Clouds":
          return "https://images.unsplash.com/photo-1548266652-99cf27701ced?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        case "Rain":
          return "https://images.unsplash.com/photo-1620385019253-b051a26048ce?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        case "Drizzle":
          return "https://images.unsplash.com/photo-1576234699886-7eb7f11aecb7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        default:
          return "https://images.unsplash.com/photo-1620385019253-b051a26048ce?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      }
    }
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const getDayOfTheWeek = (dateStr) => {
    const date = new Date(dateStr);
    const days = [
      "Domenica",
      "Lunedi",
      "Martedi",
      "Mercoledi",
      "Giovedi",
      "Venerdi",
      "Sabato",
    ];
    return days[date.getDay()];
  };
  return (
    <>
      <Container
        className="text-center pt-5 m-0 p-3 border-bottom containerCard"
        style={{
          backgroundImage: `url(${getBackgroundColor(weather)})`,
          maxWidth: "100%",
          backdropFilter: "blur(10px)",
        }}
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
                <p>Vento: {weather.wind.speed} m/s</p>
              </Col>
              <Col xs="auto">
                <p>Umidità: {weather.main.humidity}%</p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col>
                <p>Visibilità: {weather.visibility} metri</p>
              </Col>
            </Row>
          </>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Container>
      <Container>
        {dayweather ? (
          <Slider {...settings} className="m-3 text-center">
            {dayweather.list.map((item, idx) => (
              <div
                key={idx}
                className=" d-flex flex-column align-items-center "
              >
                <p>{getDayOfTheWeek(item.dt_txt)}</p>
                <p>
                  H {new Date(item.dt_txt).getHours()}:
                  {new Date(item.dt_txt).getMinutes()}0
                </p>

                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="Weather icon"
                  className="w-25"
                />

                <p>{item.weather[0].description}</p>
                <p>
                  Temp: {Math.round(item.main.temp)}°C, Vento: {item.wind.speed}{" "}
                  m/s
                </p>
              </div>
            ))}
          </Slider>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Container>
    </>
  );
};

export default MeteoPage;
