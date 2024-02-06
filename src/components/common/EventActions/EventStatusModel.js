import React from "react";
import { Select, Modal, Button } from "antd";
import { Container, Box } from "../Layout";

const EventStatusModel = (props) => {
  const { handleSave, handleClose, show } = props;
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Modal
      title="Change Status"
      centered
      open={show}
      onOk={handleSave}
      onCancel={handleClose}
      okText="Change Status"
    >
      <Container
        align="vertical"
        alignBox="row"
        style={{ margin: "30px 0 100px 0", width: "65%" }}
      >
        <Box flexible>Status</Box>
        <Box>
          <Select
            style={{ width: "200px" }}
            onChange={onChange}
            defaultValue="None"
            options={[
              {
                value: "None",
                label: "None",
              },
              {
                value: "Maybe",
                label: "Maybe",
              },
              {
                value: "Yes",
                label: "Yes",
              },
              {
                value: "No",
                label: "No",
              },
            ]}
          />
        </Box>
      </Container>
    </Modal>
  );
};

export default EventStatusModel;
