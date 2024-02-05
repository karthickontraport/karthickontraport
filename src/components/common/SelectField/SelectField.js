// SelectField.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Select } from "antd";
import { Container, Box } from "../Layout";
import { fetchData } from "../../actions/mediaAction";
import style from "./SelectField.module.css";

const SelectField = ({ label, value, name, onChange, success, handleSave }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.mediaData);
  const [isChanged, setIsChanged] = useState(false);
  const [isSaveVisible, setIsSaveVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSaveClick = () => {
    handleSave(value);
    setIsSaveVisible(false);

    setTimeout(() => {
      setIsChanged(false);
    }, 5000);
  };

  const handleSelectChange = (selectedValue) => {
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
  const selectOptions = data.map((item, index) => ({
    key: index,
    value: item.mediacode,
    label: item.mediadesc,
  }));
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
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
              placeholder="Select a media code"
              optionFilterProp="children"
              value={value}
              name={name}
              onChange={handleSelectChange}
              filterOption={filterOption}
              options={selectOptions}
            />
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

export default SelectField;
