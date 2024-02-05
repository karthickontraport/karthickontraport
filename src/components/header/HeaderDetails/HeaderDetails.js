import React from "react";
import { Container, Box } from "../../common/Layout";
import TableViewIcon from "@mui/icons-material/TableView";
import GridViewIcon from "@mui/icons-material/GridView";
import style from "./HeaderDetails.module.css";

const HeaderDetails = ({ handleViewChange, currentView }) => {
  return (
    <Container alignBox="row" className={style.Container} align="vertical">
      <Box flexible className={style.head}>
        Contacts
      </Box>
      <Box>
        <Container alignBox="row" align="vertical">
          <Box className={style.viewtxt}>View :</Box>
          <Box className={style.btnBox}>
            <Container alignBox="row" align="vertical">
              <button
                className={`${style.btn} ${
                  currentView === "table" && style.selected
                }`}
                onClick={() => handleViewChange("table")}
              >
                <TableViewIcon />
              </button>
              <button
                className={`${style.btn} ${
                  currentView === "card" && style.selected
                }`}
                onClick={() => handleViewChange("card")}
              >
                <GridViewIcon />
              </button>
            </Container>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default HeaderDetails;
