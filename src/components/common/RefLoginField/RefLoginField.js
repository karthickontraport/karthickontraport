import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { Container, Box } from "../Layout";
import { fetchRefData } from "../../actions/refAction";
import style from "../SelectField/SelectField.module.css";

const RefLoginField = (props) => {
  const { label, value, name, onChange, handleSave } = props;
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.refReducer);
  const [isChanged, setIsChanged] = useState(false);
  const [isSaveVisible, setIsSaveVisible] = useState(false);

  console.log("login users", data);

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchRefData());
    }
  }, [dispatch, data]);
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
    value: item.LoginName,
    label: item.ExecName,
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
              placeholder="Select a Rep"
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

RefLoginField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  handleSave: PropTypes.func,
};

export default RefLoginField;
