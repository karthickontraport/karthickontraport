import React from "react";
import ActionsModel from "../../common/ActionsModel/ActionsModel";
import MailModelBox from "../../common/MailModelBox/MailModelBox";
import style from "./Common.module.css";

const EventPage = ({ onClose }) => {
  return (
    <ActionsModel
      title="Sent an Mail to Selected Contacts"
      saveText="Sent Now"
      mailText="Sent Later"
      onClose={onClose}
    >
      <MailModelBox />
    </ActionsModel>
  );
};

export default EventPage;
