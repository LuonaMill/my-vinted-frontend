import "../assets/css/payment.scss";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ name, product_name, order_price }) => {
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Permettra de créer une requête vers stripe pour obtenir un token
  const stripe = useStripe();
  // Permettra de récupérer les données bancaires de l'utilisateur
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      // Je récupère le contenu de l'input CardElement
      const cardElement = elements.getElement(CardElement);
      //  J'envoie ces informations à stripe pour qu'il valide le code de carte de l'utilisateur et qu'il me renvoie un token.
      const stripeResponse = await stripe.createToken(cardElement, {
        name: name,
      });
      console.log(product_name);
      console.log(order_price * 100);

      // Je récupère le token envoyé par Stripe avec
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://site--backend-vinted--wbbmf4gr4bwy.code.run/payment",
        {
          stripeToken: stripeToken,
          title: product_name,
          amount: order_price,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {completed ? (
        <p>Paiement effectué, merci de votre commande</p>
      ) : (
        <button type="submit" disabled={isLoading}>
          Payer
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
