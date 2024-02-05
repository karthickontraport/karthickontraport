import React from "react";
import { Container, Box } from "../../common/Layout";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import style from "./PageHeader.module.css";

const PageHeader = ({ onChange, onClick, count }) => {
  return (
    <Container alignBox="row" align="vertical" className={style.Container}>
      <Box flexible>
        <Container alignBox="row" align="vertical" className={style.heder}>
          <Button type="primary" onClick={onClick}>
            New Contact
          </Button>
          {count !== "" && <div className={style.count}>Contacts: {count}</div>}
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
