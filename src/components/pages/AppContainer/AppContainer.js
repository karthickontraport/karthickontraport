import React from "react";
import { Container, Box } from "../../common/Layout";
import Navbar from "../../Navbar/Navbar";
import ContactPage from "../ContactPage/ContactPage";
import ParcasePage from "../ParcasePage/ParcasePage";
import style from "./AppContainer.module.css";

const AppContainer = (children) => {
  return (
    <Container alignBox="row">
      <Box>
        <Navbar />
      </Box>
      <Box flexible>{children}</Box>
    </Container>
  );
};

export default AppContainer;
