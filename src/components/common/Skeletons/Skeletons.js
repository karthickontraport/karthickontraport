import React from "react";
import { Container, Box } from "../Layout";
import Spinner from "react-bootstrap/Spinner";

const Skeletons = () => {
  return (
    <Container align="both">
      <Box>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="dark" />
      </Box>
    </Container>
  );
};

export default Skeletons;
