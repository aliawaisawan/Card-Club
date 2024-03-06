import React from "react";
import Navigation from "../components/Navigation";
import CartList from "../components/CartList";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Cart() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navigation />
      <h3 className="text-center my-3">Cart Items</h3>
      <CartList/>
      <Footer />
    </>
  );
}

export default Cart;
