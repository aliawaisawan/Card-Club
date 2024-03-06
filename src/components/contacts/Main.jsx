import React from "react";
import ContactCards from "./ContactCards";
import ContactModal from "./ContactModal";
import { useSelector } from "react-redux";

function Main() {
  const contacts = useSelector((state) => state.contactslist.contacts);
  return (
    <div className="container">
      <header className="d-flex w-100 flex-row p-2">
        <nav className="d-flex w-100 flex-wrap justify-content-center justify-content-between align-items-center">
          <span>
            <p className="fs-3 fw-bold mb-0">Recipients</p>
            <p className="text-sm fw-lighter">Manage Recipients</p>
          </span>
          <span>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#contactModal"
              data-whatever="@mdo"
              className="btn btn-block btn-login bg-pink btn-lg text-white"
            >
              Add Recipients
            </button>
          </span>
        </nav>
      </header>
      <div className="row">
        {contacts?.length === 0 ? (
          <div className="alert alert-danger text-center text-white">
            No Recipients Found
          </div>
        ) : (
          contacts &&
          contacts.map((contact, index) => (
            <ContactCards key={index} contact={contact} />
          ))
        )}
      </div>
      <ContactModal />
    </div>
  );
}

export default Main;
