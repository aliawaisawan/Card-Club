import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const StripeModel = ({ isOpen, onClose, ordertype, addressId }) => {
  const styling = {
    bg: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: isOpen ? "0" : "100%",
      opacity: isOpen ? 1 : 0,
      background: "rgba(0, 0, 0, 0.7)",
      transition: "300ms",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modelWrapper: {
      position: "relative",
      background: "white",
      minWidth: "400px",
      borderRadius: ".5rem",
      padding: "1rem 0.6rem",
    },
    modelCloseIcon: {
      color: "black",
      fontSize: "48px",
      position: "absolute",
      top: "-2%",
      right: "4%",
      cursor: "pointer",
    },
    modelHeading: {
      textAlign: "center",
      fontWeight: "bold",
      paddingBlock: "1rem",
    },
    formLabel: {
      fontWeight: "600",
    },
    cardField: {
      padding: "1rem .6rem",
      margin: "2rem 0",
      background: "rgba(0, 0, 0, 0.05)",
    },
    payButtonWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    payButton: {
      padding: ".3rem 2rem",
      background: "#F0CDD4",
      color: "#fff",
      border: "none",
      borderRadius: ".3rem",
    },
  };

  console.log(addressId)

  const [paymentProccessing, setPaymentProccessing] = useState(false);

  const [card, setCard] = useState(null);
  const [clientSecret, setSlientSecret] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const profile = useSelector((state) => state.userDetails);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}searchCardById/${params.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCard(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [params.id]);

  const saveOrder = async (paymentId) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}order`,
        {
          user_id: profile.user.id,
          card_id: params.id,
          gift_id: [],
          order_type: ordertype,
          status: "completed",
          address_id: addressId,
          payment_id: paymentId
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        onClose();
        toast.success("Payment Confirmed Successfully");
        setTimeout(() => {
          navigate("/home");
        }, 5000);
      })
      .catch((err) => {
        toast.error(
          "There was an error while confirming payment. Please try again"
        );
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(card.price);
    if (!stripe || !elements) return;

    setPaymentProccessing(true);

    axios
      .post(
        "https://api.cardclubapp.com/api/create-payment-intent",
        {
          amount: card.price,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then(async (response) => {
        console.log("client secret created");
        setSlientSecret(response.data["client_secret"]);
      })
      .catch((error) => {
        toast.error(
          "There was an error while confirming payment. Please try again"
        );
        console.log(error);
      })
      .finally(() => {
        setPaymentProccessing(false);
      });
  };

  const confirmPayment = async () => {
    if (!stripe || !elements || !clientSecret) return;

    console.log("Confirming payment... ", clientSecret);
    if (clientSecret) {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log("Payment confirmed : ", paymentIntent);

      if (paymentIntent) {
        await saveOrder(paymentIntent.id);
        setPaymentIntent(paymentIntent);
      }

      // next is save in db and then redirect to order history
    }
  };

  useEffect(() => {
    confirmPayment();
  }, [clientSecret, stripe, elements]);

  return (
    <>
      <div style={{ ...styling.bg }}>
        <div style={{ ...styling.modelWrapper }}>
          <span
            style={{ ...styling.modelCloseIcon }}
            onClick={() => {
              onClose();
            }}
          >
            &times;
          </span>
          <h4 style={{ ...styling.modelHeading }}>Pay With Stripe</h4>
          <hr />
          <form id="payment-form" onSubmit={handleSubmit}>
            <div style={{ ...styling.cardField }}>
              <CardElement
                onReady={() => {
                  console.log("CardElement [ready]");
                }}
                onChange={(event) => {
                  console.log("CardElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardElement [focus]");
                }}
              />
            </div>
            <div style={{ ...styling.payButtonWrapper }}>
              <button
                style={{ ...styling.payButton }}
                type="submit"
                disabled={!stripe || paymentProccessing}
              >
                {paymentProccessing ? "Loading..." : "Pay"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StripeModel;
