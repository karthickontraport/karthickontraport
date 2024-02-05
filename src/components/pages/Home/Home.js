import React, { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { Button, Flex } from "antd";
import { Container, Box } from "../../common/Layout";
import { logout } from "../../actions/authAction";
import AlertModel from "../../common/AlertModel/AlertModel";
import ContactsIcon from "@mui/icons-material/Contacts";
import NoteIcon from "@mui/icons-material/Note";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlipToBackIcon from "@mui/icons-material/FlipToBack";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Tooltip } from "antd";
import Drawer from "../../common/CustomDrawer/CustomDrawer";
import CustomCard from "../../common/CustomCard/CustomCard";
import style from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("contacts");
  // const [userName, setUserName] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [isLeftPanelExpanded, setLeftPanelExpanded] = useState(() => {
    const storedValue = localStorage.getItem("isLeftPanelExpanded");
    const defaultValue = true;
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  console.log("customerId", customerId);
  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };
  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   if (userInfo && userInfo.Name) {
  //     setUserName(userInfo.Name);
  //     setUserEmail(userInfo.EMail);
  //   }
  // }, []);
  useEffect(() => {
    const storedCustomerId = localStorage.getItem("currentCustomerID");
    console.log("storedCustomerId", storedCustomerId);

    if (storedCustomerId !== null) {
      console.log("Setting customerId:", storedCustomerId);
      setCustomerId(storedCustomerId);
    }
  }, [localStorage.getItem("currentCustomerID")]);

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

  const notifiction = [
    {
      notification_id: 1,
      title: "Capstone Project Deadline",
      message: "Reminder: Submit your capstone project by 5 PM tomorrow.",
      timestamp: "2024-01-26T16:00:00",
      priority: "high",
    },
    {
      notification_id: 2,
      title: "Capstone Presentation Schedule",
      message:
        "Check your schedule for the capstone project presentations on Friday.",
      timestamp: "2024-01-28T10:30:00",
      priority: "medium",
    },
    {
      notification_id: 3,
      title: "Capstone Feedback Available",
      message:
        "Your capstone project feedback is now available. Log in to view the comments.",
      timestamp: "2024-01-30T09:15:00",
      priority: "high",
    },
    {
      notification_id: 4,
      title: "Capstone Awards Ceremony",
      message:
        "Save the date: Capstone Awards Ceremony on February 5th. Check your email for details.",
      timestamp: "2024-02-01T14:00:00",
      priority: "medium",
    },
    {
      notification_id: 5,
      title: "Capstone Peer Review",
      message:
        "Complete the peer review for your fellow capstone projects by February 10th.",
      timestamp: "2024-02-10T12:00:00",
      priority: "low",
    },
  ];

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
              <Box>
                <Button
                  type="primary"
                  icon={<NotificationsIcon />}
                  onClick={handleDrawerOpen}
                />
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

                {customerId && (
                  <Link
                    to="calendar"
                    className={`${style.lhsitem} ${
                      activeTab === "calendar" && style.selected
                    }`}
                    onClick={() => handleTabClick("calendar")}
                  >
                    Calendar
                  </Link>
                )}
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

                {customerId && (
                  <Link
                    to="calendar"
                    className={`${style.lhsitem} ${
                      activeTab === "calendar" && style.selected
                    }`}
                    onClick={() => handleTabClick("calendar")}
                  >
                    <Tooltip title="Calendar">
                      <CalendarMonthIcon />
                    </Tooltip>
                  </Link>
                )}
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
      <Drawer
        title="Notification"
        onClose={handleDrawerClose}
        visible={drawerVisible}
        extra={<Button onClick={handleDrawerClose} icon={<CloseOutlined />} />}
      >
        <Flex gap={10} vertical>
          {notifiction.map((notification) => (
            <CustomCard key={notification.notification_id}>
              <div>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  sx={{ fontSize: 16 }}
                >
                  {notification.title}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {notification.message}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {notification.timestamp}
                </Typography>
              </div>
            </CustomCard>
          ))}
        </Flex>
      </Drawer>
    </Container>
  );
};

export default Home;
