import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Container, Box } from "../../common/Layout";
import style from "./Home.module.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("contacts");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container alignBox="row" className={style.Container}>
      <Box className={style.lhs}>
        <Container alignBox="column" className={style.gap}>
          <Link
            to="/home"
            className={`${style.lhsitem} ${
              activeTab === "contacts" && style.selected
            }`}
            onClick={() => handleTabClick("contacts")}
          >
            Contacts
          </Link>

          <Link
            to="parcase"
            className={`${style.lhsitem} ${
              activeTab === "parcase" && style.selected
            }`}
            onClick={() => handleTabClick("parcase")}
          >
            Parcase
          </Link>
        </Container>
      </Box>

      <Box flexible>
        <Outlet />
      </Box>
    </Container>
  );
};

export default Home;
