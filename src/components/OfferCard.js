import { Link } from "react-router-dom";

//TODO enlever style inline et retravailler le visuel (texte en gris plutôt qu'en noir, notamment)

const OfferCard = ({ offerInfos, offerId }) => {
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
          <img src={offerInfos.product_image.secure_url} alt="object to buy" />
        </div>
        <p>{offerInfos.product_price}€</p>

        {offerInfos.product_details.length > 0 && (
          <>
            <p>{offerInfos.product_details[1]["TAILLE"]}</p>
            <p>{offerInfos.product_details[0].MARQUE}</p>
          </>
        )}
      </Link>
    </div>
  );
};

export default OfferCard;
