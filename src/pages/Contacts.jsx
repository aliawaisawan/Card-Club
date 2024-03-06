import React from "react";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Main from "../components/contacts/Main";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Contacts() {
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

export default Contacts;
