import "./App.css";

// import axios from "axios";
import { useState, useEffect } from "react";

//Import du router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Import des pages
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Cookies from "js-cookie";

function App() {
  const [search, setSearch] = useState("");

  //Je dois créer un state pour mon token qui sera utilisé dans mes pages Header, Signup et Signin donc je le mets dans App.js, car c'est le plus proche ancêtre commun
  // Je vérifie si le token vinted existe dans mes cookies, sinon null
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);
  // je crée une fonction qui gérera à la fois la création du token + son chgmt de state (idem pour suppression)

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-vinted", token, { expires: 14 });
    } else {
      {
        setToken(null);
        Cookies.remove("token-vinted");
      }
    }
  };

  return (
    <Router>
      <Header
        handleToken={handleToken}
        token={token}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home />} search={search} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/signin" element={<Signin handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
