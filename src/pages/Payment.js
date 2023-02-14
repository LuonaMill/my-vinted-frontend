import "../assets/css/payment.scss";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
  //  Je me connecte au compte stripe du Reacteur en front en fournissant sa clef publique
  // const stripePromise = loadStripe(
  //   "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  // );

  //  Je me connecte à mon compte stripe
  const stripePromise = loadStripe(
    "pk_test_51MbOMcBYTQKPCQuG2QTDXNquLlbZlSf1KtFoCNpdANNAjL5RP4kWQPPeb06hhz1PEfgkJ2y1AYdnbQgudGhV02XV00tlgngW9z"
  );
  const location = useLocation();
  const { title, price, id, ownerid } = location.state;
  const protectionFees = 40 / 100;
  const shippingFees = 80 / 100;
  const total = (price + protectionFees + shippingFees).toFixed(2);

  return (
    <main className="payment">
      <section>
        <div className="part top">
          <h3>Résumé de la commande</h3>

          <div className="fees">
            <p>Commande</p>
            <p>{price.toFixed(2)} €</p>
          </div>
          <div className="fees">
            <p>Frais de protection acheteur</p>
            <p>{protectionFees.toFixed(2)} €</p>
          </div>
          <div className="fees">
            <p>Frais de port</p>
            <p>{shippingFees.toFixed(2)} €</p>
          </div>
        </div>
        <div className="part bottom">
          <div className="fees total">
            <p>Total</p>
            <p>{total} €</p>
          </div>
          <div>
            <article>
              Il ne vous reste plus qu'une étape pour vous offrir ce{" "}
              <span
                style={{ fontFamily: "Lato, sans-serif", fontWeight: "bold" }}
              >
                {title}
              </span>
              .
              <br />
              Le montant de votre commande s'élève à {total} € <br />
              (frais de protection et frais de port inclus).
            </article>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm name={ownerid} title={title} amount={price} />
          </Elements>

          {id}
        </div>
      </section>
    </main>
  );
};

export default Payment;
