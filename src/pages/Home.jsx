import React, { useEffect } from "react";
import Hero from "../components/Home/Hero";
import Cards from "../components/Home/Cards";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/actions/userProfile";
import { useDispatch } from "react-redux";
import { setCountries } from "../redux/actions/Countries";
import { setCards } from "../redux/actions/Cards";
import { setGifts } from "../redux/actions/Gifts";
import { setCardProduct } from "../redux/actions/CardProduct";
import { setGiftProduct } from "../redux/actions/GiftProduct";
import { setWishlist } from "../redux/actions/Wishlist";
import { setCart } from "../redux/actions/Cart";
import { setReminder } from "../redux/actions/Reminder";
import { setContacts } from "../redux/actions/Contacts";
import { setAddress } from "../redux/actions/Address";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    //dispatch user
    getUserData();
    //dispatch countries
    getCountries();
    //dispatch card categories
    getCardCats();
    //dispatch gift categories
    getGiftCats();
    //dispatch gift product
    getGiftProduct();
    //dispatch card product
    getCardProduct();
    //dispatch wishlist
    getUserWishlist();
    // dispatch cartItem
    getCartItem();
    //dispatch reminders
    getAllReminders();
    //dispatch contacts
    getContacts();
    //dispatch address
    getAddresses();
  }, []);

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

  const getUserData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}getUserById/${localStorage.getItem(
        "id"
      )}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(setUser(result.data));
      })
      .catch((error) => console.log("error", error));
  };

  const getCountries = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}get-countries`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setCountries(result));
      })
      .catch((error) => console.log("error", error));
  };

  const getCardCats = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

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

  const getGiftCats = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

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

  const getGiftProduct = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

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

  const getCardProduct = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

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

  const getCartItem = () => {
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

  const getAllReminders = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

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

  const getContacts = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));
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

  const getAddresses = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));
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

  return (
    <>
      <Navigation />
      <Hero />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
