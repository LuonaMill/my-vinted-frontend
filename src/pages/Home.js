import "../assets/css/home.scss";
import OfferCard from "../components/OfferCard";
import heroImage from "../images/officiel-hero-image.jpg";

// import offers from "../offers.json";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = ({
  search,
  sortAscPrice,
  sortDescPrice,
  setFilterDisplay,
  priceMin,
  priceMax,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  console.log(search.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?sort=${sortAscPrice}${sortDescPrice}&title=${search}&priceMin=${priceMin}&priceMax=${priceMax}`
        );
        setData(response.data);
        setIsLoading(false);
        setFilterDisplay(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, sortAscPrice, sortDescPrice, priceMin, priceMax]);

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
