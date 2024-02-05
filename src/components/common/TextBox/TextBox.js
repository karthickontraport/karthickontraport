// TextBox.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Box } from "../../common/Layout";
import DoneIcon from "@mui/icons-material/Done";
import Tooltip from "@mui/material/Tooltip";
import Spinner from "react-bootstrap/Spinner";
import style from "./TextBox.module.css";

const TextBox = (props) => {
  const {
    handleSave,
    className,
    inputClass,
    inputRef,
    label,
    onChange,
    isChanged,
    value,
    name,
    disabled,
    loading,
    success,
    error,
    mandatory,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsActive(false);
  };

  const handleSaveClick = () => {
    handleSave();
  };

  useEffect(() => {
    if (success && isChanged) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }
  }, [success, isChanged]);

  return (
    <Container
      alignBox="column"
      isCover={false}
      className={`${className} ${disabled && style.disabled} ${
        style.Container
      } ${isActive ? style.bgActive : ""} ${!isActive && style.hover} `}
    >
      <Box className={style.label}>
        <label className={`${style.labelEle} ${mandatory && style.mandatory}`}>
          {label}
          {mandatory && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="5"
              fill="hsla(0,71.91%,calc(53.92% + calc(0 * 1%) ), calc(1 + 0 ))"
              className={style.svg}
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
            </svg>
          )}
        </label>
      </Box>
      <Box className={`${style.textBox} ${isActive ? style.active : ""}`}>
        <Container align="vertical" alignBox="row">
          <Box flexible>
            <input
              id={name}
              type="text"
              className={`${style.input} ${inputClass} ${
                disabled && style.disabled
              }`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={inputRef}
              onChange={onChange}
              value={value}
              disabled={disabled}
            />
          </Box>

          {!loading && isChanged && (
            <Box className={style.icon} onClick={handleSaveClick}>
              <Tooltip title="Click to save">Save</Tooltip>
            </Box>
          )}
          {loading ? (
            <Spinner animation="border" variant="success" size="sm" />
          ) : (
            ""
          )}
        </Container>
      </Box>
      {showSuccess ? <p className={style.success}>Successfully updated</p> : ""}
      {error ? <p>Error updating field</p> : ""}
    </Container>
  );
};

TextBox.propTypes = {
  handleSave: PropTypes.func,
  className: PropTypes.string,
  inputClass: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  success: PropTypes.bool,
  isChanged: PropTypes.bool,
  error: PropTypes.bool,
  mandatory: PropTypes.bool,
};

export default TextBox;
