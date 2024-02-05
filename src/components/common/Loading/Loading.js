import React from "react";
import { Container } from "../Layout";
import style from "./Loading.module.css";

const loading = () => {
  return (
    <Container align="both" className={style.Container}>
      <span className={style.loader}></span>
    </Container>
  );
};

export default loading;
