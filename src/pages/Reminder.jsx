import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Calender from "../components/Reminder/Calender";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import ShowReminders from "../components/Reminder/ShowReminders";
import { useDispatch, useSelector } from "react-redux";
import { setReminder } from "../redux/actions/Reminder";
import { useNavigate } from "react-router";
import { UilPlusCircle } from "@iconscout/react-unicons";

function Reminder() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  const now = moment();
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const events = useSelector((state) => state.reminderlist.reminder);
  console.log(events);
  // const [events, setEvents] = useState([
  //     // {
  //     //     date: credentials.date,
  //     //     id: '61406f46-2c3d-444e-bb79-1f1930653823',
  //     //     startDate: new Date(`${credentials.date} ${credentials.time}`),
  //     //     title: credentials.title,
  //     // },
  //     // {
  //     //     date: credentials.date,
  //     //     id: '61406f46-2c3d-444e-bb79-1f1930653823',
  //     //     startDate: new Date(`${credentials.date} ${credentials.time}`),
  //     //     title: credentials.title,
  //     // }
  // ]);

  useEffect(() => {
    getAllReminders();
  }, []);

  function getDate(date) {
    setCurrentDate(new Date(date));
  }

  const getAllReminders = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}reminder`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setReminder(result.reminders));
      })
      .catch((error) => console.log("error", error));
  };
  const [credentials, setCredentials] = useState({
    title: "",
    datetime: "",
    relationship: "",
    recipient: "",
  });
  const [show, setShow] = useState(false);

  const handleEvents = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("title", credentials.title);
    formdata.append("date_time", credentials.datetime);
    formdata.append("relation_ids", credentials.relationship);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://www.cardclubapp.com/api/create_reminder", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          toast(result.message);
          setShow(false);
          setCredentials({
            title: "",
            datetime: "",
            relationship: "",
            recipient: "",
          });
        } else {
          toast("Unable to Create Reminder");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRecipient = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var formdata = new FormData();
    formdata.append("title", credentials.recipient);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}create_relation`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          toast(result.message);
          getRelation();
          credentials.recipient = "";
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getRelation();
  }, []);

  const [relation, setRelation] = useState([]);

  const getRelation = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${
        process.env.REACT_APP_API_URL
      }get-relation-by-id/${localStorage.getItem("id")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setRelation(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Navigation />
      <div className="container">
        <header className="d-flex w-100 flex-row p-2">
          <nav className="d-flex w-100 flex-wrap justify-content-center justify-content-xl-between align-items-center">
            <span>
              <p className="fs-3 fw-bold mb-0">{now.format("MMMM")}</p>
              <p className="text-sm fw-lighter">{`${now.format(
                "dddd"
              )} - ${now.format("MMMM")} ${now.format("DD")} - ${now.format(
                "YYYY"
              )}`}</p>
            </span>
          </nav>
        </header>
        <div className="row">
          <div className="col-md-6">
            <Calender getDate={getDate} />
            <ShowReminders events={events} />
          </div>
          <div className="col-md-6">
            <form onSubmit={handleEvents}>
              <div className="bg-pink text-center rounded">
                <h4 className="p-2 text-white">Create New Reminder</h4>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="mt-3">Title</label>
                  <input
                    type="text"
                    onChange={onChange}
                    value={credentials.title}
                    name="title"
                    required
                    class="form-control form-control-md mb-2"
                    placeholder="Mother's Birthday"
                  />
                </div>
                <div className="col-md-12">
                  <label className="mt-3 ">Date & Time</label>
                  <input
                    type="datetime-local"
                    name="datetime"
                    onChange={onChange}
                    value={credentials.datetime}
                    required
                    class="form-control form-control-md mb-2"
                  />
                </div>
                <div className="col-md-12">
                  <label className="mt-3 ">Relationship</label>
                  <select
                    type="text"
                    name="relationship"
                    onChange={onChange}
                    value={credentials.relationship}
                    required
                    className="form-control form-control-md mb-2"
                  >
                    <option value="" disabled>
                      Select Relation
                    </option>
                    {relation.map((relate) => (
                      <option value={relate.id}>{relate.title}</option>
                    ))}
                  </select>
                </div>
                <p className="pt-3">Add Relation</p>
                <div className="d-flex justify-content-between">
                  <input
                    type="text"
                    className="form-control"
                    name="recipient"
                    onChange={onChange}
                    value={credentials.recipient}
                  />
                  <span class=" btn btn-md text-pink" onClick={handleRecipient}>
                    <UilPlusCircle size="25" />
                  </span>
                </div>
              </div>
              <div className="mt-3 d-flex  justify-content-center">
                <button type="submit" class="btn btn-lg bg-pink text-white">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default Reminder;
