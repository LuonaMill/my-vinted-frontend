import "./App.css";
import "./assets/css/stylesheet.css";
import { useState } from "react";

//Import du router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Import des pages
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

import Cookies from "js-cookie";

//TODO : renommer ma fonction handleTokenAndId en handleToken

function App() {
  const [search, setSearch] = useState("");
  const [sortAscPrice, setSortAscPrice] = useState("");
  const [sortDescPrice, setSortDescPrice] = useState("price-desc");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(999999);

  //Je dois créer un state pour mon token qui sera utilisé dans mes pages Header, Signup et Signin donc je le mets dans App.js, car c'est le plus proche ancêtre commun
  // Je vérifie si le token vinted existe dans mes cookies, sinon null
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);
  //// const [id, setId] = useState(Cookies.get("id-vinted") || null);

  // je crée une fonction qui gérera à la fois la création du token + son chgmt de state (idem pour suppression)
  const handleTokenAndId = (token, id) => {
    // if (token && id) {
    //   setToken(token);
    //   setId(id);
    //   Cookies.set("token-vinted", token, { expires: 14 });
    //   Cookies.set("id-vinted", token, { expires: 14 });
    // } else {
    //   setToken(null);
    //   setId(null);
    //   Cookies.remove("token-vinted");
    //   Cookies.remove("id-vinted");
    // }
    if (token) {
      setToken(token);
      Cookies.set("token-vinted", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("token-vinted");
    }
  };

  return (
    <Router>
      <Header
        handleTokenAndId={handleTokenAndId}
        token={token}
        search={search}
        setSearch={setSearch}
        sortAscPrice={sortAscPrice}
        setSortAscPrice={setSortAscPrice}
        sortDescPrice={sortDescPrice}
        setSortDescPrice={setSortDescPrice}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              sortAscPrice={sortAscPrice}
              sortDescPrice={sortDescPrice}
              priceMax={priceMax}
              priceMin={priceMin}
              token={token}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route
          path="/signup"
          element={<Signup handleTokenAndId={handleTokenAndId} f />}
        />
        <Route
          path="/signin"
          element={<Signin handleTokenAndId={handleTokenAndId} />}
        />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
