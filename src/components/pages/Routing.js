// src/components/Routing.js
import React, { useState } from "react";
import { Container, Box } from "../../components/common/Layout";
import LoginPage from "../pages/LoginPage/LoginPage";
import ContactDetailPage from "./ContactDetailPage/ContactDetailPage";
import ContactHomePage from "./ContactHomePage";
import Parcasepage from "../pages/ParcasePage/ParcasePage";

const Routing = () => {
  const [route, setRoute] = useState("home");

  const navigate = (newRoute) => {
    setRoute(newRoute);
    window.history.pushState(null, null, `/${newRoute}`);
  };

  return (
    <div>
      <nav>
        <button onClick={() => navigate("home")}>Contact</button>
        <button onClick={() => navigate("about")}>About</button>
      </nav>
      <div></div>
    </div>
  );
};

export default Routing;
