import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Box } from "../../common/Layout";
import DoneIcon from "@mui/icons-material/Done";
import Tooltip from "@mui/material/Tooltip";
import style from "./TextBox.module.css";

const TextBox = (props) => {
  const { onIconClick, className, inputClass, inputRef, label, onChange } =
    props;
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsActive(false);
  };

  const handleIconClick = () => {
    setIsFocused(false);
    setIsActive(false);
    if (onIconClick && typeof onIconClick === "function") {
      onIconClick();
    }
  };

  return (
    <Container
      alignBox="column"
      isCover={false}
      className={className && className}
    >
      <Box>{label}</Box>
      <Box className={`${style.textBox} ${isActive ? style.active : ""}`}>
        <Container align="vertical" alignBox="row">
          <Box flexible>
            <input
              type="text"
              className={`${style.input} ${inputClass}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={inputRef}
              onChange={onChange}
            />
          </Box>
          {isFocused && (
            <Box className={style.icon} onClick={handleIconClick}>
              <Tooltip title="Click to save">
                <DoneIcon />
              </Tooltip>
            </Box>
          )}
        </Container>
      </Box>
    </Container>
  );
};

TextBox.propTypes = {
  onIconClick: PropTypes.func,
  className: PropTypes.string,
  inputClass: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onChange: PropTypes.func,
  label: PropTypes.func,
};

export default TextBox;
