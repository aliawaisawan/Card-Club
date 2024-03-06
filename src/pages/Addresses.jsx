import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Main from "../components/Address/Main";
import { useNavigate } from "react-router-dom";

function Addresses() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navigation />
      <Main/>
      <Footer />
    </div>
  );
}

export default Addresses;
