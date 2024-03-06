import React from "react";
import { Calendar } from "react-calendar";
import { ArrowLeft, ArrowRight } from "./Arrows";
import "react-calendar/dist/Calendar.css";

function Calender({ getDate }) {
  const date = new Date();

  return (
    <Calendar
      onChange={(value) => {
        const calendarCurrentDate = new Date(value);
        getDate(calendarCurrentDate);
      }}
      value={date}
      className="d-flex w-100 flex-column align-items-center rounded-5 p-4"
      onClickDecade={undefined}
      locale="en"
      next2Label={null}
      prev2Label={null}
      prevLabel={<ArrowLeft />}
      nextLabel={<ArrowRight />}
    />
  );
}

export default Calender;
