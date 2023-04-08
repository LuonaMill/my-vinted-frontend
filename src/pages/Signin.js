import "../assets/css/signin.scss";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// Test OK : Pour me connecter à mon back en local, utiliser la requête vers http://localhost:4002/user/login

const Signin = ({ handleTokenAndId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  // const { id } = location.state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--backend-vinted--wbbmf4gr4bwy.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        // Cookies.set("token-vinted", response.data.token, {expires:14})
        handleTokenAndId(response.data.token);
        if (location.state.id) {
          navigate(`/offer/${location.state.id}`);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "User not found") {
        setErrorMessage(
          "Cet email est inconnu, merci de renseigner un autre email"
        );
      }
    }
  };
  return (
    <div className="connection">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <div>
          <button type="submit" className="connection-button">
            Se connecter
          </button>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <p className="linkto">Pas encore de compte ? Inscris-toi !</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
