import React from "react";
import PropTypes from "prop-types";
import { Container, Box } from "../Layout";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Flex } from "antd";
import IconButton from "../IconButton/IconButton";
import style from "./ContactBox.module.css";

const ContactBox = ({
  heading,
  actionBtnText,
  children,
  needSelect,
  handleShowNoteModel,
  scroll,
  onEdit,
  onDelete,
  className,
  deleteLoding,
}) => {
  return (
    <Container
      alignBox="column"
      className={`${style.Container} ${className && className}`}
    >
      <Box className={style.header}>
        <Container alignBox="row" align="between">
          <Box>
            <Container
              alignBox="row"
              align="vertical"
              className={style.actions}
            >
              <Box className={style.heading}>{heading}</Box>

              {actionBtnText && (
                <Box>
                  <Button type="primary" onClick={handleShowNoteModel}>
                    {actionBtnText}
                  </Button>
                </Box>
              )}

              {needSelect && (
                <Box>
                  <Flex gap="small">
                    <Button onClick={onEdit}>Edit</Button>
                    <Button onClick={onDelete}>
                      {deleteLoding ? "Deleting..." : "Delete"}
                    </Button>
                  </Flex>
                </Box>
              )}
            </Container>
          </Box>
          {/* <Box>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box> */}
        </Container>
      </Box>
      <Box flexible className={style.child} scroll={scroll}>
        {children}
      </Box>
    </Container>
  );
};

ContactBox.propTypes = {
  heading: PropTypes.string.isRequired,
  actionBtnText: PropTypes.string,
  children: PropTypes.node,
  needSelect: PropTypes.bool.isRequired,
  handleShowNoteModel: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  className: PropTypes.string,
  deleteLoding: PropTypes.bool,
};

ContactBox.defaultProps = {
  heading: "Default Heading",
  needSelect: false,
};

export default ContactBox;
