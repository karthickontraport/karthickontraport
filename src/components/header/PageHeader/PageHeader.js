import React from "react";
import { Container, Box } from "../../common/Layout";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import style from "./PageHeader.module.css";

const PageHeader = ({ onChange, onClick }) => {
  return (
    <Container alignBox="row" align="vertical" className={style.Container}>
      <Box flexible>
        <Button variant="contained" onClick={onClick}>
          Add Contact
        </Button>
      </Box>
      <Box>
        <TextField
          label=""
          variant="outlined"
          placeholder="search Contact"
          InputProps={{
            endAdornment: (
              <SearchIcon sx={{ color: "action.active", marginLeft: 1 }} />
            ),
          }}
          sx={{
            width: "300px",
            marginLeft: "10px",
            "& input": { padding: "10px" }, // Set input padding
          }}
          onChange={onChange}
        />
      </Box>
    </Container>
  );
};

export default PageHeader;
