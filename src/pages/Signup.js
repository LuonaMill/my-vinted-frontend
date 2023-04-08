import "../assets/css/signup.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({ handleTokenAndId }) => {
  const navigate = useNavigate();

  // On va créer un state par input puis on va demander à nos input de stocker à chaque changement avec onChange
  //Ensuite on va lier nos input à nos states grâce à "value={email}" pour l'exemple
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  //On crée un state pour pouvoir stocker un éventuel message d'erreur (pb de compte déjà créé par ex)
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    // 1e etape A : on empêche le rafraîchissement de la page
    event.preventDefault();
    // 1e etape B : on remet le message d'erreur à 0 au cas où le user en ait un qui se soit affiché
    setErrorMessage("");

    //2e etape : je prévois toute erreur à la soumission du form avec un try/catch

    try {
      // 3e etape : on fait une requête asynchrone qu'on stocke dans une variable.
      const response = await axios.post(
        "http://localhost:4002/user/signup",
        //4e etape : Cette requête doit recevoir un body qui sera le contenu de mes states
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      //Puis je vérifie avec un console.log si je reçois bien mes infos dans la console
      console.log(response.data);
      console.log(response.data.token);
      //5e etape : je stocke mon token autogénéré par mon serveur dans un cookie, avec une durée d'expiration fixée à 14 jours, à condition que ce token existe
      if (response.data.token) {
        // Cookies.set("token", response.data.token, { expires: 14 });
        handleTokenAndId(response.data.token);
        // une fois mon token stocké, je veux naviguer vers la page Home
        navigate("/");
      }
    } catch (error) {
      // pour savoir exactement ce que le serveur renvoie comme erreur, on utilise error.response.data
      console.log(error.response.data); //par ex : {message:"This email already has an account"}
      console.log(error.response.status); //par ex: 409 qui correspond à Conflict
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          "Cet email est déjà utilisé, merci d'utiliser un autre email ou d'aller dans Se connecter"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Merci de remplir tous les champs");
      }
    }
  };

  return (
    <div className="sign-up">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <div className="signup-form">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
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

        <div className="agreement-text">
          <div className="checkbox-block">
            <input
              checked={newsletter}
              type="checkbox"
              className="checkbox"
              onChange={() => setNewsletter(!newsletter)}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button type="submit" className="subscription-button">
            S'inscrire
          </button>
          {errorMessage && (
            <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
          )}
          <p
            onClick={() => {
              navigate("/signin");
            }}
          >
            Tu as déjà un compte ? Connecte-toi !
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
