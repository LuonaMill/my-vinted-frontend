import "./offer.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header";

import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  // const { id } = useParams();
  // On aurait pu écrire à la place de {id} :
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <Header />
      <main className="main-offer">
        <div className="test">
          {/* <p>{offer.product_name}</p> */}
          <p>{id}</p>
          <p>mon composant offer</p>
          <Link to="/">Naviguer vers Home</Link>
        </div>
        <section>
          <div className="left">
            <img src={data.product_image.secure_url} alt="" />
          </div>
          <div className="right">
            <p>{data.product_price}€</p>
            {data.product_details.map((detail, index) => {
              const key = Object.keys(detail)[0];
              return (
                <div key={index}>
                  <p>
                    <span>{key}</span> : <span> {detail[key]}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Offer;
