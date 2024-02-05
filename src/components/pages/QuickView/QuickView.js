import React from "react";
import { Container, Box } from "../../common/Layout";
import ContactHeader from "../../common/ContactHeader/ContactHeader";
import style from "./QuickView.module.css";

const QuickView = () => {
  return (
    <Container>
      <Box>
        <ContactHeader className={style.Container} />
      </Box>
      <Box>jernjernfn</Box>
    </Container>
  );
};

export default QuickView;
