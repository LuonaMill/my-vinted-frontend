import { Link } from "react-router-dom";

const OfferCard = ({ offerInfos, key, offerId }) => {
  return (
    <div key={offerId} className="offer">
      <Link
        to={`/offer/${offerInfos._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="avatar">
          {offerInfos.owner.account.avatar && (
            <img
              src={offerInfos.owner.account.avatar.secure_url}
              alt="owner avatar"
            />
          )}
          <span>{offerInfos.owner.account.username}</span>
        </div>
        <div className="offer-picture">
          <img
            src={offerInfos.product_pictures[0].secure_url}
            alt="object to buy"
          />
        </div>
        <p>{offerInfos.product_price}€</p>

        <p>{offerInfos.product_details[1]["TAILLE"]}</p>
        <p>{offerInfos.product_details[0].MARQUE}</p>
      </Link>
    </div>
  );
};

export default OfferCard;
