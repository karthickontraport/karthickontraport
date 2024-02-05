import React from "react";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { LoginProps as propTypes } from "./props/propTypes";
import { LoginDefaultProps as defaultProps } from "./props/defaultProps";
import { Container, Box } from "../../common/Layout";
import style from "./Login.module.css";

const Login = (props) => {
  const {
    onSubmit,
    EmailPlaceHolder,
    EmailHtmlId,
    PasswordHtmlId,
    KeyPlaceHolder,
    HeadingText,
    emailValue,
    emailOnChange,
    passwordValue,
    passwordOnChange,
    buttonDisabled,
    buttonText,
    errorText,
  } = props;

  const formStyle = {
    width: "100%",
    fontSize: "11px",
  };
  const buttonStyle = {
    width: "100%",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Container isCover={false}>
      <Box>
        <Container
          alignBox="column"
          tagName="form"
          onSubmit={onSubmit}
          className={style.container}
        >
          <Box className={`${style.commomSpace} ${style.heading}`}>
            {HeadingText}
          </Box>
          {errorText && <Box className={style.errorText}>{errorText}</Box>}
          <Box className={style.commomSpace}>
            <TextField
              id={EmailHtmlId}
              placeholder={EmailPlaceHolder}
              value={emailValue}
              size="small"
              style={formStyle}
              error={!!errorText}
              onChange={emailOnChange}
              inputProps={{ style: { fontSize: "var(--size-14)" } }}
              // type='email'
            />
          </Box>
          <Box className={style.commomSpace}>
            <TextField
              id={PasswordHtmlId}
              placeholder={KeyPlaceHolder}
              value={passwordValue}
              size="small"
              error={!!errorText}
              onChange={passwordOnChange}
              inputProps={{ style: { fontSize: "var(--size-14)" } }}
              style={formStyle}
              type="password"
            />
          </Box>

          <Box className={`${style.btnBox}`}>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              style={buttonStyle}
              disabled={buttonDisabled}
            >
              {buttonDisabled ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
              <span className={buttonDisabled ? style.space : ""}>
                {buttonText}
              </span>
            </Button>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default Login;
Login.defaultProps = defaultProps;
Login.propTypes = propTypes;
