import React, { useEffect, useState } from "react";
import { Container, Box } from ".././Layout";
import { DatePicker, Select, Input } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import style from "./EventModelBox.module.css";

const { RangePicker } = DatePicker;

const EventModelBox = () => {


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
        defaultValue="Does not Repeat"
        options={[
          {
            value: "Does not Repeat",
            label: "Does not Repeat",
          },
          {
            value: "Allow Repeat",
            label: "Allow Repeat",
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
        options={[
          {
            value: "Meeting",
            label: "Meeting",
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

  const dateOnChange = (dates, dateStrings) => {
    console.log(dates, dateStrings);
  };

  return (
    <Container className={style.Container} >
      <Box className={style.title}>Add Event</Box>
      <Box>
        <Container style={{ gap: "1rem" }}>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Title</Box>
                  <Box flexible>
                    <Input placeholder="Enter Title..." allowClear />
                  </Box>
                </Container>
              </Box>
            </Container>
          </Box>
          <Box>
            <Container alignBox="row" align="vertical">
              <Box className={style.label}>Start / End</Box>
              <Box flexible>
                <RangePicker
                  onChange={dateOnChange}
                  style={{ width: "100%" }}
                  showTime
                />
              </Box>
            </Container>
          </Box>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Repeat</Box>
                  <Box flexible>{SelectBox()}</Box>
                </Container>
              </Box>
            </Container>
          </Box>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Owner</Box>
                  <Box flexible>{OwnerSelectBox()}</Box>
                </Container>
              </Box>
            </Container>
          </Box>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Event Type</Box>
                  <Box flexible>{EventSelectBox()}</Box>
                </Container>
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

export default EventModelBox;
