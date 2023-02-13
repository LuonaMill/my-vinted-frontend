import "../pages/signin.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Cookies from "js-cookie";

const Signin = ({ handleToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        // Cookies.set("token-vinted", response.data.token, {expires:14})
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="sign-in">
      <section className="connection">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="signup-form">
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
          <div>
            <button type="submit" className="connection-button">
              Se connecter
            </button>
            <Link to="/signup">
              <p className="linkto">Pas encore de compte ? Inscris-toi !</p>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Signin;
