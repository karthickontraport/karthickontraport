import React from "react";
import { Container, Box } from "../common/Layout";
import { QuestionCircleOutlined } from "@ant-design/icons";
import style from "./common.module.css";

const QuickViewField = (props) => {
  const { title, value, needPlaceholder, needActiveTxt, needIcon } = props;
  return (
    <Container align="vertical" alignBox="row" className={style.qFields}>
      <Box className={style.qtitle}>
        {title}
        {needIcon && (
          <i style={{ color: "#4096ff", marginLeft: "5px" }}>
            <QuestionCircleOutlined />
          </i>
        )}
      </Box>
      <Box
        flexible
        className={`${style.qvalue} ${needPlaceholder && style.qPlace} ${
          needActiveTxt && style.qActiveTxt
        }`}
      >
        {value}
      </Box>
    </Container>
  );
};

export default QuickViewField;
