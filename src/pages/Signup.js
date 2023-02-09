import Header from "../components/Header";
import logo from "../images/logo.png";
import "./signup.css";
import { useNavigate } from "react-router-dom";

//Pour le cryptage de mot de passe
import { SHA256 } from "crypto-js";
import uid2 from "uid2";
import encBase64 from "crypto-js/enc-base64";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="sign-up">
      <Header logo={logo} />
      <section className="subscription">
        <h2>S'inscrire</h2>
        <form className="signup-form">
          <input type="text" placeholder="Nom d'utilisateur" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Mot de passe" />
        </form>
        <div className="agreement-text">
          <div className="checkbox-block">
            <input type="checkbox" className="checkbox" />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button className="subscription-button">S'inscrire</button>
          <p
            onClick={() => {
              navigate("/signin");
            }}
          >
            Tu as déjà un compte ? Connecte-toi !
          </p>
        </div>
      </section>
    </div>
  );
};

export default Signup;
