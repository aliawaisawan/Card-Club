import React, { useRef } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {

    const sliderRef = useRef(null);
    const next = () => {
        sliderRef.current.slickNext();
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <div className="container-fluid hero px-3 px-xl-0">
                <div className="container">
                <Slider ref={sliderRef} {...settings}>
                    <div className="container p-3 p-xl-5" key={1}>
                        <div className="row" >
                            <div className="col-md-6 p-xl-5 mt-5 d-flex justify-content-center flex-column align-items-start">
                                <h2>About <span style={{ color: "white" }}>Card Club</span> and Our Mission Behind Everything We Do</h2>
                                <p>CardClub is a factory direct supplier and manufacturer. We strive to give the best customer service.</p>
                                <button className="button-hero mt-xl-auto mt-5" onClick={next}>
                                    Next
                                </button>
                            </div>
                            <div className="col-md-6 mt-5 mt-xl-0">
                                <img alt="Gift Boxes" className="w-100 mt-5 ms-xl-5" src="assets/images/products/hero-img.png" />
                            </div>
                        </div>
                    </div>
                    <div className="container p-3 p-xl-5" key={1}>
                        <div className="row" >
                            <div className="col-md-6 p-xl-5 mt-5 d-flex justify-content-center flex-column align-items-start">
                                <h2>About <span style={{ color: "white" }}>Card Club</span> and Our Mission Behind Everything We Do</h2>
                                <p>CardClub is a factory direct supplier and manufacturer. We strive to give the best customer service.</p>
                                <button className="button-hero mt-xl-auto mt-5 mx-xl-0" onClick={next}>
                                    Next
                                </button>
                            </div>
                            <div className="col-md-6 mt-5 mt-xl-0">
                                <img alt='Gift Boxes' className="w-100 mt-5 ms-xl-5" src="assets/images/products/hero-img.png" />
                            </div>
                        </div>
                    </div>
                    <div className="container p-3 p-xl-5" key={1}>
                        <div className="row" >
                            <div className="col-md-6 p-xl-5 mt-5 d-flex justify-content-center flex-column align-items-start">
                                <h2>About <span style={{ color: "white" }}>Card Club</span> and Our Mission Behind Everything We Do</h2>
                                <p>CardClub is a factory direct supplier and manufacturer. We strive to give the best customer service.</p>
                                <button className="button-hero mt-xl-auto mt-5" onClick={next}>
                                    Next
                                </button>
                            </div>
                            <div className="col-md-6 mt-5 mt-xl-0">
                                <img alt='Gift Boxes' className="w-100 mt-5 ms-xl-5" src="assets/images/products/hero-img.png" />
                            </div>
                        </div>
                    </div>
                </Slider>
                <div className='mt-5 py-5' style={{ textAlign: "center" }}>

                </div>
                </div>
            </div>
        </>
    )
}

export default Hero
