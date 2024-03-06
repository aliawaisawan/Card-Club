import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Contact() {
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
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
      formdata.append("first_name", credentials.first_name);
      formdata.append("last_name", credentials.last_name);
      formdata.append("phone", credentials.phone);
      formdata.append("email", credentials.email);
      formdata.append("subject", credentials.subject);
      formdata.append("message", credentials.message);


      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_API_URL}support-store`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 200) {
            toast("Query Submitted !");
            setCredentials({
              first_name: "",
              last_name: "",
              phone: "",
              email: "",
              subject: "",
              message: "",
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
    <div className="container">
      <div className="col-md-6 mx-auto mt-5">
        <div className="card shadow bg-white rounded-5">
          <div className="card-body">
            <h3 className="text-center mb-3">Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 py-2">
                  <div className="form-group">
                    <input
                      type="text"
                      name="first_name"
                      required
                      value={credentials.first_name}
                      onChange={onChange}
                      className="form-control form-control-md "
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="col-md-6 py-2">
                  <div className="form-group">
                    <input
                      type="text"
                      name="last_name"
                      required
                      value={credentials.last_name}
                      onChange={onChange}
                      className="form-control form-control-md"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="col-md-6 py-2">
                  <div className="form-group">
                    <input
                      type="number"
                      name="phone"
                      value={credentials.phone}
                      onChange={onChange}
                      required
                      className="form-control form-control-md "
                      placeholder="+92 000-000-0000"
                    />
                  </div>
                </div>
                <div className="col-md-6 py-2">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      required
                      value={credentials.email}
                      onChange={onChange}
                      className="form-control form-control-md"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-md-12 py-2">
                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      value={credentials.subject}
                      onChange={onChange}
                      required
                      className="form-control form-control-md "
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div className="col-md-12 py-2">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      required
                      value={credentials.message}
                      onChange={onChange}
                      name="message"
                      style={{ height: "100px" }}
                      placeholder="Leave a comment here"
                      id="floatingTextarea"
                    ></textarea>
                    <label for="floatingTextarea">Message</label>
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <button
                    type="submit"
                    className="text-white bg-pink w-100 mt-3 rounded-2 btn btn-bg btn-md"
                  >
                    Send Message
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

export default Contact;
