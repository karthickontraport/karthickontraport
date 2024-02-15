import React, { useEffect, useState } from "react";
import { Input, Button, Flex, Tooltip, Select } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import useCriteriaLogic from "../../commonReducers/useCriteriaLogic";
import { Container, Box } from "../../common/Layout";
import Drawer from "../../common/CustomDrawer/CustomDrawer";
import style from "./CriteriaPage.module.css";

const CriteriaPage = (props) => {
  const { title, visible, onClose, extra } = props;
  const {
    criteria,
    handleFieldChange,
    handleOperatorChange,
    handleValueChange,
    handleConditionChange,
    addCriterion,
    removeCriterion,
    copyCriterion,
    clearCriteria,
  } = useCriteriaLogic();
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const defaultGroupNames = [
      "All",
      "2019 Revenue",
      "2019 Revenue 45+ dyas in ontraport",
      "Goleads Newsletter",
      "Card View : Sales pipeline",
    ];
    const storedGroupNames =
      JSON.parse(localStorage.getItem("groupNames")) || [];
    const allGroupNames = [...defaultGroupNames, ...storedGroupNames];

    localStorage.setItem("groupNames", JSON.stringify(allGroupNames));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store group name in local storage
    const storedGroupNames =
      JSON.parse(localStorage.getItem("groupNames")) || [];
    const updatedGroupNames = [...storedGroupNames, groupName];
    localStorage.setItem("groupNames", JSON.stringify(updatedGroupNames));

    // Clear group name field
    setGroupName("");
  };

  const toggleCondition = (index) => {
    handleConditionChange(
      index,
      criteria[index].condition === "AND" ? "OR" : "AND"
    );
  };

  const onSearchField = (value) => {
    console.log("search:", value);
  };

  const filterField = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSearchCondition = (value) => {
    console.log("search:", value);
  };

  const filterCondition = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Drawer
      title={title}
      onClose={onClose}
      visible={visible}
      extra={extra}
      width="60rem"
    >
      <form onSubmit={handleSubmit} style={{ height: "100%" }}>
        <Container>
          <Box className={style.hed}>
            <label style={{ width: "20.625rem" }}>
              <div className={style.gtext}>GROUP NAME</div>
              <Input
                placeholder="Enter Group Name"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </label>
          </Box>
          <Box className={style.desc}>
            <span className={style.info}>
              <InfoCircleOutlined />
            </span>
            Contacts will be added to this group if all the following conditions
            are met.
          </Box>
          <Box flexible scroll="vertical" className={style.wraper}>
            <Container>
              <Box className={style.labels}>
                <Flex gap="small">
                  <div className={style.comWid}>SELECT FIELD</div>
                  <div className={style.comWid}>SELECT CONDITION</div>
                  <div className={style.comWid}>SELECT VALUE</div>
                </Flex>
              </Box>
              <Box flexible>
                <Container>
                  {criteria.map((criterion, index) => (
                    <Box className={style.middle}>
                      <Flex key={index} gap="small">
                        <span className={style.count}>{index + 1}</span>
                        <label className={style.comWid}>
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select Field"
                            optionFilterProp="children"
                            onChange={(value) =>
                              handleFieldChange(index, value)
                            }
                            onSearch={onSearchField}
                            filterOption={filterField}
                            options={[
                              { value: "First Name", label: "First Name" },
                              { value: "Last Name", label: "Last Name" },
                              { value: "Email", label: "Email" },
                              { value: "City", label: "City" },
                              { value: "Company Name", label: "Company Name" },
                              { value: "Title", label: "Title" },
                              { value: "Login Name", label: "Login Name" },
                              { value: "MediaCode", label: "MediaCode" },
                              { value: "URL", label: "URL" },
                            ]}
                          />
                        </label>
                        <label className={style.comWid}>
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select Condtion"
                            optionFilterProp="children"
                            onChange={(value) =>
                              handleOperatorChange(index, value)
                            }
                            onSearch={onSearchCondition}
                            filterOption={filterCondition}
                            options={[
                              { value: "Greater Than", label: "Greater Than" },
                              { value: "Starts With", label: "Starts With" },
                              { value: "Ends With", label: "Ends With" },
                              { value: "Equal To", label: "Equal To" },
                              {
                                value: "Not Equal To",
                                label: "Not Equal To ",
                              },
                              { value: "Less Than", label: "Less Than" },
                              { value: "Contains", label: "Contains" },
                              {
                                value: "Does Not Contain",
                                label: "Does Not Contain",
                              },
                            ]}
                          />
                        </label>
                        <label className={style.comWid}>
                          <Input
                            type="text"
                            placeholder="Enter value"
                            value={criterion.value}
                            onChange={(e) =>
                              handleValueChange(index, e.target.value)
                            }
                          />
                        </label>
                        <Tooltip
                          title={` Click to Change ${
                            criterion.condition === "AND" ? "OR" : "AND"
                          } Condtion`}
                        >
                          <Button onClick={() => toggleCondition(index)}>
                            {criterion.condition === "AND" ? "AND" : "OR"}
                          </Button>
                        </Tooltip>

                        <div className={style.actionIcons}>
                          <Flex gap={10}>
                            <Tooltip title="Copy">
                              <span onClick={() => copyCriterion(index)}>
                                <CopyOutlined />
                              </span>
                            </Tooltip>

                            <Tooltip title="Delete">
                              <span onClick={() => removeCriterion(index)}>
                                <DeleteOutlined />
                              </span>
                            </Tooltip>
                          </Flex>
                        </div>
                      </Flex>
                    </Box>
                  ))}
                  <Box className={style.condition}>
                    <Button
                      onClick={addCriterion}
                      icon={<PlusOutlined />}
                      className={style.newbtn}
                    >
                      Add New Condition
                    </Button>
                  </Box>
                </Container>
              </Box>
            </Container>
          </Box>
          <Box className={style.footer}>
            <Flex
              gap="middle"
              align="center"
              style={{ height: "100%", padding: "0 1rem" }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={clearCriteria}>Clear</Button>
            </Flex>
          </Box>
        </Container>
      </form>
    </Drawer>
  );
};

export default CriteriaPage;
