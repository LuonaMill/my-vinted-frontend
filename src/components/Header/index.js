import "./header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";

const Header = ({
  handleToken,
  token,
  search,
  setSearch,
  sortAscPrice,
  setSortAscPrice,
  sortDescPrice,
  setSortDescPrice,
  filterDisplay,
}) => {
  // const token = Cookies.get("token-vinted");

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo vinted foncé et en toutes lettres" />
      </Link>
      <div>
        <input
          type="text"
          placeholder="🔍   Recherchez des articles ici"
          className="researcher"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
        {/* Créer une condition d'affichage de la div sort-by-price 
        Idée : seulement sur la page Home 
        */}
        {location.pathname === "/" && (
          <div className="sort-by-price">
            <p>Trier par</p>
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
            {/* <input
            type="checkbox"
            name="sort-price"
            value={sortAscPrice}
            onChange={(event) => {
              setSortAscPrice(!sortAscPrice);
            }}
          /> */}
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
            handleToken(null);
          }}
          className="red-button"
        >
          Se déconnecter
        </button>
      )}

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
    </header>
  );
};

export default Header;
