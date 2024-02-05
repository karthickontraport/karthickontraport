import React from "react";
import PropTypes from "prop-types";
import { Container, Box } from "../Layout";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";

import style from "./ActionsModel.module.css";

const ActionsModel = (props) => {
  const { title, children, onClose, cancelText, saveText, mailText,onSave } = props;

  const Header = () => {
    return (
      <>
        <Box onClick={onClose} className={style.backIcon}>
          <Tooltip title="Back">
            <Container align="both">
              <LeftOutlined />
            </Container>
          </Tooltip>
        </Box>
        <Box flexible className={style.text}>
          {title}
        </Box>
        <Box>
          <Flex gap="small" wrap="wrap">
            <Button onClick={onClose}>{cancelText}</Button>
            <Button type="primary" onClick={onSave}>{saveText}</Button>
            {mailText && <Button type="primary">{mailText}</Button>}
          </Flex>
        </Box>
      </>
    );
  };

  return (
    <Container className={style.Container}>
      <Box className={style.Header}>
        <Container alignBox="row" align="vertical">
          {Header()}
        </Container>
      </Box>
      <Box flexible className={style.children}>
        {children}
      </Box>
    </Container>
  );
};

ActionsModel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  saveText: PropTypes.string,
  onSave:PropTypes.func
};

ActionsModel.defaultProps = {
  cancelText: "Cancel",
  saveText: "Assign",
};

export default ActionsModel;
