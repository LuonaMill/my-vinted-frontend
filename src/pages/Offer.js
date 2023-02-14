import "../assets/css/offer.scss";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";

const Offer = ({ token }) => {
  const navigate = useNavigate();
  // const location = useLocation();
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
      <main className="main-offer">
        <div className="left">
          <img src={data.product_image.secure_url} alt="" />
        </div>
        <div className="right">
          <div className="right-top">
            <p className="price">{data.product_price} €</p>
            <div className="details">
              {data.product_details.map((detail, index) => {
                const key = Object.keys(detail)[0];
                return (
                  <ul key={index} className="each-detail">
                    <li>
                      <span className="type">{key.toUpperCase()}</span>
                      <span className="infos">{detail[key].toUpperCase()}</span>
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
          <div>
            <hr />
          </div>

          <div className="right-bottom">
            <p style={{ fontWeight: "700", fontSize: "18px" }}>
              {data.product_name}
            </p>
            <p style={{ fontWeight: "300", fontSize: "18px" }}>
              {data.product_description}
            </p>

            {data.owner.account.avatar ? (
              <p className="owner">
                <img src={data.owner.account.avatar.secure_url} alt="avatar" />
                <span>{data.owner.account.username}</span>
              </p>
            ) : (
              <p>
                <span>{data.owner.account.username}</span>
              </p>
            )}
          </div>
          <div className="buy-button">
            <button
              onClick={() => {
                if (!token) {
                  navigate("/signin", {
                    state: {
                      id: id,
                    },
                  });
                } else {
                  // navigate("/payment");
                  navigate("/payment", {
                    state: {
                      title: data.product_name,
                      price: data.product_price,

                      ownerid: data.owner._id,
                    },
                  });
                }
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Offer;
