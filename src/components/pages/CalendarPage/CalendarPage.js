import React, { useState, useEffect } from "react";
import ContactBox from "../../common/ContactBox/ContactBox";
import { Container, Box } from "../../common/Layout";
import { Table, Empty } from "antd";
import EventActions from "../../common/EventActions/EventActions";
import ContactHeader from "../../common/ContactHeader/ContactHeader";

const CalendarPage = () => {
  const customerId = localStorage.getItem("currentCustomerID");
  const PriEmail = localStorage.getItem("PriEmail");
  const eventData = JSON.parse(localStorage.getItem("eventData")) || {};
  const currentCustomerIdEventData = eventData[customerId] || [];

  const [emailText, setEmailText] = useState("");

  useEffect(() => {
    updateEmailText();
  }, [PriEmail]);

  const updateEmailText = () => {
    const firstName = localStorage.getItem("FirstName") || "";
    const lastName = localStorage.getItem("LastName") || "";
    const priEmail = localStorage.getItem("PriEmail") || "";
    const defaultName = localStorage.getItem("Name") || "";
    const defaultEmail = localStorage.getItem("EMail") || "";

    const capitalizedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const capitalizedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1);

    // Use FirstName and LastName if available, else use defaultName
    const nameToDisplay =
      firstName && lastName
        ? `${capitalizedFirstName} ${capitalizedLastName}`
        : defaultName;

    // Use PriEmail if available, else use defaultEmail
    const emailToDisplay = priEmail || defaultEmail;

    setEmailText(`${nameToDisplay}  (${emailToDisplay})`);
  };

  const eventColumns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "StartEnd", dataIndex: "startEnd", key: "startEnd" },
    { title: "Attending", dataIndex: "attending", key: "attending" },
    { title: "Modify Event", dataIndex: "modify event", key: "modify event" },
  ];

  return (
    <Container style={{ padding: "0.625rem", gap: "1rem" }}>
      <Box>
        <ContactHeader
          emailtext={emailText}
          needBackView={false}
          needQuickView={false}
        />
      </Box>
      <ContactBox
        actionBtnText="Add New Event"
        customChildren={<EventActions />}
        heading="Calendar"
        scroll="vertical"
      >
        {currentCustomerIdEventData.length > 0 ? (
          <Table
            columns={eventColumns}
            dataSource={currentCustomerIdEventData}
            pagination={false}
          />
        ) : (
          <Empty
            description={
              <span style={{ fontSize: "16px", color: "#bababa" }}>
                There are no events available for this contact.
              </span>
            }
          />
        )}
      </ContactBox>
    </Container>
  );
};

export default CalendarPage;
