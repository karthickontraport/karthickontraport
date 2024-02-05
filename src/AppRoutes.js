import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import ContactDetailPage from "./components/pages/ContactDetailPage/ContactDetailPage";
import ContactHomePage from "./components/pages/ContactHomePage";
import ParcasePage from "./components/pages/ParcasePage/ParcasePage";

const AppRoutes = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("home");
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />}>
        <Route index element={<ContactHomePage />} />
        <Route path="parcase" element={<ParcasePage />} />
        <Route
          path="editcontacts"
          element={<ContactDetailPage handleBackClick={handleBackClick} />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
