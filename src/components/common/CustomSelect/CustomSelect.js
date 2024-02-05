import React from "react";
import { Select } from "antd";

const CustomSelect = ({
  placeholder,
  onChange,
  onSearch,
  filterOption,
  options,
  ...restProps
}) => {
  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={options}
      {...restProps}
    />
  );
};

export default CustomSelect;
