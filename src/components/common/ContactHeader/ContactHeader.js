/* eslint-disable no-template-curly-in-string */
import React from "react";
import PropTypes from "prop-types";
import { Container, Box } from "../Layout";
import IconButton from "../IconButton/IconButton";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "./ContactHeader.module.css";

const ContactHeader = (props) => {
  const { emailtext, handleBackClick, handleQuickview, className } = props;

  return (
    <Container
      alignBox="row"
      align="vertical"
      className={`${style.Container} ${className}`}
    >
      <Box flexible>
        <Container alignBox="row" style={{ gap: "15px" }} align="vertical">
          <IconButton onClick={handleBackClick} title="Click to go back">
            <ArrowBackIcon />
          </IconButton>
          <div className={style.text}>{emailtext}</div>
        </Container>
      </Box>
      <Box>
        <IconButton onClick={handleQuickview}>
          <QuestionAnswerIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

ContactHeader.propTypes = {
  emailtext: PropTypes.string.isRequired,
  handleQuickview: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func,
};

ContactHeader.defaultProps = {
  emailtext: `karthick ${"(karthick@goleads.com)"}`,
};

export default ContactHeader;
