import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Contact from "../components/ContactUs/Contact";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Contactus() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navigation />
      <Contact/>
      <Footer />
    </>
  )
}

export default Contactus
