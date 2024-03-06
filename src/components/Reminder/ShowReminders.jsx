import React from "react";
import { UilCalender } from "@iconscout/react-unicons";
import moment from "moment";

function ShowReminders({ events }) {
  return (
    <div className="mt-3 d-flex w-100 flex-column card event-card">
      <div className="card-body">
        <h5 className="mt-2 fw-bold ms-3">Reminders</h5>
        {events?.length ? (
          events.map((event) => (
            <article
              className="d-flex w-100 flex-column px-3"
              style={{ cursor: "pointer" }}
            >
              {" "}
              <div className="mt-2 d-flex justify-content-between">
                <p className="mb-0">{event.title}</p>
                <span className="d-flex flex-row align-items-center">
                  <UilCalender className="text-pink" size="20" />
                  <small className="text-pink">
                    &nbsp;{moment(event.date_time).format("DD MMM, YYYY")}
                  </small>
                </span>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center mt-2">Nothing to show</p>
        )}
      </div>
    </div>
  );
}

export default ShowReminders;
