import React, { useState } from "react";
import { Select, Flex } from "antd";
import styles from "./TaskActions.module.css";

const TaskSelect = ({
  needShowText,
  options = [],
  width,
  initialValue,
  showtext,
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const onChange = (value, option) => {
    console.log(`selected ${value}`);
    setSelectedValue(option.label);
  };

  const selectedValueStyle = {
    color: "#2b7df7",
  };

  return (
    <Flex
      align="center"
      className={styles.selectContainer}
      style={{ width: width }}
    >
      {needShowText && <span className={styles.customtxt}>{showtext}</span>}

      <Select
        placeholder={needShowText ? "Show: Select a person" : "Select a person"}
        optionFilterProp="children"
        onChange={onChange}
        value={selectedValue}
        variant="borderless"
        style={{ width: "100%" }}
      >
        {options.map((option) => (
          <Select.Option
            key={option.value}
            value={option.value}
            label={option.label}
          >
            <span
              style={option.value === selectedValue ? selectedValueStyle : {}}
            >
              {option.icon} {option.label}
            </span>
          </Select.Option>
        ))}
      </Select>
    </Flex>
  );
};

export default TaskSelect;
