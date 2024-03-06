import React from "react";
import { UilMapPinAlt } from "@iconscout/react-unicons";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { setAddress } from "../../redux/actions/Address";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";

function AddressCards({ data }) {
  const dispatch = useDispatch();
  const handleDeleteaddress = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}deleteAddress/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          toast(result.message);
          dispatch(setAddress(result.address));
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div class="col-md-6 my-2">
      <div class="contactcard green">
        <div class="additional">
          <div className="text-center mt-5 pt-3">
            <UilMapPinAlt size="48"></UilMapPinAlt>
            <h4 className="text-center mt-1">{data?.address_name}</h4>
            <button
              className="btn btn-block btn-light"
              onClick={() => {
                handleDeleteaddress(data?.id);
              }}
            >
              <UilTrashAlt size="22" color="black" />
            </button>
          </div>
        </div>
        <div class="general">
          <h5 className="text-center mt-5">Address Information</h5>

          <p className="m-0">Address 1: {data?.street_address1}</p>
          <p className="m-0">Address 2: {data?.street_address2}</p>
          <p className="m-0">Zip Code: {data?.postal_code}</p>
          {/* <p className="m-0">Country: {data?.country?.country_name}</p>
          <p className="m-0">State: {data?.state?.state_name}</p>
          <p className="m-0">City: {data?.city?.city_name}</p> */}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default AddressCards;
