// TaskModelBox.jsx
import React, { useState } from "react";
import { Container, Box } from ".././Layout";
import { DatePicker, Select, Input } from "antd";
import style from "./TaskModelBox.module.css";
const { TextArea } = Input;

const TaskModelBox = ({ onUpdateData }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const addedBy = userInfo && userInfo.Name ? userInfo.Name : "defaultName";

  const SelectBox = () => {
    const [selectedAssignee, setSelectedAssignee] = useState(addedBy);

    const onChange = (value, option) => {
      console.log(`selected ${value}`);
      setSelectedAssignee(option?.label || "");
      onUpdateData("assignee", option?.label || "");
    };

    const onSearch = (value) => {
      console.log("search:", value);
    };

    const filterOption = (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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

    return (
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Select Assignee..."
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

  const dateOnChange = (date, dateString) => {
    console.log(date, dateString);
    // Update the form data when due date changes
    onUpdateData("dueDate", date);
  };

  const onTextAreaChange = (e) => {
    const textAreaValue = e.target.value;
    // Update the form data when text area changes
    onUpdateData("details", textAreaValue);
  };

  return (
    <Container className={style.Container}>
      <Box className={style.title}>Add Task</Box>
      <Box>
        <Container style={{ gap: "1rem" }}>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Task Subject</Box>
                  <Box flexible>
                    <Input
                      placeholder="Enter Task Subject..."
                      allowClear
                      onChange={(e) => onUpdateData("subject", e.target.value)}
                    />
                  </Box>
                </Container>
              </Box>
            </Container>
          </Box>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Due Date</Box>
                  <Box flexible>
                    <DatePicker
                      onChange={dateOnChange}
                      format="DD/MM/YYYY hh:mm A"
                      showTime={{ use12Hours: true }}
                      placeholder="Select Date..."
                      style={{ width: "100%" }}
                    />
                  </Box>
                </Container>
              </Box>
            </Container>
          </Box>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Task Assignee</Box>
                  <Box flexible>{SelectBox()}</Box>
                </Container>
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>

      <Box flexible>
        <TextArea
          placeholder="Enter details"
          onChange={onTextAreaChange}
          style={{
            height: "100%",
            resize: "none",
          }}
        />
      </Box>
    </Container>
  );
};

export default TaskModelBox;
