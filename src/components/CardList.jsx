import React from "react";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../redux/actions/Wishlist";
import { ToastContainer, toast } from "react-toastify";

function CardList() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlist = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}removeWishlistById`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          getUserWishlist();
          toast(result.message);
        } else {
          toast("Internal Server Error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getUserWishlist = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${
        process.env.REACT_APP_API_URL
      }get-wishlist-by-id/${localStorage.getItem("id")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(setWishlist(result.wishlist));
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container">
      {wishlist?.length === 0 ? (
        <div className="alert alert-danger text-center text-white">
          Wishlist is Empty
        </div>
      ) : (
        wishlist?.map((item) => (
          <div
            className="card w-100 bg-danger-subtle mt-3"
            style={{ boxShadow: "0 7px 7px rgba(0, 0, 0, 0.18)" }}
          >
            <div className="card-body d-flex justify-content-between">
              <div className="d-flex">
                {console.log(item)}
                <img
                  width={100}
                  src={`${process.env.REACT_APP_IMAGE_URL}${
                    item.card_id === null
                      ? item.gift.image_path
                      : item.gift_id === null
                      ? item.card.image_path
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
                      : ""}
                  </h5>
                  <h6>
                    Price: $
                    {item.card_id === null
                      ? item.gift && item.gift.price
                      : item.gift_id === null
                      ? item.card && item.card.price
                      : ""}
                  </h6>
                </span>
              </div>
              <button
                className="btn"
                onClick={() => removeFromWishlist(item.id)}
              >
                <UilTrashAlt size="30" color="black" />
              </button>
            </div>
          </div>
        ))
      )}
      <ToastContainer />
    </div>
  );
}

export default CardList;
