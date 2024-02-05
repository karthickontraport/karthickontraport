import React, { useState } from "react";
import { Table } from "antd";
import ActionsModel from "../../common/ActionsModel/ActionsModel";
import EventModelBox from "../../common/EventModelBox/EventModelBox";
import { Container, Box } from "../../common/Layout";
import style from "./Common.module.css";

const EventPage = ({ onClose }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const addedBy = userInfo && userInfo.Name ? userInfo.Name : "defaultName";
  const loginEmail =
    userInfo && userInfo.EMail ? userInfo.EMail : "defaultName";

  const currentFirstName = localStorage.getItem("FirstName") || "";
  const currentLastName = localStorage.getItem("LastName") || "";
  const currentEmail = localStorage.getItem("PriEmail") || "";

  const [formData, setFormData] = useState({
    title: "",
    startEnd: null,
    repeat: "Does not Repeat",
    owner: addedBy,
    eventType: "",
    details: "",
  });

  const formatDateTime = (dates) => {
    if (Array.isArray(dates) && dates.length === 2) {
      const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedDates = dates.map((dateString) =>
        new Intl.DateTimeFormat("en-US", options).format(new Date(dateString))
      );
      return formattedDates.join(" to ").replace(/,/g, ""); // Remove commas
    } else {
      return null;
    }
  };

  const formattedDateTime = (date) => {
    if (date instanceof Date) {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return new Intl.DateTimeFormat("en-US", options)
        .format(date)
        .replace(/,/g, "");
    } else {
      return null;
    }
  };

  const handleSave = () => {
    const startEndDateTime = formatDateTime(formData.startEnd);
    const eventData = {
      title: formData.title,
      attending: "Yes",
      startEnd: startEndDateTime,
      repeat: formData.repeat,
      owner: formData.owner,
      eventType: formData.eventType,
      details: `<div>${formData.details}</div>`,
      addedDate: formatDateTime(new Date()),
      firstName: localStorage.getItem("FirstName") || "",
      lastName: localStorage.getItem("LastName") || "",
      contact: localStorage.getItem("PriEmail") || "",
      CustomerID: localStorage.getItem("currentCustomerID") || "",
    };

    const customerID = localStorage.getItem("currentCustomerID") || "";
    const storedData = JSON.parse(localStorage.getItem("eventData")) || {};

    if (!storedData[customerID]) {
      storedData[customerID] = [];
    }

    storedData[customerID].push(eventData);

    localStorage.setItem("eventData", JSON.stringify(storedData));

    onClose();
  };

  const updateFormData = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "Email",
    },
    {
      title: "Date Added",
      dataIndex: "DateAdded",
    },
  ];

  const data = [
    {
      key: "1",
      name: addedBy,
      Email: loginEmail,
      DateAdded: formattedDateTime(new Date()),
    },
    {
      key: "2",
      name: `${currentFirstName} ${currentLastName}`,
      Email: currentEmail,
      DateAdded: formattedDateTime(new Date()),
    },
  ];

  return (
    <ActionsModel
      title="Add an Event"
      saveText="Add Event"
      onClose={onClose}
      onSave={handleSave}
    >
      <Container style={{ gap: "40px" }} scroll="vertical">
        <Box>
          <EventModelBox onUpdateData={updateFormData} />
        </Box>
        <Box className={style.eventTableBox}>
          <Table columns={columns} dataSource={data} pagination={false} />
        </Box>
      </Container>
    </ActionsModel>
  );
};

export default EventPage;
