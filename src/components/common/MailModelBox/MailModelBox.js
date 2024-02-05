import React, { useState } from "react";
import { Container, Box } from ".././Layout";
import { Select, Input } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import style from "./MailModelBox.module.css";

const MailModelBox = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const addedBy = userInfo && userInfo.Name ? userInfo.Name : "defaultName";
  const loginEmail =
    userInfo && userInfo.EMail ? userInfo.EMail : "defaultName";
  const SelectBox = () => {
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
        value={selectedAssignee}
        options={assigneeOptions.map((option) => ({
          ...option,
          label: option.value === addedBy ? "Me" : option.label,
        }))}
      />
    );
  };

  const OwnerSelectBox = () => {
    const [selectedEmail, setSelectedEmail] = useState(loginEmail);
    const emailOptions = [
      {
        value: "uma@goleads.com",
        label: "uma@goleads.com",
      },
      {
        value: "support.sales@goleads.com",
        label: "support.sales@goleads.com",
      },
      {
        value: "bmattern@goleads.com",
        label: "bmattern@goleads.com",
      },
      {
        value: "susan.walter@goleads.com",
        label: "susan.walter@goleads.com",
      },
      {
        value: "becky.samuelson@goleads.com",
        label: "becky.samuelson@goleads.com",
      },
      {
        value: "greg.chambers@leadgencompass.com",
        label: "greg.chambers@leadgencompass.com",
      },
      {
        value: "spencer.lisiecki@goleads.com",
        label: "spencer.lisiecki@goleads.com",
      },
      {
        value: "jmattern@goleads.com",
        label: "jmattern@goleads.com",
      },
      {
        value: "les.delmont@leadgencompass.com",
        label: "les.delmont@leadgencompass.com",
      },
      {
        value: "Christian.jones@leadgencompass.com",
        label: "Christian.jones@leadgencompass.com",
      },
    ];
    const onChange = (value, option) => {
      console.log(`selected ${value}`);
      setSelectedEmail(option?.label || "");
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
        value={selectedEmail}
        options={emailOptions.map((option) => ({
          ...option,
          label: option.value === loginEmail ? "Default" : option.label,
        }))}
      />
    );
  };

  const EventSelectBox = () => {
    const [selectedEmail, setSelectedEmail] = useState();
    const emailOptions = [
      {
        value: "uma@goleads.com",
        label: "uma@goleads.com",
      },
      {
        value: "support.sales@goleads.com",
        label: "support.sales@goleads.com",
      },
      {
        value: "bmattern@goleads.com",
        label: "bmattern@goleads.com",
      },
      {
        value: "susan.walter@goleads.com",
        label: "susan.walter@goleads.com",
      },
      {
        value: "becky.samuelson@goleads.com",
        label: "becky.samuelson@goleads.com",
      },
      {
        value: "greg.chambers@leadgencompass.com",
        label: "greg.chambers@leadgencompass.com",
      },
      {
        value: "spencer.lisiecki@goleads.com",
        label: "spencer.lisiecki@goleads.com",
      },
      {
        value: "jmattern@goleads.com",
        label: "jmattern@goleads.com",
      },
      {
        value: "les.delmont@leadgencompass.com",
        label: "les.delmont@leadgencompass.com",
      },
      {
        value: "Christian.jones@leadgencompass.com",
        label: "Christian.jones@leadgencompass.com",
      },
    ];
    const onChange = (value, option) => {
      console.log(`selected ${value}`);
      setSelectedEmail(option?.label || "");
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
        placeholder="Select To Email Adders..."
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        value={selectedEmail}
        options={emailOptions.map((option) => ({
          ...option,
          label: option.label,
        }))}
      />
    );
  };

  return (
    <Container className={style.Container}>
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
