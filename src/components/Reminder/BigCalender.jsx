import React, { useEffect, useState } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  AppointmentTooltip,
  Appointments,
  DayView,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import Paper from "@mui/material/Paper";
import { Scheduler } from "@devexpress/dx-react-scheduler-material-ui";

function BigCalender({ events, currentDate }) {
  const [data, setData] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const newData = events?.map((event) => ({
      id: event?.id,
      title: event?.title,
      startDate: new Date(event?.date_time),
      date: event?.date_time,
      members:
        event.relations && Array.isArray(event.relations)
          ? event.relations.map((relation) => relation?.id)
          : [],
      groupingInfo: event?.card,
    }));

    setData(newData);
    getRelation();
  }, [events]);

  const getRelation = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `${
        process.env.REACT_APP_API_URL
      }get-relation-by-id/${localStorage.getItem("id")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const owner = result.data?.map((rel) => ({
          text: rel.title,
          id: rel.id,
          color: "#F1CED4",
        }));
        setResources([
          {
            fieldName: "members",
            title: "Members",
            allowMultiple: true,
            instances: owner,
          },
        ]);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={0} endDayHour={24} />
        <Appointments data={data} />
        <AppointmentTooltip showCloseButton />
        <Resources data={resources} mainResourceName="members" />
      </Scheduler>
    </Paper>
  );
}

export default BigCalender;
