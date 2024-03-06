import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CardList from "../components/CardList";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function WishList() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navigation />
      <h3 className="text-center my-3">Wishlist</h3>
      <CardList />
      <Footer />
    </>
  );
}

export default WishList;
