import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UilEnvelope, UilAsterisk } from "@iconscout/react-unicons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/common/Loader";
import { setWishlist } from "../redux/actions/Wishlist";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/userProfile";
import { setCountries } from "../redux/actions/Countries";
import { setCards } from "../redux/actions/Cards";
import { setGifts } from "../redux/actions/Gifts";
import { setGiftProduct } from "../redux/actions/GiftProduct";
import { setCardProduct } from "../redux/actions/CardProduct";
import { setCart } from "../redux/actions/Cart";
import { setReminder } from "../redux/actions/Reminder";
import { setContacts } from "../redux/actions/Contacts";
import { setAddress } from "../redux/actions/Address";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }, []);

  const [loader, setLoader] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    if (
      credentials.email.length === 0 ||
      credentials.password.length === 0 ||
      credentials.password.length < 6
    ) {
      toast("Entered Email or Password is Invalid");
      setLoader(false);
      return;
    }

    try {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/ecmascript");

      var formdata = new FormData();
      formdata.append("email", credentials.email);
      formdata.append("password", credentials.password);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_API_URL}auth/login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "Login successful") {
            console.log(result)
            toast(result.message);
            setLoader(false);
            localStorage.setItem("user", result.token);
            localStorage.setItem("id", result.user);
            //dispatch user
            getUserData(result.token, result.user);
            //dispatch countries
            getCountries(result.token);
            //dispatch card categories
            getCardCats(result.token);
            //dispatch gift categories
            getGiftCats(result.token);
            //dispatch gift product
            getGiftProduct(result.token);
            //dispatch card product
            getCardProduct(result.token);
            //dispatch wishlist
            getUserWishlist(result.token, result.user);
            // dispatch cartItem
            getCartItem(result.token);
            // dispatch Reminders
            getAllReminders(result.token);
            // dispatch contacts
            getContacts(result.token);
            // dispatch addresses
            getAddresses(result.token);
            setCredentials({
              email: "",
              password: "",
            });
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          } else {
            toast(result.message);
            setLoader(false);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserWishlist = (token, id) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}get-wishlist-by-id/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(setWishlist(result.wishlist));
      })
      .catch((error) => console.log("error", error));
  };

  const getUserData = (user, id) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + user);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}getUserById/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setUser(result.data));
      })
      .catch((error) => console.log("error", error));
  };

  const getCountries = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}get-countries`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setCountries(result));
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getCardCats = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}card_cat`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setCards(result.data));
      })
      .catch((error) => console.log("error", error));
  };

  const getGiftCats = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}gift_cat`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setGifts(result.data));
      })
      .catch((error) => console.log("error", error));
  };

  const getGiftProduct = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}all/gifts`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setGiftProduct(result.data));
      })
      .catch((error) => console.log("error", error));
  };

  const getCardProduct = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}all/cards`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setCardProduct(result.data));
      })
      .catch((error) => console.log("error", error));
  };

  const getCartItem = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

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

  const getAllReminders = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}reminder`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setReminder(result.reminders));
      })
      .catch((error) => console.log("error", error));
  };

  const getContacts = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}contacts`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setContacts(result.contacts));
      })
      .catch((error) => console.log("error", error));
  };

  const getAddresses = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}address`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setAddress(result.address));
      })
      .catch((error) => console.log("error", error));
  };

  const onLoginWithFacebook = async (data) => {
    console.log(data)
    try {
      const res = await axios.post("https://api.cardclubapp.com/api/register-user", {
        login_povider_type: 'facebook',
        name: data.name,
        login_provider_id: data.id,
        phone_num: '0000000000',
        email: "",
        password: "123"
      }, {
        headers: { 
          'Content-Type' : 'application/json'
        }
      })

      if (res.status === 200) {
        toast("Login successfully");

        console.log(res.data)
        
        localStorage.setItem("user", res.data.token);
        localStorage.setItem("id", res.data.user);
        //dispatch user
        getUserData(res.data.token, res.data.user);
        //dispatch countries
        getCountries(res.data.token);
        //dispatch card categories
        getCardCats(res.data.token);
        //dispatch gift categories
        getGiftCats(res.data.token);
        //dispatch gift product
        getGiftProduct(res.data.token);
        //dispatch card product
        getCardProduct(res.data.token);
        //dispatch wishlist
        getUserWishlist(res.data.token, res.data.user);
        // dispatch cartItem
        getCartItem(res.data.token);
        // dispatch Reminders
        getAllReminders(res.data.token);
        // dispatch contacts
        getContacts(res.data.token);
        // dispatch addresses
        getAddresses(res.data.token);
        
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        toast("Failed to login please try again");
      }
    } catch(err) {
      toast("Failed to login please try again");
    }
  };

  const onLoginWithGoogle = async (data) => {
    console.log(data)
    try {
      const res = await axios.post("https://api.cardclubapp.com/api/register-user", {
        login_povider_type: 'google',
        name: data.name,
        login_provider_id: data.sub,
        phone_num: '0000000000',
        email: "",
        password: "123"
      }, {
        headers: { 
          'Content-Type' : 'application/json'
        }
      })

      if (res.status === 200) {
        toast("Login successfully");

        console.log(res.data)
        
        localStorage.setItem("user", res.data.token);
        localStorage.setItem("id", res.data.user);
        //dispatch user
        getUserData(res.data.token, res.data.user);
        //dispatch countries
        getCountries(res.data.token);
        //dispatch card categories
        getCardCats(res.data.token);
        //dispatch gift categories
        getGiftCats(res.data.token);
        //dispatch gift product
        getGiftProduct(res.data.token);
        //dispatch card product
        getCardProduct(res.data.token);
        //dispatch wishlist
        getUserWishlist(res.data.token, res.data.user);
        // dispatch cartItem
        getCartItem(res.data.token);
        // dispatch Reminders
        getAllReminders(res.data.token);
        // dispatch contacts
        getContacts(res.data.token);
        // dispatch addresses
        getAddresses(res.data.token);
        
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        toast("Failed to login please try again");
      }
    } catch(err) {
      toast("Failed to login please try again");
    }
  };

  return (
    <div className="full-content position-relative">
      <Link to="/">
        <img
          className="position-absolute login-logo"
          src="assets/images/logo.png"
          alt="logo"
        />
      </Link>
      <div className="row full-content w-100 m-0 p-0">
        <div style={{ backgroundColor: "#f4f5f7" }} className="col-md-6 p-xl-5">
          <div className="px-5 ">
            <img
              className="w-100"
              src="assets/images/illustrations/login.png"
              alt="Character holding cards"
            />
            <h2>Hi, Nice to Meet You!</h2>
            <p className="w-75">
              Let's create an account for you. If you already have an account
              then please Sign In.
            </p>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column mt-md-0 mt-5 flex-wrap">
          <div className="my-auto mx-auto">
            <h2>Welcome back!</h2>
            <p>Start managing your orders, faster and better</p>
            <form className="d-flex flex-column my-3" onSubmit={handleSubmit}>
              <div className="icon-box">
                <UilEnvelope className="icon-input" size="25" color="black" />
                <input
                  className="my-3 p-2 ps-5 login-input w-100"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={onChange}
                  value={credentials.email}
                />
              </div>
              <div className="icon-box">
                <UilAsterisk className="icon-input-2" size="25" color="black" />
                <input
                  className="p-2 ps-5 login-input w-100"
                  type="password"
                  name="password"
                  placeholder="At least 8 characters"
                  onChange={onChange}
                  value={credentials.password}
                />
              </div>
              <Link
                to="/forget"
                className="text-danger my-2 align-self-end fw-bold"
              >
                Forgot password?
              </Link>
              <button type="submit" className="btn btn-lg rounded-0 login-btn">
                {loader === false ? "Login" : <Loader />}
              </button>
            </form>
            <div style={{
              position: "relative",
              padding: "10px 0",
            }}>
              <span style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                zIndex: "2",
                padding: "0 1rem"
              }}>OR</span>
              <hr />
            </div>
            <LoginSocialGoogle
              client_id={process.env.REACT_APP_GG_APP_ID || ""}
              redirect_uri={process.env.REDIRECT_URI || ""}
              onResolve={({ provider, data }) => {
                onLoginWithGoogle(data)
                // setProvider(provider);
                // setProfile(data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <GoogleLoginButton
                style={{
                  margin: "0 0 1rem",
                  width: "100%",
                }}
              />
            </LoginSocialGoogle>
            <LoginSocialFacebook
              appId={process.env.REACT_APP_FB_APP_ID || ""}
              redirect_uri={process.env.REDIRECT_URI || ""}
              onResolve={({ provider, data }) => {
                console.log(data, provider);
                onLoginWithFacebook(data)
                // setProvider(provider);
                // setProfile(data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <FacebookLoginButton
                style={{
                  margin: "0 0 1rem",
                  width: "100%",
                }}
              />
            </LoginSocialFacebook>

            <p className="text-center my-3">
              Don't Have an account?{" "}
              <Link
                style={{ textDecoration: "none" }}
                to="/signup"
                className="text-black fw-bold"
              >
                Sign up
              </Link>
            </p>
            <p className="text-center mt-5">
              Copyright © 2023. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
