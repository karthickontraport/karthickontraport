import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import { Container } from "../Layout";
import style from "./IconButton.module.css";

const IconButton = (props) => {
  const { children, onClick, className, title } = props;
  return (
    <Container
      align="both"
      className={`${style.Container}  ${className}`}
      onClick={onClick}
    >
      <Tooltip title={title}>{children}</Tooltip>
    </Container>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default IconButton;
