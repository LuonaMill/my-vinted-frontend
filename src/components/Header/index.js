import "./header.css";
import { Link } from "react-router-dom";

const Header = ({ logo }) => {
  return (
    <header>
      <img src={logo} alt="logo vinted foncé et en toutes lettres" />
      <input
        type="text"
        placeholder="🔍   Recherchez des articles ici"
        className="researcher"
      />
      <Link to="/signup" logo={logo}>
        <button className="white-button">S'inscrire</button>
      </Link>
      <button className="white-button">Se connecter</button>
      <button className="blue-button">Vends tes articles</button>
    </header>
  );
};

export default Header;
