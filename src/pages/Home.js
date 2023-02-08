import { Link } from "react-router-dom";

const Home = () => {
  const offerId = 333;
  return (
    <div>
      <h1>mon composant home</h1>
      <Link to={`/offer/${offerId}`}>Naviguer vers Offer</Link>
    </div>
  );
};

export default Home;
