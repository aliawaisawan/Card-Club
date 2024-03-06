import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddressForm from "../components/Address/AddressForm";
import StripeModel from "../components/CheckoutGifts/StripeModel";
// import { apiKey, apiURL } from "../utils/constants";
import {
  useStripe,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { ToastContainer } from "react-toastify";

function CheckoutGift() {
  const navigate = useNavigate;
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const stripe = useStripe();
  const [openStripeModel, setOpenStripeModel] = useState(false);
  const cart = useSelector((state) => state.cartlist.cart);
  const [ gifts, setGifts ] = useState([]);
  const addresses = useSelector((state) => state.addresses.address);

  const [paymentRequest, setPaymentRequest] = useState(null);

  const [credentials, setCredentials] = useState({
    address: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (cart && cart.length === 0) {
      navigate("/");
    }
  }, []);

  const calculateSubtotal = () => {
    let subtotal = 0;
    cart.forEach((item) => {
      if (item.card_id === null) {
        if (!gifts.includes(item["gift_id"])) {
          setGifts([...gifts, item["gift_id"]])
        }
        subtotal += item.gift.price * item.quantity;
      } else if (item.gift_id === null) {
        subtotal += item.card.price * item.quantity;
      }
    });
    return subtotal;
  };
  const subtotal = calculateSubtotal();

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1099,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);

  return (
    <div className="checkout container pt-3 mt-md-5 mt-3">
      <Link className="d-flex justify-content-center ms-5" to="/">
        <img width="80x" src="/assets/images/logo.png" alt="Logo" />
      </Link>
      <section className="py-3">
        <div className="container px-4 px-lg-5">
          <div className="row">
            <div className="col-md-8 offset-md-2 mb-4 mt-3 mt-md-0">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-1">Checkout</h4>
                <span className="badge badge-secondary badge-pill">3</span>
              </h4>
              <ul className="list-group mb-3">
                {cart &&
                  cart?.map((item) => (
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div className="d-flex">
                        <img
                          className="img img-responsive rounded"
                          width={50}
                          height={50}
                          src={`${process.env.REACT_APP_IMAGE_URL}${item.gift.image_path}`}
                        />
                        <h6 className="my-0 ms-2 my-auto">
                          {item?.gift.title}
                        </h6>
                        <small className="text-muted my-auto ms-1">
                          x{item?.quantity}
                        </small>
                      </div>
                      <span className="text-muted mt-2">
                        ${item?.gift.price}
                      </span>
                    </li>
                  ))}
                <br />
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotal (USD)</span>
                  <p>${subtotal}</p>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Shipping Fee (USD)</span>
                  <p>${20.00}</p>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${subtotal + 20}</strong>
                </li>
              </ul>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Select Address
                </label>
                <select
                  name="address"
                  value={credentials.address}
                  onChange={onChange}
                  className="form-control"
                >
                  <option value="" disabled>
                    Select Address
                  </option>
                  {addresses &&
                    addresses.map((data, index) => (
                      <option key={index} value={data?.id}>
                        {data?.address_name}
                      </option>
                    ))}
                </select>
                <div className="text-center pt-1">
                  <small className="text-center">OR</small>
                </div>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addressModal"
                  className="btn btn-block btn-login bg-pink w-100 mt-2 text-white"
                >
                  Add Address
                </button>
              </div>
              {
                  credentials.address !== "" ? <div className="d-block text-center">
                  <button
                    className="btn btn-success btn-lg"
                    onClick={() => setOpenStripeModel(true)}
                  >
                    Pay with Stripe
                  </button>
                </div> : ""
                }
            </div>
          </div>
        </div>
      </section>
      <AddressForm />
      <ToastContainer/>
      <StripeModel
        isOpen={openStripeModel}
        onClose={() => setOpenStripeModel(false)}
        gifts={gifts}
        total={subtotal + 20}
        addressId={credentials.address}
      />
    </div>
  );
}

export default CheckoutGift;
