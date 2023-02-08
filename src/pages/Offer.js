import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Offer = () => {
  return (
    <div>
      <p>mon composant offer</p>
      <Link to="/">Naviguer vers Home</Link>
    </div>
  );
};

export default Offer;
