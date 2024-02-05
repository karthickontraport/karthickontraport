import React from "react";
import {
  CheckOutlined,
  MailOutlined,
  UserSwitchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Flex } from "antd";
import TaskSelect from "./TaskSelect";

const TaskActions = () => {
  const iconStyle = {
    marginRight: "5px",
  };
  const iconOptions = [
    {
      value: "Mark Complete",
      label: "Mark Complete",
      icon: <CheckOutlined style={iconStyle} />,
    },
    {
      value: "Email",
      label: "Email",
      icon: <MailOutlined style={iconStyle} />,
    },
    {
      value: "Reassign",
      label: "Reassign",
      icon: <UserSwitchOutlined style={iconStyle} />,
    },
    {
      value: "Reschedule",
      label: "Reschedule",
      icon: <ReloadOutlined style={iconStyle} />,
    },
  ];

  const Options = [
    {
      value: "All Tasks",
      label: "All Tasks",
    },
    {
      value: "Past Due",
      label: "Past Due",
    },
    {
      value: "Due Now",
      label: "Due Now",
    },
    {
      value: "Due Tomarrow",
      label: "Due Tomarrow",
    },
    {
      value: "Due This Week",
      label: "Due This Week",
    },
    {
      value: "Completed",
      label: "Completed",
    },
  ];
  const userOptions = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Me",
      label: "Me",
    },
  ];
  return (
    <Flex gap={12}>
      <TaskSelect options={iconOptions} width="11rem" initialValue="Actions" />
      <TaskSelect
        options={Options}
        width="15rem"
        initialValue="All Tasks"
        needShowText
        showtext="Show:"
      />
      <TaskSelect
        options={userOptions}
        width="12rem"
        initialValue="All"
        needShowText
        showtext="Assigned To:"
      />
    </Flex>
  );
};

export default TaskActions;
