import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UilShoppingBag, UilHeart } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setWishlist } from "../../redux/actions/Wishlist";
import { setCart } from "../../redux/actions/Cart";

function ProductCards(props) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.cardProduct.cardinfo);
  const gifts = useSelector((state) => state.giftProduct.giftinfo);

  useEffect(() => {
    if (props.type === "cards") {
      setData(cards);
    } else if (props.type === "gifts") {
      setData(gifts);
      console.log(gifts);
    }
  }, [cards, gifts]);

  const handleAddToWishlist = (productID) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    if (props.type === "gifts") {
      formdata.append("gift_id", productID);
    } else if (props.type === "cards") {
      formdata.append("card_id", productID);
    }

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}add_to_wishlist`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          toast(result.message);
          getUserWishlist();
        } else if (result.status === "error") {
          toast(result.message);
          getUserWishlist();
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

  const handleAddToCart = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    if (props.type === "gifts") {
      formdata.append("gift_id", id);
      formdata.append("item_type", "gift");
    } else if (props.type === "cards") {
      formdata.append("card_id", id);
      formdata.append("item_type", "card");
    }

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}cart-store`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          toast(result.message);
          getUserCartList();
        } else if (result.status === 401) {
          toast(result.message);
          getUserCartList();
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

  return (
    <div className="row">
      {data?.length > 0 ? (
        data?.map((product, index) => (
          <div
            className={`${
              props.from === "home" ? "col-md-4" : "col-md-6"
            } text-center`}
            key={index}
            value={product?.id}
          >
            <div
              className="p-3 rounded bg-design mb-3"
              style={{ position: "relative" }}
            >
              <Link
                to={
                  props?.type === "cards"
                    ? "/card/" + product?.id
                    : props?.type === "gifts"
                    ? "/gift/" + product?.id
                    : ""
                }
              >
                <img
                  width="100%"
                  src={`${process.env.REACT_APP_IMAGE_URL}${product?.image_path}`}
                  alt="Gift Box"
                />
              </Link>
              <UilHeart
                className="d-block item-icons"
                size="35"
                color="rgba(0, 0, 0, 0.65)"
                onClick={() => handleAddToWishlist(product?.id)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "10px",
                  backgroundColor: "white",
                  padding: "8px",
                }}
              />
              {props?.type !== "cards" && (
                <UilShoppingBag
                  className="d-block item-icons"
                  size="35"
                  color="rgba(0, 0, 0, 0.65)"
                  onClick={() => handleAddToCart(product?.id)}
                  style={{
                    position: "absolute",
                    top: "60px",
                    right: "10px",
                    backgroundColor: "white",
                    padding: "8px",
                  }}
                />
              )}
            </div>
            <Link
              style={{ textDecoration: "none" }}
              className="text-black"
              to={
                props?.type === "cards"
                  ? "/card/" + product?.id
                  : props?.type === "gifts"
                  ? "/gift/" + product?.id
                  : ""
              }
            >
              <h5 className="mb-5">
                {product?.title} - ${product?.price}
              </h5>
            </Link>
          </div>
        ))
      ) : (
        <div className="col-md-12 text-center">
          <p>No product found of this category.</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default ProductCards;
