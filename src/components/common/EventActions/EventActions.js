import React from "react";
import { UserSwitchOutlined, DeleteOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import EventSelect from "./EventSelect";

const EventActions = () => {
  const iconStyle = {
    marginRight: "5px",
  };
  const iconOptions = [
    {
      value: "Change Status",
      label: "Change Status",
      icon: <UserSwitchOutlined style={iconStyle} />,
    },
    {
      value: "Delete From Event",
      label: "Delete From Event",
      icon: <DeleteOutlined style={iconStyle} />,
    },
  ];

  const userOptions = [
    {
      value: "All Events",
      label: "All Events",
    },
    {
      value: "My Events",
      label: "My Events",
    },
  ];
  return (
    <Flex gap={12}>
      <EventSelect options={iconOptions} width="11rem" initialValue="Actions" />

      <EventSelect
        options={userOptions}
        width="12rem"
        initialValue="All Events"
        needShowText
        showtext="View:"
      />
    </Flex>
  );
};

export default EventActions;
