import React, { useState } from "react";
import { Container, Box } from ".././Layout";
import { DatePicker, Select, Input } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import style from "./EventModelBox.module.css";

const { RangePicker } = DatePicker;

const EventModelBox = ({ onUpdateData }) => {
  const SelectBox = () => {
    const onChange = (value) => {
      console.log(`selected ${value}`);
      onUpdateData("repeat", value);
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
            value: "Daily ",
            label: "Daily ",
          },
          {
            value: "Weekly on Friday ",
            label: "Weekly on Friday ",
          },
          {
            value: "Monthly on the third Friday ",
            label: "Monthly on the third Friday ",
          },
          {
            value: "Annually on january 19",
            label: "Annually on january 19",
          },
          {
            value: "Every Weekday (Monday to Friday)",
            label: "Every Weekday (Monday to Friday)",
          },
        ]}
      />
    );
  };

  const OwnerSelectBox = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const addedBy = userInfo && userInfo.Name ? userInfo.Name : "defaultName";
    const [selectedAssignee, setSelectedAssignee] = useState(addedBy);
    const assigneeOptions = [
      {
        value: "Bill Admin",
        label: "Bill Admin",
      },
      {
        value: "Bill Mattern",
        label: "Bill Mattern",
      },
      {
        value: "susan walter",
        label: "susan walter",
      },
      {
        value: "Becky Samuelson",
        label: "Becky Samuelson",
      },
      {
        value: "Greg Chambers",
        label: "Greg Chambers",
      },
      {
        value: "Spencer Lisiecki",
        label: "Spencer Lisiecki",
      },
      {
        value: "Jean Mattern",
        label: "Jean Mattern",
      },
      {
        value: "Les Delmont",
        label: "Les Delmont",
      },
      {
        value: "Christian Jones",
        label: "Christian Jones",
      },
    ];
    const onChange = (value, option) => {
      console.log(`selected ${value}`);
      setSelectedAssignee(option?.label || "");
      onUpdateData("owner", option?.label || "");
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
        value={selectedAssignee}
        options={assigneeOptions.map((option) => ({
          ...option,
          label: option.value === addedBy ? "Me" : option.label,
        }))}
      />
    );
  };

  const EventSelectBox = () => {
    const onChange = (value) => {
      console.log(`selected ${value}`);
      onUpdateData("eventType", value);
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
            value: "Demo",
            label: "Demo",
          },
        ]}
      />
    );
  };

  const dateOnChange = (dates, dateStrings) => {
    console.log(dates, dateStrings);
    onUpdateData("startEnd", dates);
  };

  const handleTitleChange = (e) => {
    onUpdateData("title", e.target.value);
  };

  const handleDetailsChange = (value) => {
    onUpdateData("details", value);
  };

  return (
    <Container className={style.Container}>
      <Box className={style.title}>Add Event</Box>
      <Box>
        <Container style={{ gap: "1rem" }}>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Title</Box>
                  <Box flexible>
                    <Input
                      placeholder="Enter Title..."
                      allowClear
                      onChange={handleTitleChange}
                    />
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

      <Box style={{ height: "15.625rem" }}>
        <RichTextEditor editorHeight="100%" onChange={handleDetailsChange} />
      </Box>
    </Container>
  );
};

export default EventModelBox;
