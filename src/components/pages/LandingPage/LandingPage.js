import React from "react";
import { Container, Box } from "../../common/Layout";
import style from "./LandingPage.module.css";

const LandingPage = ({ lhs, content }) => {
  return (
    <Container alignBox="row">
      <Box>{lhs}</Box>
      <Box flexible>{content}</Box>
    </Container>
  );
};

export default LandingPage;
