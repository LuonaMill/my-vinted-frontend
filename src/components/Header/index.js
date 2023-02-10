import "./header.css";
import { Link, Navigate, useParams } from "react-router-dom";
import logo from "/Users/laurine/LeReacteur/React/Jour8/vinted-frontend/src/images/logo.png";
// import Cookies from "js-cookie";
// import { useState } from "react";

const Header = ({ handleToken, token, search, setSearch }) => {
  // const token = Cookies.get("token-vinted");

  const { id } = useParams();
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo vinted foncé et en toutes lettres" />
      </Link>
      <input
        type="text"
        placeholder="🔍   Recherchez des articles ici"
        className="researcher"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        value={search}
      />

      {!token ? (
        <>
          <Link to="/signup">
            <button className="white-button">S'inscrire</button>
          </Link>
          <Link to="/signin">
            <button className="white-button">Se connecter</button>
          </Link>
        </>
      ) : (
        <button
          onClick={() => {
            handleToken(null);
          }}
        >
          Se déconnecter
        </button>
      )}

      <button className="blue-button">Vends tes articles</button>
    </header>
  );
};

export default Header;
