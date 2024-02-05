// SelectField.js
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Select } from "antd";
import { Container, Box } from "../Layout";
import industryData from "./data.json";
import style from "../SelectField/SelectField.module.css";

const { Option } = Select;

const IndustryTypeField = ({
  label,
  value,
  name,
  onChange,
  success,
  handleSave,
  editError,
}) => {
  const [isChanged, setIsChanged] = useState(false);
  const [isSaveVisible, setIsSaveVisible] = useState(false);

  const handleSaveClick = () => {
    handleSave(value);
    setIsSaveVisible(false);

    // Reset the state after 5 seconds
    setTimeout(() => {
      setIsChanged(false);
    }, 5000);
  };

  const handleSelectChange = (selectedValue, option) => {
    console.log(`selected ${selectedValue}`);
    if (onChange) {
      onChange(selectedValue);
    }
    if (selectedValue !== value) {
      setIsChanged(true);
      setIsSaveVisible(true);
    } else {
      setIsChanged(false);
      setIsSaveVisible(false);
    }
  };

  const industryOptions = industryData?.industry || [];

  return (
    <Container
      isCover={false}
      style={{ gap: "10px" }}
      className={style.Container}
    >
      <Box className={style.label}>{label}</Box>
      <Box>
        <Container
          alignBox="row"
          align="vertical"
          className={style.filedContainer}
        >
          <Box>
            <Select
              showSearch
              style={{ width: "250px" }}
              placeholder="Select an industry"
              optionFilterProp="children"
              value={value}
              name={name}
              onChange={handleSelectChange}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {industryOptions.map((item, index) => (
                <Option key={index} title={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Box>
          {isChanged && isSaveVisible && (
            <div onClick={handleSaveClick} className={style.btn}>
              Save
            </div>
          )}
        </Container>
      </Box>
    </Container>
  );
};

export default IndustryTypeField;
