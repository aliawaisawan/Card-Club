import React from "react";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";
import { useSelector } from "react-redux";

function Main() {
  const AddressData = useSelector((state) => state.addresses.address);
  return (
    <div className="container">
      <header className="d-flex w-100 flex-row p-2">
        <nav className="d-flex w-100 flex-wrap justify-content-center justify-content-between align-items-center">
          <span>
            <p className="fs-3 fw-bold mb-0">Addresses</p>
            <p className="text-sm fw-lighter">Manage Addresses</p>
          </span>
          <span>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addressModal"
              className="btn btn-block btn-login bg-pink btn-lg text-white"
            >
              Add Address
            </button>
          </span>
        </nav>
      </header>
      <div className="row">
        {AddressData && AddressData?.length === 0 ? (
          <div className="alert alert-danger text-center text-white">
            No Address Found
          </div>
        ) : (
          AddressData &&
          AddressData.map((data, index) => (
            <AddressCard key={index} data={data} />
          ))
        )}
      </div>
      <AddressForm />
    </div>
  );
}

export default Main;
