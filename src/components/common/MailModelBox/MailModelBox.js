import React, { useEffect, useState } from "react";
import { Container, Box } from ".././Layout";
import { Select, Input } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import style from "./MailModelBox.module.css";

const MailModelBox = () => {

  const SelectBox = () => {
    const onChange = (value) => {
      console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
      console.log("search:", value);
    };
    const filterOption = (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    return (
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Select Assignee..."
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        defaultValue="Me"
        options={[
          {
            value: "Me",
            label: "Me",
          },
          {
            value: "Balaji",
            label: "Balaji",
          },
          {
            value: "Bala",
            label: "Bala",
          },
          {
            value: "Uma",
            label: "Uma",
          },
        ]}
      />
    );
  };

  const OwnerSelectBox = () => {
    const onChange = (value) => {
      console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
      console.log("search:", value);
    };
    const filterOption = (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    return (
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Select Owner..."
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        defaultValue="Default"
        options={[
          {
            value: "Default",
            label: "Default",
          },
          {
            value: "Balaji@goleads.com",
            label: "Balaji@goleads.com",
          },
          {
            value: "Bala@goleads.com",
            label: "Bala@goleads.com",
          },
          {
            value: "Uma@goleads.com",
            label: "Uma@goleads.com",
          },
        ]}
      />
    );
  };

  const EventSelectBox = () => {
    const onChange = (value) => {
      console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
      console.log("search:", value);
    };
    const filterOption = (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    return (
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Select Event Type..."
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        defaultValue="Email"
        options={[
          {
            value: "Email",
            label: "Email",
          },
          {
            value: "Call",
            label: "Call",
          },
          {
            value: "Chat",
            label: "Chat",
          },
        ]}
      />
    );
  };

  return (
    <Container className={style.Container} >
      <Box className={style.title}>Quick Email</Box>
      <Box>
        <Container style={{ gap: "1rem" }}>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Sent From Name</Box>
                  <Box flexible>{SelectBox()}</Box>
                </Container>
              </Box>
            </Container>
          </Box>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Sent From Email</Box>
                  <Box flexible>{OwnerSelectBox()}</Box>
                </Container>
              </Box>
            </Container>
          </Box>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Sent Email To</Box>
                  <Box flexible>{EventSelectBox()}</Box>
                </Container>
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>
      <Box>
        <Container>
          <Box>
            <Container alignBox="row" align="vertical">
              <Box className={style.label}>Email Subject</Box>
              <Box flexible>
                <Input placeholder="Subject..." allowClear />
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>

      <Box>
        Details
        <i style={{ color: "#4096ff", marginLeft: "5px" }}>
          <QuestionCircleOutlined />
        </i>
      </Box>

      <Box flexible>
        <RichTextEditor editorHeight="100%" />
      </Box>
    </Container>
  );
};

export default MailModelBox;
