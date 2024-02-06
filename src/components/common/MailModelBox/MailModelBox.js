import React, { useState } from "react";
import { Container, Box } from ".././Layout";
import { Input } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import style from "./MailModelBox.module.css";

const MailModelBox = () => {
  return (
    <Container className={style.Container}>
      <Box className={style.title}>Quick Email</Box>
      <Box>
        <Container style={{ gap: "1rem" }}>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Sent Email To</Box>
                  <Input placeholder="Sent Email..." allowClear />
                </Container>
              </Box>
            </Container>
          </Box>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Cc</Box>
                  <Box>
                    {" "}
                    <Input placeholder="CC..." allowClear />{" "}
                  </Box>
                </Container>
              </Box>
            </Container>
          </Box>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={style.label}>Bcc</Box>
                  <Box flexible>
                    <Input placeholder="Bcc..." allowClear />{" "}
                  </Box>
                </Container>
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>
      <Box>
        <Container>
          <Box>
            <Container alignBox="row" align="vertical">
              <Box className={style.label}>Email Subject</Box>
              <Box flexible>
                <Input placeholder="Subject..." allowClear />
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>

      <Box>
        Details
        <i style={{ color: "#4096ff", marginLeft: "5px" }}>
          <QuestionCircleOutlined />
        </i>
      </Box>

      <Box flexible>
        <RichTextEditor editorHeight="100%" />
      </Box>
    </Container>
  );
};

export default MailModelBox;
