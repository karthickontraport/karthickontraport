import React, { useEffect, useState } from "react";
import { Container, Box } from "../common/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  LinkedinOutlined,
  FacebookOutlined,
  CloseOutlined,
  TwitterOutlined,
  SettingOutlined,
  InstagramOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  PlusOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Empty } from "antd";
import { Avatar, Button, Tooltip } from "antd";
import { fetchData } from "../actions/contactListAction";
import { fetchClientData } from "../actions/dataViewAction";
import QuickViewField from "./QuickViewField";
import LoadingSpin from "../common/Loading/Loading";
import Skeleton from "@mui/material/Skeleton";
import QuickViewNotes from "./QuickViewNotes";
import style from "./common.module.css";

const QuickViewPage = React.memo((props) => {
  const { headerText, handlePageClose, userName, avatarText } = props;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});
  const { loading, data } = useSelector((state) => state.data);
  const { cliData, cliLoading } = useSelector((state) => state.clientData);
  const clientId = localStorage.getItem("currentCustomerID");

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data]);

  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      if (clientId) {
        try {
          await dispatch(fetchClientData(clientId));
        } catch (error) {
          console.error("Error fetching client data:", error);
        }
      }
    };

    fetchData();
  }, [dispatch, clientId]);

  useEffect(() => {
    if (cliData && cliData.length > 0) {
      const initialData = cliData[0];

      const capitalizedInitialData = {};
      Object.keys(initialData).forEach((fieldName) => {
        const fieldValue = initialData[fieldName];

        if (typeof fieldValue === "string" && fieldName !== "PriEMail") {
          capitalizedInitialData[fieldName] =
            fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
        } else {
          capitalizedInitialData[fieldName] = fieldValue;
        }
      });

      setFormData(capitalizedInitialData);
      setInitialFormData(capitalizedInitialData);
    }
  }, [cliData]);

  const handleNext = () => {
    const currentCustomerId = localStorage.getItem("currentCustomerID");
    const currentIndex = localData.findIndex(
      (customer) => customer.CustomerID === currentCustomerId
    );

    if (currentIndex !== -1 && currentIndex + 1 < localData.length) {
      const nextCustomerId = localData[currentIndex + 1].CustomerID;
      localStorage.setItem("currentCustomerID", nextCustomerId);
      dispatch(fetchClientData(nextCustomerId));

      const nextCustomer = localData[currentIndex + 1];
      setFormData({
        FirstName: nextCustomer.FirstName,
        LastName: nextCustomer.LastName,
        Email: nextCustomer.Email,
      });
    }
  };

  const handlePrevious = () => {
    const currentCustomerId = localStorage.getItem("currentCustomerID");
    const currentIndex = localData.findIndex(
      (customer) => customer.CustomerID === currentCustomerId
    );

    if (currentIndex !== -1 && currentIndex - 1 >= 0) {
      const previousCustomerId = localData[currentIndex - 1].CustomerID;
      localStorage.setItem("currentCustomerID", previousCustomerId);

      dispatch(fetchClientData(previousCustomerId));

      const previousCustomer = localData[currentIndex - 1];
      setFormData({
        FirstName: previousCustomer.FirstName,
        LastName: previousCustomer.LastName,
        Email: previousCustomer.Email,
      });
    }
  };

  const linkedinUrl =
    formData?.FirstName && formData?.LastName
      ? `https://www.linkedin.com/pub/dir?firstName=${formData?.FirstName}&lastName=${formData?.LastName}&trk=people-guest_people-search-bar_search-submit`
      : "https://in.linkedin.com/";

  return (
    <>
      {loading ? (
        <Container align="both" className={style.quickContainer}>
          <LoadingSpin />
        </Container>
      ) : (
        <Container className={style.quickContainer}>
          <Box className={style.quickHeader}>
            <Container alignBox="row">
              <Box onClick={handlePageClose} className={style.qClose}>
                <Container align="both">
                  <Tooltip title="Close">
                    {" "}
                    <CloseOutlined />
                  </Tooltip>
                </Container>
              </Box>
              <Box flexible>
                <Container
                  align="vertical"
                  alignBox="row"
                  className={style.qhMid}
                >
                  <Box className={style.qHeaderText} flexible>
                    {cliLoading ? (
                      <div
                        style={{
                          backgroundColor: cliLoading && "#a6abb0",
                          borderRadius: "4px",
                          width: "210px",
                        }}
                      >
                        <Skeleton width={210} />
                      </div>
                    ) : (
                      headerText
                    )}
                  </Box>
                  <Box>
                    <Container
                      alignBox="row"
                      align="vertical"
                      className={style.qhRight}
                    >
                      <Tooltip title="Go To Previous  Contact">
                        <Button type="primary" onClick={handlePrevious}>
                          Previous
                        </Button>
                      </Tooltip>
                      <Tooltip title="Go To Next  Contact">
                        <Button
                          className={style.qNext}
                          type="primary"
                          onClick={handleNext}
                        >
                          Next
                        </Button>
                      </Tooltip>
                    </Container>
                  </Box>
                </Container>
              </Box>
            </Container>
          </Box>
          <Box flexible className={style.qWraper}>
            <Container alignBox="row" className={style.qContent}>
              <Box className={style.qInfo}>
                <Container className={style.qBox}>
                  <Box className={style.qUser}>
                    <Container align="both">
                      <div style={{ textAlign: "center" }}>
                        <Avatar
                          size={100}
                          style={{
                            backgroundColor: "#4096ff",
                            color: "#fff",
                            marginBottom: "5px",
                            fontSize: "30px",
                            textTransform: "uppercase",
                          }}
                        >
                          {avatarText}
                        </Avatar>
                        <div className={style.mb15}>
                          {" "}
                          {cliLoading ? <Skeleton /> : userName}{" "}
                        </div>
                        <div className={`${style.mb15} ${style.qdec}`}>
                          No title or company yet
                        </div>
                        <Container
                          alignBox="row"
                          align="both"
                          isCover={false}
                          className={style.qcall}
                        >
                          <Tooltip title="Email">
                            <i>
                              <a
                                href={`mailto:${formData?.PriEMail}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <MailOutlined />
                              </a>
                            </i>
                          </Tooltip>
                          <Tooltip title="Message">
                            <i>
                              <MessageOutlined />
                            </i>
                          </Tooltip>
                          <Tooltip title="call">
                            <i>
                              <a href={`tel:${formData?.Phone}`}>
                                {" "}
                                <PhoneOutlined />
                              </a>
                            </i>
                          </Tooltip>
                        </Container>
                      </div>
                    </Container>
                  </Box>
                  <Box
                    flexible
                    scroll="vertical"
                    style={{ padding: " 0 15px" }}
                  >
                    <div>
                      <QuickViewField
                        title="Mobile Number"
                        value="Sms"
                        needPlaceholder
                      />
                    </div>
                    <div>
                      <QuickViewField
                        title="Office Phone"
                        value={formData?.Phone}
                      />
                    </div>
                    <div>
                      <QuickViewField
                        title="Fax"
                        value="Phone Number"
                        needPlaceholder
                      />
                    </div>
                    <div>
                      <QuickViewField
                        title="Email"
                        value={cliLoading ? <Skeleton /> : formData?.PriEMail}
                      />
                    </div>
                    <div>
                      <QuickViewField
                        title="Timezone"
                        value="Timezone"
                        needPlaceholder
                      />
                    </div>
                    <div>
                      <QuickViewField title="Owner" value="Me" needActiveTxt />
                    </div>
                    <div>
                      <QuickViewField
                        title="Last Activity"
                        value="100 weeks ago"
                      />
                    </div>
                  </Box>
                  <Box>
                    <Container
                      align="around"
                      alignBox="row"
                      className={style.qSocial}
                    >
                      <Tooltip title="Facebook">
                        <i>
                          <FacebookOutlined />
                        </i>
                      </Tooltip>
                      <Tooltip title="Twitter">
                        <i>
                          <TwitterOutlined />
                        </i>
                      </Tooltip>
                      <Tooltip title="Instagram">
                        <i>
                          <InstagramOutlined />
                        </i>
                      </Tooltip>
                      <Tooltip title="linkedin">
                        <i>
                          <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#a6abb0" }}
                          >
                            <LinkedinOutlined />
                          </a>
                        </i>
                      </Tooltip>
                      <Tooltip title="Settings">
                        <i>
                          <SettingOutlined />
                        </i>
                      </Tooltip>
                    </Container>
                  </Box>
                </Container>
              </Box>
              <Box className={style.qField}>
                <Container>
                  <Box className={style.qFieldHead}>Contact Fields</Box>
                  <Box
                    flexible
                    scroll="vertical"
                    style={{ padding: " 0 15px" }}
                  >
                    <div>
                      <QuickViewField
                        title="First Name"
                        value={cliLoading ? <Skeleton /> : formData?.FirstName}
                      />
                    </div>
                    <div>
                      <QuickViewField
                        title="Last Name"
                        value={cliLoading ? <Skeleton /> : formData?.LastName}
                      />
                    </div>

                    <div>
                      <QuickViewField
                        title="Email"
                        value={cliLoading ? <Skeleton /> : formData?.PriEMail}
                      />
                    </div>
                    <div>
                      <QuickViewField
                        title="Bulk Email Status"
                        value="Single Opt-in"
                        needIcon
                      />
                    </div>
                    <div>
                      <QuickViewField
                        title="Date Added"
                        value="12/23/2019 8:18 PM"
                      />
                    </div>
                    <div>
                      <QuickViewField title="Score" value="0 (0%)" />
                    </div>
                    <div>
                      <QuickViewField
                        title="Last Activity"
                        value="10/25/2021 8:50 PM"
                      />
                    </div>
                    <div>
                      <QuickViewField title="Owner" value="me" needActiveTxt />
                    </div>
                    <div>
                      <QuickViewField
                        title="Date Modified"
                        value="3/31/2021 11:49 PM"
                      />
                    </div>
                  </Box>
                  <Box
                    style={{
                      textAlign: "right",
                      paddingRight: "10px",
                      cursor: "pointer",
                    }}
                    className={style.qSocial}
                  >
                    <Tooltip title="Settings">
                      <i>
                        <SettingOutlined />
                      </i>
                    </Tooltip>
                  </Box>
                </Container>
              </Box>
              <Box className={style.qNote}>
                <Container style={{ gap: "15px" }}>
                  <Box>
                    <QuickViewNotes />
                  </Box>
                  <Box>
                    <Container className={style.qNoteBox} isCover={false}>
                      <Box className={style.noteBoxHead}>
                        <Container alignBox="row" align="vertical">
                          <Box flexible>Tasks(0)</Box>
                          <Box>
                            <Tooltip title="Add Task">
                              <Button type="primary" icon={<PlusOutlined />} />
                            </Tooltip>
                          </Box>
                        </Container>
                      </Box>
                      <Box className={style.qNoteContent}>
                        <Empty
                          description={
                            <span
                              style={{ fontSize: "14px", color: "#bababa" }}
                            >
                              There are no items to display
                            </span>
                          }
                        />
                      </Box>
                    </Container>
                  </Box>
                  <Box>
                    <Container className={style.qNoteBox} isCover={false}>
                      <Box className={style.noteBoxHead}>
                        <Container alignBox="row" align="vertical">
                          <Box flexible>Calendar</Box>
                          <Box style={{ marginRight: "15px" }}>
                            <Tooltip title="Calendar">
                              <Button
                                type="primary"
                                icon={<CalendarOutlined />}
                              />
                            </Tooltip>
                          </Box>
                          <Box>
                            <Button type="primary" icon={<PlusOutlined />} />
                          </Box>
                        </Container>
                      </Box>
                      <Box className={style.qNoteContent}>
                        <Empty
                          description={
                            <span
                              style={{ fontSize: "14px", color: "#bababa" }}
                            >
                              There are no events starting 12/04/2023 or later
                            </span>
                          }
                        />
                      </Box>
                    </Container>
                  </Box>
                </Container>
              </Box>
            </Container>
          </Box>
        </Container>
      )}
    </>
  );
});

export default QuickViewPage;
