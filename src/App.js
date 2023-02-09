import "./App.css";
import logo from "./images/logo.png";
// import axios from "axios";
// import { useState, useEffect } from "react";

//Import du router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Import des pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} logo={logo} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
