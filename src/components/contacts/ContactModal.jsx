import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setContacts } from "../../redux/actions/Contacts";

const ProfilePicWrapper = styled.div`
  color: transparent;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  input {
    display: none;
  }

  img {
    position: absolute;
    object-fit: cover;
    width: 90px;
    height: 90px;
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35);
    border-radius: 100px;
    z-index: 0;
  }

  label {
    cursor: pointer;
    height: 90px;
    width: 90px;
  }

  &:hover {
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 10000;
      color: rgb(250, 250, 250);
      transition: background-color 0.2s ease-in-out;
      border-radius: 100px;
    }
  }

  span {
    display: inline-flex;
    padding: 0.2em;
    justify-content: center;
  }
`;

function ContactModal() {
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [credentials, setCredentials] = useState({
    name: "",
    nick_name: "",
    phone_num: "",
    email: "",
    street_address1: "",
    street_address2: "",
    address: "",
    postal_code: "",
    country: "",
    city: "",
    state: "",
    contact_img: "",
  });
  const dispatch = useDispatch();

  const imageRef = useRef();

  useEffect(() => {
    if (credentials.country && credentials.country.length > 0) {
      getState(credentials.country);
    }
  }, [credentials.country]);

  useEffect(() => {
    if (credentials.state && credentials.state.length > 0) {
      getCity(credentials.state);
    }
  }, [credentials.state]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      setCredentials({ ...credentials, [name]: value });
    } else if (name === "state") {
      setCredentials({ ...credentials, [name]: value });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
    if (name === "profile") {
      setCredentials({ ...credentials, ["contact_img"]: e.target.files[0] });
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      imageRef.current.src = imageUrl;
    }
  };

  const Countries = useSelector((state) => state.countries.countries);
  const getState = (country_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("country_id", country_id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}get-states-by-country`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })

      .then((result) => {
        setState(result);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("Error occurred while fetching states");
      });
  };
  const getCity = (state_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("state_id", state_id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}get-cities-by-state`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCity(result);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("address", credentials.address);
    formdata.append("city_id", credentials.city);
    formdata.append("contact_img", credentials.contact_img);
    formdata.append("country_id", credentials.country);
    formdata.append("email", credentials.email);
    formdata.append("name", credentials.name);
    formdata.append("nick_name", credentials.nick_name);
    formdata.append("phone_num", credentials.phone_num);
    formdata.append("postal_code", credentials.postal_code);
    formdata.append("state_id", credentials.state);
    formdata.append("street_address1", credentials.street_address1);
    formdata.append("street_address2", credentials.street_address2);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}contact-store`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          toast(result.message);
          dispatch(setContacts(result.contacts));
          setCredentials({
            name: "",
            nick_name: "",
            phone_num: "",
            email: "",
            street_address1: "",
            street_address2: "",
            address: "",
            postal_code: "",
            country: "",
            city: "",
            state: "",
            contact_img: "",
          });
        } else {
          toast("Unable to Create Contact");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const handleClose = () => {
    setCredentials({
      name: "",
      nick_name: "",
      phone_num: "",
      email: "",
      street_address1: "",
      street_address2: "",
      address: "",
      postal_code: "",
      country: "",
      city: "",
      state: "",
      contact_img: "",
    });
    imageRef.current.src = "assets/images/icons/user.png";
  };

  return (
    <div
      className="modal fade"
      id="contactModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-pink">
            <h4 className="modal-title text-white" id="exampleModalLabel">
              Add Recipient
            </h4>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <ProfilePicWrapper>
                  <label htmlFor="file">
                    <span>
                      <UilPen size="18"></UilPen>
                    </span>
                    <span>Edit</span>
                  </label>
                  <input
                    id="file"
                    onChange={onChange}
                    type="file"
                    name="profile"
                  />
                  <img
                    src="assets/images/icons/user.png"
                    ref={imageRef}
                    alt="profile"
                    width="200"
                  />
                </ProfilePicWrapper>
              </div>
              <div className="row">
                <div className="col-md-6 py-2">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      onChange={onChange}
                      value={credentials.name}
                      required
                      className="form-control form-control-md "
                      placeholder="Name..."
                    />
                  </div>
                </div>
                <div className="col-md-6 py-2">
                  <div className="form-group">
                    <input
                      type="text"
                      name="nick_name"
                      onChange={onChange}
                      value={credentials.nick_name}
                      required
                      className="form-control form-control-md "
                      placeholder="Nickname..."
                    />
                  </div>
                </div>
                <div className="col-md-12 py-2">
                  <div className="form-group">
                    <input
                      type="number"
                      name="phone_num"
                      onChange={onChange}
                      value={credentials.phone_num}
                      required
                      className="form-control form-control-md "
                      placeholder="+00 000-0000"
                    />
                  </div>
                </div>
                <div className="col-md-12 py-2">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      onChange={onChange}
                      value={credentials.email}
                      required
                      className="form-control form-control-md "
                      placeholder="Email..."
                    />
                  </div>
                </div>
                <div className="col-md-12 py-2">
                  <div className="form-group">
                    <input
                      type="text"
                      name="street_address1"
                      onChange={onChange}
                      value={credentials.street_address1}
                      required
                      className="form-control form-control-md "
                      placeholder="Street Address or PO Box"
                    />
                  </div>
                </div>
                <div className="col-md-12 py-2">
                  <div className="form-group">
                    <input
                      type="text"
                      name="street_address2"
                      onChange={onChange}
                      value={credentials.street_address2}
                      className="form-control form-control-md "
                      placeholder="Street Address or PO Box"
                    />
                  </div>
                </div>
                <div className="col-md-6 py-2">
                  <div className="form-group">
                    <input
                      type="text"
                      name="address"
                      onChange={onChange}
                      value={credentials.address}
                      className="form-control form-control-md "
                      placeholder="Company, Apartment, Floor, etc"
                    />
                  </div>
                </div>
                <div className="col-md-6 py-2">
                  <div className="form-group">
                    <input
                      type="number"
                      name="postal_code"
                      onChange={onChange}
                      value={credentials.postal_code}
                      required
                      className="form-control form-control-md "
                      placeholder="Zip/Postal code"
                    />
                  </div>
                </div>
                <div className="col-md-12 py-2">
                  <div className="form-group">
                    <select
                      id="inputCountry"
                      onChange={onChange}
                      value={credentials.country}
                      name="country"
                      className="form-select  form-select-md"
                    >
                      <option selected={true} defaultValue={""}>
                        Select Country
                      </option>
                      {Countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 py-2">
                  <div className="form-group">
                    <select
                      id="inputState"
                      name="state"
                      onChange={onChange}
                      value={credentials.state}
                      className="form-select  form-select-md"
                    >
                      <option selected={true} disabled={true} defaultValue={""}>
                        Select State
                      </option>
                      {state.map((states) => (
                        <option key={states.id} value={states.id}>
                          {states.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 py-2">
                  <div className="form-group">
                    <select
                      id="inputCity"
                      name="city"
                      onChange={onChange}
                      value={credentials.city}
                      className="form-select  form-select-md"
                    >
                      <option selected={true} disabled={true} defaultValue={""}>
                        Select City
                      </option>
                      {city.map((cities) => (
                        <option key={cities.id} value={cities.id}>
                          {cities.name}
                        </option>
                      ))}{" "}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-pink btn btn-bg btn-md"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ContactModal;
