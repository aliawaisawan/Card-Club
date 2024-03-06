import React from "react";
import Navigation from "../components/Navigation";
import ProductView from "../components/ProductView/ProductView";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function ViewCard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navigation />
      <ProductView show={'cards'}/>
      <Footer />
    </>
  );
}

export default ViewCard;
