// SelectField.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { Container, Box } from "../Layout";
import { fetchData } from "../../actions/mediaAction";

const { Option } = Select;

const SelectField = ({ label }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.mediaData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container isCover={false} style={{ gap: "10px" }}>
      <Box>{label}</Box>
      <Box>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Select a media code"
          optionFilterProp="children"
          // onChange={(value) => console.log(`selected ${value}`)}
          // onFocus={() => console.log("focus")}
          // onBlur={() => console.log("blur")}
          // onSearch={(val) => console.log("search:", val)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {data.map((item) => (
            <Option key={item.mediacode} value={item.mediacode}>
              {item.mediadesc}
            </Option>
          ))}
        </Select>
      </Box>
    </Container>
  );
};

export default SelectField;
