import React from "react";
import { Container, Box } from "../../common/Layout";
import { Input, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import style from "./PageHeader.module.css";

const PageHeader = ({
  onChange,
  onClick,
  handleAddGroup,
  handleEditGroup,
  needActions = false,
}) => {
  const handleOnChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Container alignBox="row" align="vertical" className={style.Container}>
      <Box flexible>
        <Container alignBox="row" align="vertical" className={style.heder}>
          <Box>
            <Container align="vertical" alignBox="row">
              <Box style={{ fontSize: "0.875rem" }}>GROUP :</Box>
              <Box>
                <Select
                  style={{ width: "13rem" }}
                  showSearch
                  variant="borderless"
                  placeholder="Select a person"
                  optionFilterProp="children"
                  defaultValue="All"
                  onChange={handleOnChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={[
                    {
                      value: "All",
                      label: "All",
                    },
                    {
                      value: "2019 Revenue",
                      label: "2019 Revenue",
                    },
                    {
                      value: "2019 Revenue 45+ dyas in ontraport",
                      label: "2019 Revenue 45+ dyas in ontraport",
                    },
                    {
                      value: "Goleads Newsletter",
                      label: "Goleads Newsletter",
                    },
                    {
                      value: "Card View : Sales pipeline",
                      label: "Card View : Sales pipeline",
                    },
                  ]}
                />
              </Box>
            </Container>
          </Box>
          {needActions && (
            <>
              <Button onClick={handleEditGroup}>Edit Group</Button>
              <Button type="primary" onClick={handleAddGroup}>
                Add Group
              </Button>
            </>
          )}

          <Button type="primary" onClick={onClick}>
            New Contact
          </Button>
        </Container>
      </Box>
      <Box>
        <Input
          type="text"
          placeholder="Search Contact"
          suffix={<SearchOutlined style={{ color: "gray" }} />}
          size="large"
          onChange={onChange}
          style={{ width: "18.75rem" }}
        />
      </Box>
    </Container>
  );
};

export default PageHeader;
