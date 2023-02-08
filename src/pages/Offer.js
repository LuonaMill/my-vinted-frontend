import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  return (
    <div>
      <p>{id}</p>
      <p>mon composant offer</p>
      <Link to="/">Naviguer vers Home</Link>
    </div>
  );
};

export default Offer;
