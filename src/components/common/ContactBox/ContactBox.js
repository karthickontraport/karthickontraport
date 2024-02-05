import React from "react";
import PropTypes from "prop-types";
import { Container, Box } from "../Layout";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import IconButton from "../IconButton/IconButton";
import style from "./ContactBox.module.css";

const ContactBox = (props) => {
  const { heading, actionBtnText, children, needSelect, handleAddNote } = props;

  return (
    <Container alignBox="column" className={style.Container}>
      <Box className={style.header}>
        <Container alignBox="vertical" align="between">
          <Box>
            <Container
              alignBox="row"
              align="vertical"
              className={style.actions}
            >
              <Box className={style.heading}>{heading}</Box>

              {actionBtnText ? (
                <Box>
                  <Button variant="contained" onClick={handleAddNote}>
                    {actionBtnText}
                  </Button>
                </Box>
              ) : (
                ""
              )}

              {needSelect && (
                <Box>
                  <Form.Select aria-label="Actions">
                    <option>Actions</option>
                    <option value="1">Edit</option>
                    <option value="2">Delete</option>
                  </Form.Select>
                </Box>
              )}
            </Container>
          </Box>
          <Box>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
      <Box flexible className={style.child}>
        {children}
      </Box>
    </Container>
  );
};

ContactBox.propTypes = {
  heading: PropTypes.string.isRequired,
  actionBtnText: PropTypes.string.isRequired,
  children: PropTypes.node,
  needSelect: PropTypes.bool.isRequired,
  handleAddNote: PropTypes.func,
};

ContactBox.defaultProps = {
  heading: "Default Heading",
  needSelect: false,
};

export default ContactBox;
