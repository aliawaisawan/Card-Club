import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddressForm from "../components/Address/AddressForm";
import StripeModel from "../components/CheckoutCard/StripeModel";
import { ToastContainer } from "react-toastify";

function CheckoutCard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  const params = useParams();
  const addresses = useSelector((state) => state.addresses.address);
  const [data, setData] = useState({});
  const [openStripeModel, setOpenStripeModel] = useState(false);
  const [credentials, setCredentials] = useState({
    address: "",
    ordertype: "",
  });

  const onChange = (e) => {
    if (e.target.name === "ordertype" && e.target.value === "digital") {
      setCredentials({...credentials, address: "", [e.target.name]: e.target.value })
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}searchCardById/${params.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [params.id]);

  return (
    <>
      <div className="checkout container pt-3 mt-md-5 mt-3">
        <Link className="d-flex justify-content-center ms-5" to="/">
          <img width="80x" src="/assets/images/logo.png" alt="Logo" />
        </Link>
        <section className="py-3">
          <div className="container px-4 px-lg-5">
            <div className="row">
              <div className="col-md-8 offset-md-2 mb-4 mt-3 mt-md-0">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="mb-1">Checkout</h4>
                  <span className="badge badge-secondary badge-pill">3</span>
                </h4>
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div className="d-flex">
                      <img
                        className="img img-responsive rounded"
                        width={50}
                        height={50}
                        src={`${process.env.REACT_APP_IMAGE_URL}${
                          data && data.image_path
                        }`}
                        alt="Product Image"
                      />
                      <h6 className="my-0 ms-2 my-auto">
                        {data && data.title}
                      </h6>
                      <small className="text-muted my-auto ms-1">
                        x{data?.quantity}
                      </small>
                    </div>
                    <span className="text-muted mt-2">
                      ${data && data.price}
                    </span>
                  </li>
                  <br />
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Subtotal (USD)</span>
                    <p>${data && data.price}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Shipping Fee (USD)</span>
                    <p>${20}</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${data && data.price + 20}</strong>
                  </li>
                </ul>
                {
                  credentials.ordertype === "physical" ? <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Select Address
                  </label>
                  <select
                    name="address"
                    value={credentials.address}
                    onChange={onChange}
                    className="form-control"
                  >
                    <option value="" disabled>
                      Select Address
                    </option>
                    {addresses &&
                      addresses.map((data, index) => (
                        <option key={index} value={data?.id}>
                          {data?.address_name}
                        </option>
                      ))}
                  </select>
                  <div className="text-center pt-1">
                    <small className="text-center">OR</small>
                  </div>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#addressModal"
                    className="btn btn-block btn-login bg-pink w-100 mt-2 text-white"
                  >
                    Add Address
                  </button>
                </div> : ""
                }
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Select Type
                  </label>
                  <select
                    name="ordertype"
                    value={credentials.ordertype}
                    onChange={onChange}
                    className="form-control"
                  >
                    <option value="" disabled>
                      Card Type
                    </option>
                    <option value="physical">Physical</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>
                {
                  (credentials.ordertype === "digital" || (credentials.ordertype === "physical" && credentials.address !== "")) ? <div className="d-block text-center">
                  <button
                    className="btn btn-success btn-lg"
                    onClick={() => setOpenStripeModel(true)}
                  >
                    Pay with Stripe
                  </button>
                </div> : ""
                }
              </div>
            </div>
          </div>
        </section>
        <AddressForm />
      </div>
      <StripeModel
        addressId={credentials.address}
        isOpen={openStripeModel}
        onClose={() => setOpenStripeModel(false)}
        ordertype={credentials.ordertype}
      />
      <ToastContainer />
    </>
  );
}

export default CheckoutCard;
