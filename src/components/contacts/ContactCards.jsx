import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { setContacts } from "../../redux/actions/Contacts";
import { useDispatch } from "react-redux";

function ContactCards({ contact }) {
  const dispatch = useDispatch();

  const handleDeleteContact = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}deleteContact`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          toast(result.message);
          dispatch(setContacts(result.contacts));
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div class="col-md-6 my-2">
      <div class="contactcard green">
        <div class="additional">
          <div className="text-center mt-5 pt-3">
            {contact?.image_path === null ? (
              <img
                src="assets/images/icons/user.png"
                className="rounded-circle"
                alt="profile"
                height={100}
                width={100}
              />
            ) : (
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}${contact?.image_path}`}
                className="rounded-circle"
                alt="profile"
                height={100}
                width={100}
              />
            )}
            <h4 className="text-center mt-1">{contact?.name}</h4>
            <button
              className="btn btn-block btn-light"
              onClick={() => {
                handleDeleteContact(contact?.id);
              }}
            >
              <UilTrashAlt size="22" color="black" />
            </button>
          </div>
        </div>
        <div class="general">
          <h5 className="text-center mt-5">Recipient Details</h5>
          <p className="m-0">Nick Name: {contact?.nick_name}</p>
          <p className="m-0">Email: {contact?.email}</p>
          <p className="m-0">Ph No: {contact?.phone_num}</p>
          <p className="m-0">Address 1: {contact?.street_address1}</p>
          <p className="m-0">Address 2: {contact?.street_address2}</p>
          <p className="m-0">Zip Code: {contact?.postal_code}</p>
          {/* <p className="m-0">Country: {contact?.country?.country_name}</p>
          <p className="m-0">State: {contact?.state?.state_name}</p>
          <p className="m-0">City: {contact?.city?.city_name}</p> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ContactCards;
