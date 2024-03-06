import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setAddress } from "../../redux/actions/Address";

function AddressForm() {
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [credentials, setCredentials] = useState({
    street_address1: "",
    street_address2: "",
    address_name: "",
    postal_code: "",
    country: "",
    city: "",
    state: "",
  });
  const dispatch = useDispatch();

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
        console.log("Response Status: ", response.status);
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
    formdata.append("address_name", credentials.address_name);
    formdata.append("city_id", credentials.city);
    formdata.append("country_id", credentials.country);
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

    fetch(`${process.env.REACT_APP_API_URL}addAddress`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          toast(result.message);
          dispatch(setAddress(result.address));
          setCredentials({
            street_address1: "",
            street_address2: "",
            address_name: "",
            postal_code: "",
            country: "",
            city: "",
            state: "",
          });
        } else {
          toast("Unable to Add Address");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const handleClose = () => {
    setCredentials({
      street_address1: "",
      street_address2: "",
      address_name: "",
      postal_code: "",
      country: "",
      city: "",
      state: "",
    });
  };

  return (
    <div
      className="modal fade"
      id="addressModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-pink">
            <h4 className="modal-title text-white" id="exampleModalLabel">
              Add Address
            </h4>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 py-2">
                  <div className="form-group">
                    <input
                      type="text"
                      name="address_name"
                      onChange={onChange}
                      value={credentials.address_name}
                      required
                      className="form-control form-control-md "
                      placeholder="Address Name"
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
                      placeholder="Street Address or B.0. Box"
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
                      required
                      className="form-control form-control-md "
                      placeholder="Street Address or B.0. Box"
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
                      value={credentials.country}
                      name="country"
                      onChange={onChange}
                      className="form-select p-2"
                      aria-label="Default select example"
                    >
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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

export default AddressForm;
