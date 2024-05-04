import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavLink,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/bolt_3722414.png";

const MyNavbar = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const sandInputChange = (event) => {
    setCity(event.target.value);
  };

  const sandSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=76cfda9e30f39e2af936fca60ce65c9f`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch city.");
      }
      const data = await response.json();

      console.log(data);

      navigate(`/meteo/details/${data[0].lat},${data[0].lon}`);
    } catch (error) {
      console.error("Error fetching city data:", error);
    } finally {
      setCity("");
    }
  };

  return (
    <>
      <Navbar className="navStyle" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="Logo" style={{ height: "40px" }} />
            </Link>
          </Navbar.Brand>

          <Nav className="mx-auto">
            <Form className="d-flex" onSubmit={sandSubmit}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2 formInputNav rounder-5"
                value={city}
                onChange={sandInputChange}
              />
              <Button type="submit" className="btnSearch">
                <i className="bi bi-search"></i>
              </Button>
            </Form>
          </Nav>
          <Nav>
            <NavLink as={Link} to="/" className="nav-link text-white">
              Home
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
