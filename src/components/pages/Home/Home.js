import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { Button } from "antd";
import { Container, Box } from "../../common/Layout";
import { logout } from "../../actions/authAction";
import AlertModel from "../../common/AlertModel/AlertModel";
import ContactsIcon from "@mui/icons-material/Contacts";
import NoteIcon from "@mui/icons-material/Note";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlipToBackIcon from "@mui/icons-material/FlipToBack";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Tooltip } from "antd";
import style from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("contacts");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [isLeftPanelExpanded, setLeftPanelExpanded] = useState(() => {
    const storedValue = localStorage.getItem("isLeftPanelExpanded");
    const defaultValue = true;
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.Name) {
      setUserName(userInfo.Name);
      setUserEmail(userInfo.EMail);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "isLeftPanelExpanded",
      JSON.stringify(isLeftPanelExpanded)
    );
  }, [isLeftPanelExpanded]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutAlert(false);
  };

  const handleConfirmLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/reactcaps");
    setShowLogoutAlert(false);
  };

  const toggleLeftPanel = () => {
    setLeftPanelExpanded((prevExpanded) => {
      const newExpanded = !prevExpanded;
      localStorage.setItem("isLeftPanelExpanded", JSON.stringify(newExpanded));
      return newExpanded;
    });
  };
  return (
    <Container alignBox="column" className={style.Container}>
      <Box className={style.header}>
        <Container alignBox="row">
          <Box className={style.logo}>
            <Container align="both">
              <span>Capstone</span>
            </Container>
          </Box>
          <Box flexible>
            <Container
              align="vertical"
              alignBox="row"
              className={style.headCon}
            >
              <Box flexible>
                <Container
                  alignBox="row"
                  align="vertical"
                  className={style.data}
                >
                  {/* <Avatar
                    style={{
                      backgroundColor: "#8f9eaa",
                    }}
                    icon={<UserOutlined />}
                  />
                  <div>{userName} </div> */}
                </Container>
              </Box>
              <Box>
                <Button type="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>
      <Box flexible className={style.wraper}>
        <Container alignBox="row">
          {isLeftPanelExpanded ? (
            <Box className={style.lhs}>
              <Container alignBox="column" className={style.gap}>
                <Link
                  to="/reactcaps/home"
                  className={`${style.lhsitem} ${
                    activeTab === "contacts" && style.selected
                  }`}
                  onClick={() => handleTabClick("contacts")}
                >
                  Contact Information
                </Link>
                <Link
                  // to="parcase"
                  className={`${style.lhsitem}`}
                  // onClick={() => handleTabClick("parcase")}
                >
                  Purchases
                </Link>
                <Link
                  // to="parcase"
                  className={`${style.lhsitem}`}
                  // onClick={() => handleTabClick("parcase")}
                >
                  Notes And Tasks
                </Link>

                <Link
                  // to="parcase"
                  className={`${style.lhsitem}`}
                  // onClick={() => handleTabClick("parcase")}
                >
                  Calendar
                </Link>
              </Container>
              <div className={style.toggleButton} onClick={toggleLeftPanel}>
                {isLeftPanelExpanded ? (
                  <Tooltip title="Collapse">
                    <KeyboardDoubleArrowLeftIcon
                      style={{ color: "#adb3b8", fontSize: "35px" }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Expand">
                    <KeyboardDoubleArrowRightIcon
                      style={{ color: "#adb3b8", fontSize: "35px" }}
                    />
                  </Tooltip>
                )}
              </div>
            </Box>
          ) : (
            <Box className={`${style.lhs} ${style.colsWidth}`}>
              <Container alignBox="column" className={style.gap}>
                <Link
                  to="/reactcaps/home"
                  className={`${style.lhsitem} ${
                    activeTab === "contacts" && style.selected
                  }`}
                  onClick={() => handleTabClick("contacts")}
                >
                  <Tooltip title="Contact Information">
                    <ContactsIcon />
                  </Tooltip>
                </Link>
                <Link className={`${style.lhsitem} `}>
                  <Tooltip title="Purchases">
                    <FlipToBackIcon />
                  </Tooltip>
                </Link>
                <Link className={`${style.lhsitem}`}>
                  <Tooltip title="Notes and Tasks">
                    <NoteIcon />
                  </Tooltip>
                </Link>
                <Link className={`${style.lhsitem} `}>
                  <Tooltip title="Calendar">
                    <CalendarMonthIcon />
                  </Tooltip>
                </Link>
              </Container>
              <div className={style.toggleButton} onClick={toggleLeftPanel}>
                {isLeftPanelExpanded ? (
                  <Tooltip title="Collapse">
                    <KeyboardDoubleArrowLeftIcon
                      style={{ color: "#adb3b8", fontSize: "35px" }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Expand">
                    <KeyboardDoubleArrowRightIcon
                      style={{ color: "#adb3b8", fontSize: "35px" }}
                    />
                  </Tooltip>
                )}
              </div>
            </Box>
          )}

          <Box flexible>
            <Outlet />
          </Box>
        </Container>
      </Box>
      <AlertModel
        top={20}
        title="Logout Confirmation"
        onLogout={handleConfirmLogout}
        onCancel={handleCancelLogout}
        visible={showLogoutAlert}
      >
        <p>Are you sure you want to logout?</p>
      </AlertModel>
    </Container>
  );
};

export default Home;
