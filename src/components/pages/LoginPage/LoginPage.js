import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../../../components/actions/authAction";
import LoginForm from "../../form/Login/Login";
import { Container, Box } from "../../common/Layout";
import style from "./LoginPage.module.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      email: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      password: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      dispatch(login(credentials.email, credentials.password));
    }
  };

  useEffect(() => {
    if (success && !showSuccess) {
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 1300,
      });
      setShowSuccess(true);
      navigate("/home");
    }
    if (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
        autoClose: 1300,
      });
    }
  }, [success, error, showSuccess]);

  return (
    <Container align="both">
      <Box className={style.container}>
        <LoginForm
          onSubmit={handleSubmit}
          emailOnChange={handleEmailChange}
          passwordOnChange={handlePasswordChange}
          emailValue={credentials.email}
          passwordValue={credentials.password}
          buttonDisabled={loading}
          buttonText={loading ? "Logging in..." : "Login"}
          errorText={error}
        />
      </Box>
    </Container>
  );
};

export default LoginPage;
