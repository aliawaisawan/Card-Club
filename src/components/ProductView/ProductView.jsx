import React, { useState } from "react";
import { UilCalendarAlt, UilHeart } from "@iconscout/react-unicons";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setWishlist } from "../../redux/actions/Wishlist";
import { UilPlusCircle } from "@iconscout/react-unicons";
import { setCart } from "../../redux/actions/Cart";

function ProductView(props) {
  const params = useParams();
  const CardCat = useSelector((state) => state.cardCat.card);
  const GiftCat = useSelector((state) => state.giftCat.gift);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleAddToCart = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("gift_id", id);
    formdata.append("item_type", "gift");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}cart-store`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.show === "gifts") {
      handleGifts();
    } else if (props.show === "cards") {
      handleCards();
    }
  }, []);

  const handleCards = () => {
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
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const handleGifts = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_API_URL}searchGiftById/${params.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const handleAddToWishlist = (productID) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    if (props.show === "gifts") {
      formdata.append("gift_id", productID);
    } else if (props.show === "cards") {
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
  const [credentials, setCredentials] = useState({
    title: "",
    datetime: "",
    relationship: "",
    recipient: "",
  });
  const [show, setShow] = useState(false);

  const handleEvents = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("title", credentials.title);
    formdata.append("date_time", credentials.datetime);
    if (props.show === "gifts") {
      formdata.append("gift_id", data.id);
    } else if (props.show === "cards") {
      formdata.append("card_id", data.id);
    }
    formdata.append("relation_ids", credentials.relationship);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://www.cardclubapp.com/api/create_reminder", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          toast(result.message);
          setShow(false);
          setCredentials({
            title: "",
            datetime: "",
            relationship: "",
            recipient: "",
          });
        } else {
          toast("Unable to Create Reminder");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRecipient = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("title", credentials.recipient);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}create_relation`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          toast(result.message);
          getRelation();
          credentials.recipient = "";
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getRelation();
  }, []);

  const [relation, setRelation] = useState([]);

  const getRelation = () => {
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
      }get-relation-by-id/${localStorage.getItem("id")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setRelation(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <section className="container">
      <div className="row">
        <div className="col-md-6 mt-4">
          <div style={{ backgroundColor: "#f4f5f7" }}>
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}${
                data && data?.image_path
              }`}
              className="w-100"
              alt="card"
            />
          </div>
        </div>
        <div className="col-md-6 p-xl-5">
          <h2 className="text-pink">${data && data.price}</h2>
          <h1 className="mt-2">{data && data.title}</h1>
          <p className="mt-3 mb-5">
            Beautiful Customizeable Digital eGift Cards For Your Friends.
            Create, Design & Send Beautiful Messages as Gift.
          </p>
          <hr />
          <div className="d-flex my-3">
            {/* <div
              className="card mt-2 pt-1 mb-1"
              style={{ width: "130px", height: "40px" }}
            >
              <div className="card-body d-flex justify-content-around p-0">
                <span
                  onClick={handleQuantityMinus}
                  className="fs-2 mb-2 pointer"
                  style={{ lineHeight: "0.8" }}
                >
                  -
                </span>
                <input
                  className="form-control text-center"
                  value={quantity}
                  style={{ width: "40%", height: "80%" }}
                />
                <span
                  onClick={handleQuantityPlus}
                  className="fs-3 mb-2 pointer"
                  style={{ lineHeight: "1.1" }}
                >
                  +
                </span>
              </div>
            </div> */}
            <div className="ms-auto">
              <button
                className="btn btn-block btn-success p-2"
                onClick={handleShow}
              >
                <UilCalendarAlt size="30" />
              </button>
              <button
                className="btn ms-2 btn-block bg-pink p-2"
                onClick={() => handleAddToWishlist(data.id)}
              >
                <UilHeart size="30" color="white" />
              </button>
              {props.show === "gifts" ? (
                <button
                  className="ms-5 btn btn-block btn-white btn-lg btn-outline-pink"
                  onClick={() => handleAddToCart(data.id)}
                >
                  Add to Cart
                </button>
              ) : props.show === "cards" ? (
                <button
                  className="ms-5 btn btn-block btn-white btn-lg btn-outline-pink"
                  onClick={() => {
                    localStorage.setItem("card",process.env.REACT_APP_IMAGE_URL +(data && data?.image_path));
                    navigate("/custom/" + params.id.toString());
                  }}
                >
                  Customize
                </button>
              ) : null}
            </div>
          </div>
          <hr />
          <div className="mt-4">
            <p>
              Category:{" "}
              {props.show === "cards"
                ? CardCat?.map((cat, index) =>
                    cat.id === data.card_categories_id ? cat.title : ""
                  )
                : props.show === "gifts"
                ? GiftCat?.map((cat, index) =>
                    cat.id === data.gift_categories_id ? cat.title : ""
                  )
                : ""}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="mt-5">
        <div className="d-flex">
          <h5> Additional Information </h5>
          <h5 className="ms-3">Specifications</h5>
        </div>
        <hr />
        <p>
          <strong>This is the first item's accordion body.</strong> It is hidden
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance and hiding via CSS transitions.
        </p>
      </div> */}
      <ToastContainer />
      {show && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <form onSubmit={handleEvents}>
                <div class="modal-header bg-pink">
                  <h4 class="modal-title text-white" id="exampleModalLabel">
                    Create New Reminder
                  </h4>
                </div>
                <div class="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <label className="mt-3">Title</label>
                      <input
                        type="text"
                        onChange={onChange}
                        value={credentials.title}
                        name="title"
                        required
                        class="form-control form-control-md mb-2"
                        placeholder="Mother's Birthday"
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="mt-3 ">Date & Time</label>
                      <input
                        type="datetime-local"
                        name="datetime"
                        onChange={onChange}
                        value={credentials.datetime}
                        required
                        class="form-control form-control-md mb-2"
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="mt-3 ">Relationship</label>
                      <select
                        type="text"
                        name="relationship"
                        onChange={onChange}
                        value={credentials.relationship}
                        required
                        className="form-control form-control-md mb-2"
                      >
                        <option value="" disabled>
                          Select Relation
                        </option>
                        {relation.map((relate) => (
                          <option value={relate.id}>{relate.title}</option>
                        ))}
                      </select>
                    </div>
                    <p className="pt-3">Add Relation</p>
                    <div className="d-flex justify-content-between">
                      <input
                        type="text"
                        className="form-control"
                        name="recipient"
                        onChange={onChange}
                        value={credentials.recipient}
                      />
                      <span
                        class=" btn btn-md text-pink"
                        onClick={handleRecipient}
                      >
                        <UilPlusCircle size="25" />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    onClick={handleClose}
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn bg-pink text-white">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default ProductView;
