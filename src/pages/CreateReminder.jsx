import React from "react";
import { UilPlus } from "@iconscout/react-unicons";
import { UilPlusCircle } from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function CreateReminder() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  return (
    <section className="container py-2">
      <h4>Reminder</h4>
      <p>Create new reminder</p>
      <form action="" method="POST">
        <div className="row">
          <div className="col-md-12">
            <label className="mt-3">Title</label>
            <input
              type="text"
              name="text"
              required
              class="form-control form-control-md mb-2"
              placeholder="Mother's Birthday"
            />
          </div>
          <div className="col-md-4">
            <label className="mt-3 ">Date</label>
            <input
              type="date"
              name="date"
              required
              class="form-control form-control-md mb-2"
            />
          </div>
          <div className="col-md-4">
            <label className="mt-3">Time</label>
            <input
              type="time"
              name="time"
              required
              class="form-control form-control-md mb-2"
            />
          </div>
          <div className="col-md-12">
            <label className="mt-3 ">Relationship</label>
            <select
              id="inputState"
              name="relationship"
              class="form-select mb-3 form-select-md"
            >
              <option selected value="mother">
                Mother
              </option>
            </select>
          </div>
          <div className="card">
            <div className="card-body">
              <input class="inp w-100 mb-3" type="email" placeholder="Father" />
              <input class="inp w-100 mb-3" type="email" placeholder="Sister" />
              <div className="d-flex">
                <Link class=" btn btn-md ms-auto bg-pink" to="/">
                  <UilPlus size="20" color="black" />
                  Add relation
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-3">Add recipient</p>
        <div className="">
          <img
            height={"30px"}
            src="assets/images/icons/man.png"
            alt="Man icon"
          />
          <img
            height={"30px"}
            src="assets/images/icons/woman2.png"
            alt="woman1 icon"
          />
          <img
            height={"30px"}
            src="assets/images/icons/woman.png"
            alt="woman2 icon"
          />
          <Link class=" btn btn-md text-pink" to="/">
            <UilPlusCircle size="40" />
          </Link>
        </div>
        <div class="col-md-12 mt-3">
          <Link
            to="/"
            type="submit"
            name=""
            class="mt-3 text-white bg-pink w-100 rounded-2  btn btn-bg btn-lg"
          >
            Create Reminder
          </Link>
        </div>
      </form>
    </section>
  );
}
export default CreateReminder;
