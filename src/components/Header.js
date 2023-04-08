import "../assets/css/header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

const Header = ({
  handleTokenAndId,
  token,
  search,
  setSearch,
  sortAscPrice,
  setSortAscPrice,
  sortDescPrice,
  setSortDescPrice,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
}) => {
  // const token = Cookies.get("token-vinted");

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo vinted foncé et en toutes lettres" />
      </Link>
      <div className="filters">
        <input
          type="text"
          placeholder="🔍   Recherchez des articles ici"
          className="researcher"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          value={search}
        />

        {location.pathname === "/" && (
          <div className="sort-by-price">
            <div className="up-down">
              <span>Trier par </span>
              <button
                className={sortAscPrice ? "blue-button" : ""}
                onClick={() => {
                  setSortAscPrice("price-asc");
                  setSortDescPrice("");
                }}
              >
                Prix croissant
              </button>
              <button
                className={sortDescPrice ? "blue-button" : ""}
                onClick={() => {
                  setSortDescPrice("price-desc");
                  setSortAscPrice("");
                }}
              >
                Prix décroissant
              </button>
            </div>
            <div className="price-minmax">
              <span>Afficher les articles entre</span>
              <input
                type="text"
                placeholder="min"
                onChange={(event) => {
                  setPriceMin(event.target.value);
                }}
              />
              <span>et </span>
              <input
                type="text"
                placeholder="max"
                onChange={(event) => {
                  setPriceMax(event.target.value);
                }}
              />
              <span>€</span>
            </div>
          </div>
        )}
      </div>
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
            handleTokenAndId(null);
          }}
          className="red-button"
        >
          Se déconnecter
        </button>
      )}

      {/* VOICI UNE FACON DE FAIRE UN BOUTON LINKé AVEC ONCLICK  */}
      <button
        className="blue-button"
        onClick={() => {
          if (token) {
            navigate("/publish");
          } else {
            navigate("/signin");
          }
        }}
      >
        Vends tes articles
      </button>

      {/* VOICI UNE AUTRE FACON DE FAIRE GRACE A UNE TERNAIRE dans LINK*/}
      {/* <Link to={token ? navigate("/publish") : navigate("/signin")}>
        <button className="blue-button"> Vends tes articles</button>
      </Link> */}
    </header>
  );
};

export default Header;
