import React from "react";
import ActionsModel from "../../common/ActionsModel/ActionsModel";
import EventModelBox from "../../common/EventModelBox/EventModelBox";
import style from "./Common.module.css";

const EventPage = ({ onClose }) => {
  return (
    <ActionsModel
      title="Add an Event for karthick"
      saveText="Add Event"
      onClose={onClose}
    >
      <EventModelBox />
    </ActionsModel>
  );
};

export default EventPage;
