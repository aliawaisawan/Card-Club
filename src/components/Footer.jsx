import React, { useState } from "react";
import { UilEnvelope } from "@iconscout/react-unicons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const [credentials, setCredentials] = useState({
    email: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/ecmascript");

      var formdata = new FormData();
      formdata.append("email", credentials.email);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_API_URL}newsletter-store`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 200) {
            toast(result.message);
            setCredentials({
              email: "",
            });
          } else {
            toast("Internal Server Error");
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="mt-5">
      <div className="container foot py-5">
        <div className="row">
          <div className="col-12 col-md-3 border-right">
            <ul style={{ listStyle: "none", lineHeight: "35px" }}>
              <li className="fw-bold">Navigate</li>
              <li ><Link className="text-decoration-none text-black" to={'/gifts'}>Shop Gift</Link></li>
              <li ><Link className="text-decoration-none text-black" to={'/cards'}>Shop Card</Link></li>
              <li ><Link className="text-decoration-none text-black" to={'/profile'}>Profile</Link></li>
              <li ><Link className="text-decoration-none text-black" to={'/Contactus'}>Contact</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-3 border-right">
            <ul style={{ listStyle: "none", lineHeight: "35px" }}>
              <li className="fw-bold">Social Links</li>
              <li ><Link className="text-decoration-none text-black" to={'https://twitter.com'} target="_blank">Twitter</Link></li>
              <li ><Link className="text-decoration-none text-black" to={'https://facebook.com'} target="_blank" >Facebook</Link></li>
              <li ><Link className="text-decoration-none text-black" to={'https://instagram.com'} target="_blank" >Instagram</Link></li>
              <li ><Link className="text-decoration-none text-black" to={'https://pinterest.com'} target="_blank" >Pinterest</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-3 border-right">
            <ul style={{ listStyle: "none", lineHeight: "35px" }}>
              <li className="fw-bold">Fine Print</li>
              <li>All rights reserved</li>
              <li>@2023 CardClub</li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <ul style={{ listStyle: "none", lineHeight: "35px" }}>
              <li className="fw-bold">About CardClub</li>
              <li>
                Subscribe to get more discounts, offers, and stay updated!
              </li>
              <li>@2023 CardClub</li>
              <li>
                <div className="d-flex justify-content-start flex-nowrap">
                  <form onSubmit={handleSubmit}>
                    <input
                      className="email-border email-input"
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email"
                      value={credentials.email}
                      onChange={onChange}
                    />
                    <button className="btn">
                      <UilEnvelope
                        className="email-border mt-2 ms-3"
                        color="black"
                        size="30"
                      />
                    </button>
                  </form>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container pb-0 mb-0">
        <div className="row pb-0 mb-0">
          <div className="col-md-4 d-flex justify-content-center justify-content-xl-end pt-3">
            <p>Copyright © 2023. All Right Reserved</p>
          </div>
          <div className="col-md-8 py-3 d-flex justify-content-center justify-content-xl-end m-0 p-0">
            <img
              className="w-50 d-none d-xl-block"
              src="/assets/images/icons/payments.png"
              alt="Payment Methods"
            />
            <img
              className="w-100 d-block d-xl-none"
              src="/assets/images/icons/payments.png"
              alt="Payment Methods"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
