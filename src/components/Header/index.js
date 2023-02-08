import "./header.css";

const Header = ({ logo }) => {
  return (
    <header>
      <img src={logo} alt="logo vinted foncé et en toutes lettres" />
      <input type="text" placeholder="🔍 Recherchez des articles ici" />
      <button className="white-button">S'inscrire</button>
      <button className="white-button">Se connecter</button>
      <button className="blue-button">Vends tes articles</button>
    </header>
  );
};

export default Header;
