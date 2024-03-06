import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const StripeModel = ({ isOpen, onClose, gifts, total, addressId }) => {
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

  const [paymentProccessing, setPaymentProccessing] = useState(false);

  const [clientSecret, setSlientSecret] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const profile = useSelector((state) => {
    return state.userDetails;
  });

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const saveOrder = async (paymentId) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}order`,
        {
          user_id: profile.user.id,
          card_id: "",
          gift_id: gifts,
          order_type: "physical",
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

        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("user")
        );

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_API_URL}cart-empty`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === 200) {
              setTimeout(() => {
                navigate("/home");
              }, 5000);
            } else {
              toast("Internal Server Error");
            }
          })
          .catch((error) => console.log("error", error));
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

    if (!stripe || !elements) return;

    setPaymentProccessing(true);

    axios
      .post(
        "https://api.cardclubapp.com/api/create-payment-intent",
        {
          amount: total,
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
