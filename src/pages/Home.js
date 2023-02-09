import "./home.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import OfferCard from "../components/OfferCard";
import logo from "../images/logo.png";
import heroImage from "../images/officiel-hero-image.jpg";
// import offers from "../offers.json";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <Header logo={logo} />
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
              <OfferCard offerInfos={elem} key={elem._id} />
              // <div key={elem._id} className="offer">
              //   <Link
              //     to={`/offer/${elem._id}`}
              //     style={{ textDecoration: "none", color: "black" }}
              //   >
              //     <div className="avatar">
              //       {/* <p>{elem.owner.account.avatar.version}</p> */}
              //       {/* <img src={elem.owner.account.avatar.secure_url} alt="" /> */}
              //       <img
              //         src="https://res.cloudinary.com/lereacteur/image/upload/v1674147457/api/vinted-v2/users/63c976812e1908e769f71f10/avatar.png"
              //         alt="image-avatar"
              //       />
              //       <p>{elem.owner.account.username}</p>
              //     </div>
              //     <div className="offer-picture">
              //       <img src={elem.product_pictures[0].secure_url} alt="" />
              //     </div>
              //     <p>{elem.product_price}€</p>

              //     <p>{elem.product_details[1]["TAILLE"]}</p>
              //     <p>{elem.product_details[0]["MARQUE"]}</p>
              //   </Link>
              // </div>
              // </OfferCard>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Home;
