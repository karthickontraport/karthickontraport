import React from "react";
import { Flex } from "antd";
import EventSelect from "./EventSelect";
import EventDropdown from "./EventDropdown";

const EventActions = ({
  onEventClick,
  onStatusClick,
  options,
  placeholder,
}) => {
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
      <EventDropdown
        onStatusClick={onStatusClick}
        onEventClick={onEventClick}
        options={options}
        placeholder={placeholder}
      />

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
