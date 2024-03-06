import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Main from '../components/CustomizeCard/Main'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CustomizeCard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  return (
    <>
        <Navigation/>
        <Main/>
        <Footer/>
    </>
  )
}

export default CustomizeCard
