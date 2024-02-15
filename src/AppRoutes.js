import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { Container } from "./components/common/Layout";
import Home from "./components/pages/Home/Home";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import ContactDetailPage from "./components/pages/ContactDetailPage/ContactDetailPage";
import ContactHomePage from "./components/pages/ContactHomePage";
import ParcasePage from "./components/pages/ParcasePage/ParcasePage";
import AddForm from "./components/pages/ContactDetailPage/AddForm";
import CalendarPage from "./components/pages/CalendarPage/CalendarPage";
import { fetchData } from "./components/actions/contactListAction";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackHomeClick = () => {
    navigate("/reactcaps/home");
  };

  return (
    <Container align="both">
      <Result
        status="404"
        title="404 - Page Not Found"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleBackHomeClick}>
            Back Home
          </Button>
        }
      />
    </Container>
  );
};

const AppRoutes = () => {
  const navigate = useNavigate();
  const handleBackClick = async () => {
    try {
      const data = await fetchData();
      console.log("Data fetched:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    navigate("reactcaps/home");

    document.getElementById("Lhs").style.display = "none";
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const isAuthenticated = userInfo && userInfo.Status === "Success";

    if (!isAuthenticated) {
      navigate("/reactcaps");
    }
  }, [navigate]);
  const onCancelAddForm = () => {
    navigate("reactcaps/home");
  };
  return (
    <Routes>
      <Route path="/reactcaps" element={<LoginPage />} />
      <Route path="reactcaps/home" element={<Home />}>
        <Route index element={<ContactHomePage />} />
        <Route path="parcase" element={<ParcasePage />} />
        <Route
          path="addContacts"
          element={
            <AddForm onCancel={onCancelAddForm} onSave={onCancelAddForm} />
          }
        />
        <Route
          path="contactDetailes/:id"
          element={<ContactDetailPage handleBackClick={handleBackClick} />}
        />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
