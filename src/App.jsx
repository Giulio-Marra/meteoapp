import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./Components/MyNavbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Homepage from "./Components/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MeteoPage from "./Components/MeteoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/meteo/details/:dynamicId" element={<MeteoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
