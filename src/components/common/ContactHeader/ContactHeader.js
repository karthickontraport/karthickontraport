/* eslint-disable no-template-curly-in-string */
import React from "react";
import PropTypes from "prop-types";
import { Container, Box } from "../Layout";
import IconButton from "../IconButton/IconButton";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import style from "./ContactHeader.module.css";

const ContactHeader = (props) => {
  const {
    emailtext,
    handleBackClick,
    handleQuickview,
    className,
    buttonText,
    handleMailClick,
    needBackView,
    needQuickView,
  } = props;

  return (
    <Container
      alignBox="row"
      align="vertical"
      className={`${style.Container} ${className}`}
    >
      <Box flexible>
        <Container alignBox="row" style={{ gap: "15px" }} align="vertical">
          {needBackView && (
            <IconButton onClick={handleBackClick} title="Click to go back">
              <ArrowLeftOutlined />
            </IconButton>
          )}

          <div className={style.text}>{emailtext}</div>
        </Container>
      </Box>
      {buttonText && (
        <Box>
          <Button type="primary" onClick={handleMailClick}>
            {buttonText}
          </Button>
        </Box>
      )}

      {needQuickView && (
        <Box>
          <IconButton onClick={handleQuickview} title="Quick View">
            <QuestionAnswerIcon />
          </IconButton>
        </Box>
      )}
    </Container>
  );
};

ContactHeader.propTypes = {
  emailtext: PropTypes.string.isRequired,
  handleQuickview: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func,
  buttonText: PropTypes.string,
  handleMailClick: PropTypes.func,
  needBackView: PropTypes.bool,
  needQuickView: PropTypes.bool,
};

ContactHeader.defaultProps = {
  emailtext: `karthick ${"(karthick@goleads.com)"}`,
  needBackView: true,
  needQuickView: true,
};

export default ContactHeader;
