import React from "react";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setCart } from "../redux/actions/Cart";
import { Link } from "react-router-dom";

function CartList() {
  const cart = useSelector((state) => state.cartlist.cart);
  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("cart_id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}removeCartById`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          getUserCartList();
          toast(result.message);
        } else {
          toast("Internal Server Error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getUserCartList = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}cart`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setCart(result.cart));
      })
      .catch((error) => console.log("error", error));
  };
  const calculateSubtotal = () => {
    let subtotal = 0;
    cart.forEach((item) => {
      if (item.card_id === null) {
        subtotal += (item.gift?.price || 0) * item.quantity;
      } else if (item.gift_id === null) {
        subtotal += (item.card?.price || 0) * item.quantity;
      }
    });
    return subtotal;
  };
  const subtotal = calculateSubtotal();

  return (
    <div className="container">
      {cart.length === 0 ? (
  <div className="alert alert-danger text-center text-white">Cart is Empty.</div>
) : (
  cart.map((item) => (
    <div
      className="card w-100 bg-danger-subtle mt-3"
      style={{ boxShadow: "0 7px 7px rgba(0, 0, 0, 0.18)" }}
      key={item.id} // Add a unique key
    >
      <div className="card-body d-flex justify-content-between">
        <div className="d-flex">
          {console.log(item)}
          <img
            width={100}
            src={`${process.env.REACT_APP_IMAGE_URL}${
              item.card_id === null
                ? item.gift?.image_path || '' // Safely access image_path
                : item.gift_id === null
                ? item.card?.image_path || '' // Safely access image_path
                : ""
            }`}
            alt="list1"
            className="rounded"
          />
          <span className="mt-4 ms-3">
            <h5>
              {item.card_id === null
                ? item.gift && item.gift.title
                : item.gift_id === null
                ? item.card && item.card.title
                : ""}{" "}
              <small>
                (x
                {item.quantity})
              </small>
            </h5>
            <h6>
              Price: $
              {item.card_id === null
                ? item.gift?.price || 0 // Safely access price
                : item.gift_id === null
                ? item.card?.price || 0 // Safely access price
                : 0
              }
            </h6>
          </span>
        </div>
        <button className="btn" onClick={() => removeFromCart(item.id)}>
          <UilTrashAlt size="30" color="black" />
        </button>
      </div>
    </div>
  ))
)}
      <div className="row">
        <div className="alert alert-light mt-5 d-flex justify-content-between offset-md-6 col-md-6">
          <div className="">SubTotal</div>
          <div className="">${subtotal.toFixed(2)}</div>
        </div>
      </div>
      <div className="row">
        <div className="alert alert-light d-flex justify-content-between offset-md-6 col-md-6">
          <div className="">Total</div>
          <div className="">${subtotal.toFixed(2)}</div>
        </div>
      </div>
      {cart.length > 0 && (
        <div className="logout d-flex justify-content-end">
          <Link to="/checkout/gift" className="btn btn-block bg-pink text-light btn-lg mt-4">
            Checkout
          </Link>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default CartList;
