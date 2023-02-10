import "./home.css";
import { Link } from "react-router-dom";
import OfferCard from "../components/OfferCard";

import heroImage from "../images/officiel-hero-image.jpg";
// import offers from "../offers.json";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = (search) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (search.length < 3) {
        try {
          const response = await axios.get(
            "https://lereacteur-vinted-api.herokuapp.com/offers"
          );
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          const response = await axios.get(
            `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
          );
          setData(response.data);
          console.log(data.offers);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <main className="main-home">
        <section className="hero-block">
          <img
            src={heroImage}
            alt="couple homme femme qui regarde un tshirt orange"
          />
          <div className="white-square">
            <h2>
              Prêts à faire du tri <br /> dans vos placards ?
            </h2>
            <button>Vends maintenant</button>
          </div>
        </section>
        <h1>mon composant home</h1>
        {/* <img src={logo} alt="" /> */}
        <Link to={`/offer/id`}>Naviguer vers Offer</Link>

        <section className="homepage-offers">
          {data.offers.map((elem, index) => {
            return (
              <OfferCard offerInfos={elem} key={elem._id} offerId={elem._id} />
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Home;
