import React from "react";
import { Link } from "react-router-dom";
import ProductCards from "../Product/ProductCards";

export default function Cards() {
  return (
    <>
      <div className="container text-center mt-5 p-5">
        <h2 className="mt-3">
          About <span style={{ color: "#F2CFD4" }}>Card Club</span> and Our
          Mission
          <br className="d-none d-xl-block" /> Behind Everything We Do
        </h2>
        <p className="mt-3">
          CardClub is a factory direct supplier and manufacturer. We strive to
          give the best customer
          <br className="d-none d-xl-block" /> service, fast delivery and high
          levels of on hand inventory in the business. CardClub accepts
          <br className="d-none d-xl-block" /> phone, fax, and online ordering.
        </p>
        <Link className="my-4 read-more">
          <span className="pink-ul">Read</span> More
        </Link>
      </div>
      <div className="container">
        <ProductCards type={"cards"} from={"home"} />
        {/* <div className="row">
                    <div className="col-md-4 mt-5 text-center">
                        <div className="p-5 bg-design mb-3" style={{ position: 'relative' }}>
                            <img className="p-4" width="100%" src="assets/images/products/product-one.png" alt="Gift Box" />
                            <Link to='/'><UilSearch className="d-block" size="35" color="rgba(0, 0, 0, 0.65)"
                            style={{ position: 'absolute', top: '15px', right: '10px', backgroundColor: 'white',padding: '8px' }} /></Link>
                            <Link to='/'><UilShoppingBag className="d-block" size="35" color="rgba(0, 0, 0, 0.65)"
                            style={{ position: 'absolute', top: '60px', right: '10px',backgroundColor: 'white',padding: '8px' }} /></Link>
                        </div>
                        <h5>EGIFT CARD</h5>
                        <p style={{ color: "#8e8e8e" }} className="mx-4">Beautiful Customizable Digital eGift Cards For Your Friends</p>
                    </div>
                    <div className="col-md-4 mt-5 text-center">
                        <div className="p-5 bg-design mb-3">
                            <img className="p-4" width="100%" src="assets/images/products/product-two.png" alt="Gift Box" />
                        </div>
                        <h5>EGIFT CARD</h5>
                        <p style={{ color: "#8e8e8e" }} className="mx-4">Beautiful Customizable Digital eGift Cards For Your Friends</p>
                    </div>
                    <div className="col-md-4 mt-5 text-center">
                        <div className="p-5 bg-design mb-3">
                            <img className="p-4" width="100%" src="assets/images/products/product-one.png" alt="Gift Box" />
                        </div>
                        <h5>EGIFT CARD</h5>
                        <p style={{ color: "#8e8e8e" }} className="mx-4">Beautiful Customizable Digital eGift Cards For Your Friends</p>
                    </div>
                    <div className="col-md-4 mt-5 text-center">
                        <div className="p-5 bg-design mb-3">
                            <img className="p-4" width="100%" src="assets/images/products/product-two.png" alt="Gift Box" />
                        </div>
                        <h5>EGIFT CARD</h5>
                        <p style={{ color: "#8e8e8e" }} className="mx-4">Beautiful Customizable Digital eGift Cards For Your Friends</p>
                    </div>
                    <div className="col-md-4 mt-5 text-center">
                        <div className="p-5 bg-design mb-3">
                            <img className="p-4" width="100%" src="assets/images/products/product-one.png" alt="Gift Box" />
                        </div>
                        <h5>EGIFT CARD</h5>
                        <p style={{ color: "#8e8e8e" }} className="mx-4">Beautiful Customizable Digital eGift Cards For Your Friends</p>
                    </div>
                    <div className="col-md-4 mt-5 text-center">
                        <div className="p-5 bg-design mb-3">
                            <img className="p-4" width="100%" src="assets/images/products/product-two.png" alt="Gift Box" />
                        </div>
                        <h5>EGIFT CARD</h5>
                        <p style={{ color: "#8e8e8e" }} className="mx-4">Beautiful Customizable Digital eGift Cards For Your Friends</p>
                    </div>

                </div> */}
      </div>
    </>
  );
}
