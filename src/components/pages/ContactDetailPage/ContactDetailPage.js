// ContactDetailPage.js

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "antd";
import { Table } from "antd";
import { UserSwitchOutlined, DeleteOutlined } from "@ant-design/icons";
import Skeleton from "@mui/material/Skeleton";
import { message } from "antd";
import { Empty } from "antd";
import { fetchNotesData } from "../../actions/notesData";
import { addNote } from "../../actions/addNotesAction";
import { updateNote } from "../../actions/updateNoteAction";
import { removeNote } from "../../actions/removeNotesAction";
import { Container, Box } from "../../common/Layout";
import ContactBox from "../../common/ContactBox/ContactBox";
import ContactHeader from "../../common/ContactHeader/ContactHeader";
import { Checkbox } from "antd";
import DetailForm from "./DetailForm";
import NoteModel from "../../common/NoteModel/NoteModel";
import QuickViewPage from "../QuickViewPage";
import TaskPage from "../ActionsPage/TaskPage";
import EventPage from "../ActionsPage/EventPage";
import MailAction from "../../common/ActionsModel/MailAction";
import TaskActions from "../../common/TaskActions/TaskActions";
import EventActions from "../../common/EventActions/EventActions";
import EventStatusModel from "../../common/EventActions/EventStatusModel";
import style from "./ContactDetailPage.module.css";

const ContactDetailPage = (props) => {
  const MAX_NOTE_LENGTH = 250;
  const navigate = useNavigate();
  const location = useLocation();
  const { handleBackClick } = props;
  const maxCount = 4;
  const [emailText, setEmailText] = useState("");
  const { cliData } = useSelector((state) => state.clientData);
  const { removeLoading } = useSelector((state) => state.removeReducer);
  const customerId = localStorage.getItem("currentCustomerID");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const addedBy =
    userInfo && userInfo.RepLogin ? userInfo.RepLogin : "defaultName";

  const dispatch = useDispatch();
  const { noteData, loading, error } = useSelector(
    (state) => state.notesReducer
  );
  const [showNoteModel, setShowNoteModel] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [editNote, setEditNote] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const [needSelect, setNeedSelect] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstLetterFirstName, setFirstLetterFirstName] = useState("");
  const [firstLetterLastName, setFirstLetterLastName] = useState("");
  const [emailid, setEmailid] = useState("");
  const [viewNoteContent, setViewNoteContent] = useState("");
  const [showViewNoteModel, setShowViewNoteModel] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showEventActions, setShowEventActions] = useState(false);
  const [showMailActions, setShowMailActions] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(
    localStorage.getItem("isQuickViewOpen") === "true" || false
  );
  const [editAlertVisible, setEditAlertVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedTaskData, setSelectedTaskData] = useState(null);

  const [openStatusModel, setOpenStatusModel] = useState(false);

  useEffect(() => {
    dispatch(fetchNotesData(customerId));
  }, [dispatch, customerId]);

  useEffect(() => {
    if (cliData && cliData.length > 0) {
      const { FirstName, LastName, PriEMail } = cliData[0];
      const capitalizedFirstName =
        FirstName.charAt(0).toUpperCase() + FirstName.slice(1);
      const capitalizedLastName =
        LastName.charAt(0).toUpperCase() + LastName.slice(1);
      const firstLetterFirst = capitalizedFirstName.charAt(0);
      const firstLetterLast = capitalizedLastName.charAt(0);
      setEmailText(
        `${capitalizedFirstName} ${capitalizedLastName}  (${PriEMail})`
      );
      setFirstName(capitalizedFirstName);
      setLastName(capitalizedLastName);
      setFirstLetterFirstName(firstLetterFirst);
      setFirstLetterLastName(firstLetterLast);
      setEmailid(PriEMail);
    }
  }, [cliData]);

  const updateEmailText = () => {
    const firstName = localStorage.getItem("FirstName") || "";
    const lastName = localStorage.getItem("LastName") || "";
    const priEmail = localStorage.getItem("PriEmail") || "";

    const capitalizedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const capitalizedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1);

    setEmailText(
      `${capitalizedFirstName} ${capitalizedLastName}  (${priEmail})`
    );
  };

  const handleShowNoteModel = () => {
    setShowNoteModel(true);
  };

  const handleCloseNoteModel = () => {
    setShowNoteModel(false);
    setEditNote("");
    setEditNoteId(null);
    setSelectedNotes([]);
    setNeedSelect(false);
  };

  const handleAddNote = useCallback(
    async (newNote) => {
      try {
        await dispatch(addNote(customerId, newNote, addedBy));
        await dispatch(fetchNotesData(customerId));
        setNeedSelect(false);
        handleCloseNoteModel();
        message.success({
          content: "Note Successfully Added!",
          duration: 3,
        });
      } catch (error) {
        message.error(error);
      }
    },
    [dispatch, customerId, addedBy]
  );

  const handleEditNote = useCallback(
    async (editNote) => {
      try {
        await dispatch(updateNote(customerId, editNote, editNoteId));
        dispatch(fetchNotesData(customerId));
        setNeedSelect(false);
        handleCloseNoteModel();
        setEditNote("");
        setSelectedNotes([]);
        message.success({
          content: "Note Successfully Updated!",
          duration: 3,
        });
      } catch (error) {
        message.error(error);
      }
    },
    [dispatch, customerId, editNoteId]
  );

  const handleRemoveNote = useCallback(async () => {
    try {
      if (selectedNotes.length > 0) {
        for (const noteId of selectedNotes) {
          await dispatch(removeNote(noteId));
        }
        dispatch(fetchNotesData(customerId));
        setNeedSelect(false);
        message.success({
          content: "Selected notes successfully deleted!",
          duration: 3,
        });
      } else {
        alert("Please select a note to delete.");
      }
    } catch (error) {
      message.error(error);
    }
  }, [dispatch, customerId, selectedNotes]);

  const handleEditButtonClick = () => {
    if (selectedNotes.length === 1) {
      const noteToEdit = noteData.find(
        (note) => note.notesid === selectedNotes[0]
      );
      setEditNoteId(noteToEdit.notesid);
      setEditNote(noteToEdit.notes);
      handleShowNoteModel();
    } else if (selectedNotes.length > 1) {
      setEditAlertVisible(true);
    } else {
      alert("Please select a note to edit.");
    }
  };

  const handleCheckboxChange = (noteId) => {
    let updatedSelectedNotes = [...selectedNotes];

    if (updatedSelectedNotes.includes(noteId)) {
      updatedSelectedNotes = updatedSelectedNotes.filter((id) => id !== noteId);
    } else {
      updatedSelectedNotes.push(noteId);
    }

    setSelectedNotes(updatedSelectedNotes);
    setNeedSelect(updatedSelectedNotes.length > 0);
  };

  const handlePageClose = () => {
    const storedCustomerId = localStorage.getItem("currentCustomerID");
    const newUrl = location.pathname.replace(/\/\d+$/, `/${storedCustomerId}`);
    navigate(newUrl);
  };

  const handleQuickViewClose = () => {
    handlePageClose();
    setIsQuickViewOpen(false);
    localStorage.setItem("isQuickViewOpen", "false");
  };

  const handleQuickViewClick = () => {
    setIsQuickViewOpen(true);
    localStorage.setItem("isQuickViewOpen", "true");
  };

  const handleEditAlertClose = () => {
    setEditAlertVisible(false);
  };

  const handleViewNoteContent = (noteContent) => {
    setViewNoteContent(noteContent);
    setShowViewNoteModel(true);
  };

  const handleShowAction = () => {
    setShowActions(true);
  };
  const onStatusClick = () => {
    console.log("modelopen", true);
    setOpenStatusModel(true);
  };
  const closeActionsPage = () => {
    setShowActions(false);
  };
  const handleEventShowAction = () => {
    setShowEventActions(true);
  };
  const closeEventActionsPage = () => {
    setShowEventActions(false);
  };

  const handleMailShowAction = () => {
    setShowMailActions(true);
  };
  const closeMailActionsPage = () => {
    setShowMailActions(false);
  };

  const taskData = JSON.parse(localStorage.getItem("taskData")) || {};
  const eventData = JSON.parse(localStorage.getItem("eventData")) || {};

  // Extract data for the current customer ID
  const currentCustomerIdData = taskData[customerId] || [];
  const currentCustomerIdEventData = eventData[customerId] || [];

  const columns = [
    { title: "Assignee", dataIndex: "assignee", key: "assignee" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Details", dataIndex: "details", key: "details" },
    { title: "Date Assigned", dataIndex: "assignedDate", key: "assignedDate" },
    { title: "Date Complete", dataIndex: "DateComplete", key: "DateComplete" },
    { title: "Date Due", dataIndex: "dueDate", key: "dueDate" },
  ];
  const eventColumns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "StartEnd", dataIndex: "startEnd", key: "startEnd" },
    // { title: "Details", dataIndex: "details", key: "details" },
    {
      title: "Attending",
      dataIndex: "attending",
      key: "attending",
      render: (text) => (
        <span style={{ color: "#198754", fontWeight: "500" }}>{text}</span>
      ),
    },
    { title: "Modify Event", dataIndex: "modify event", key: "modify event" },
  ];

  const handleEditTask = (record) => {
    console.log("selected recored", record);
    setSelectedTaskData(record);
    setShowActions(true);
  };

  const handleRowSelectionChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <Container className={style.Container}>
      <Box>
        <ContactHeader
          handleBackClick={handleBackClick}
          emailtext={emailText}
          handleQuickview={handleQuickViewClick}
          buttonText="Quick Email"
          handleMailClick={handleMailShowAction}
        />
      </Box>
      <Box flexible scroll="vertical">
        <Container className={style.midContainer}>
          <Box>
            <ContactBox heading="Contact Information">
              <DetailForm updateEmailText={updateEmailText} />
            </ContactBox>
          </Box>
          <Box>
            <ContactBox
              actionBtnText="Add Note"
              heading="Note"
              needSelect={needSelect}
              deleteLoding={removeLoading}
              handleShowNoteModel={handleShowNoteModel}
              scroll="vertical"
              onEdit={handleEditButtonClick}
              onDelete={() => handleRemoveNote(selectedNotes[0])}
              className={style.noteContainer}
            >
              {loading && (
                <Container alignBox="column" style={{ height: "400px" }}>
                  {[...Array(maxCount)].map((_, index) => (
                    <Box key={index}>
                      <Container
                        alignBox="row"
                        align="vertical"
                        style={{ gap: "20px" }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={25}
                          height={25}
                          style={{ marginBottom: 15 }}
                        />
                        <Skeleton
                          animation="wave"
                          width={1000}
                          height={30}
                          style={{ marginBottom: 15 }}
                        />
                      </Container>
                    </Box>
                  ))}
                </Container>
              )}
              {error && <div>Error loading notes: {error.message}</div>}
              {!loading && !error && noteData.length === 0 && (
                <Container align="both">
                  <Empty
                    description={
                      <span style={{ fontSize: "16px", color: "#bababa" }}>
                        No notes available for this contact.
                      </span>
                    }
                  />
                </Container>
              )}
              {!loading && !error && noteData.length > 0 && (
                <>
                  <Container alignBox="column">
                    <Box>
                      <Container
                        alignBox="row"
                        className={`${style.notes} ${style.header}`}
                      >
                        <Box style={{ width: "3.75rem" }}>Select</Box>
                        {/* <Box style={{ width: "12.5rem" }}>Author</Box> */}
                        <Box className={style.noteBox} flexible>
                          Notes
                        </Box>
                        <Box style={{ width: "10.5rem", textAlign: "center" }}>
                          {" "}
                          Added Time
                        </Box>
                      </Container>
                    </Box>
                    <Box
                      flexible
                      className={style.noteListBox}
                      scroll="vertical"
                    >
                      {noteData
                        .slice()
                        .reverse()
                        .map((note) => (
                          <div
                            key={note.notesid}
                            className={`${style.noteWraper} ${
                              selectedNotes.includes(note.notesid)
                                ? style.selectedbg
                                : ""
                            } ${
                              !selectedNotes.includes(note.notesid) &&
                              style.hover
                            }`}
                          >
                            <Container
                              alignBox="row"
                              align="vertical"
                              className={style.notes}
                            >
                              <Box style={{ width: "3.75rem" }}>
                                <Checkbox
                                  onChange={() =>
                                    handleCheckboxChange(note.notesid)
                                  }
                                  checked={selectedNotes.includes(note.notesid)}
                                />
                              </Box>

                              {/* <Box
                                className={style.addbox}
                                style={{ width: "12.5rem" }}
                              >
                                <div className={style.noteText}>
                                  {note.addedby}
                                </div>
                              </Box> */}
                              <Box className={style.noteBox} flexible>
                                <div
                                  className={`${style.noteText} `}
                                  style={{ display: "inline" }}
                                >
                                  {note.notes.length > MAX_NOTE_LENGTH
                                    ? `${note.notes.substring(
                                        0,
                                        MAX_NOTE_LENGTH
                                      )}...`
                                    : note.notes}
                                </div>
                                {note.notes.length > MAX_NOTE_LENGTH && (
                                  <span
                                    onClick={() =>
                                      handleViewNoteContent(note.notes)
                                    }
                                    className={style.viewNote}
                                  >
                                    Show More
                                  </span>
                                )}
                              </Box>
                              <Box
                                style={{
                                  width: "10.5rem",
                                  textAlign: "center",
                                }}
                              >
                                <div className={style.noteText}>
                                  {note.addeddate}
                                </div>
                              </Box>
                            </Container>
                          </div>
                        ))}
                    </Box>
                  </Container>
                </>
              )}
            </ContactBox>
          </Box>
          <Box>
            <ContactBox
              actionBtnText="Add New Task"
              handleShowNoteModel={handleShowAction}
              customChildren={<TaskActions />}
              heading="Task"
              scroll="vertical"
              className={style.noteContainer}
            >
              {currentCustomerIdData.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={currentCustomerIdData}
                  pagination={false}
                  rowKey={(record) => record.key}
                  rowSelection={{
                    type: "checkbox",
                    onChange: handleRowSelectionChange,
                    selectedRowKeys: selectedRowKeys,
                  }}
                  onRow={(record) => ({
                    onClick: () => handleEditTask(record),
                  })}
                />
              ) : (
                <Empty
                  description={
                    <span style={{ fontSize: "16px", color: "#bababa" }}>
                      No Task available for this contact.
                    </span>
                  }
                />
              )}
            </ContactBox>
          </Box>

          <Box>
            <ContactBox
              actionBtnText="Add New Event"
              handleShowNoteModel={handleEventShowAction}
              customChildren={
                <EventActions
                  onStatusClick={onStatusClick}
                  placeholder="Actions"
                  options={[
                    {
                      text: "Change Status",
                      icon: <UserSwitchOutlined />,
                    },
                    {
                      text: "Delete From Event",
                      icon: <DeleteOutlined />,
                    },
                  ]}
                />
              }
              heading="Calendar"
              scroll="vertical"
              className={style.noteContainer}
            >
              {currentCustomerIdEventData.length > 0 ? (
                <Table
                  columns={eventColumns}
                  dataSource={currentCustomerIdEventData}
                  pagination={false}
                />
              ) : (
                <Empty
                  description={
                    <span style={{ fontSize: "16px", color: "#bababa" }}>
                      There are no events available for this contact.
                    </span>
                  }
                />
              )}
            </ContactBox>
          </Box>
        </Container>
      </Box>
      <EventStatusModel
        show={openStatusModel}
        handleClose={() => setOpenStatusModel(false)}
      />
      <NoteModel
        show={showNoteModel}
        handleClose={handleCloseNoteModel}
        handleSave={editNoteId ? handleEditNote : handleAddNote}
        initialValue={editNoteId ? editNote : ""}
      />
      <NoteModel
        show={showViewNoteModel}
        handleClose={() => setShowViewNoteModel(false)}
        initialValue={viewNoteContent}
        readOnly={true}
        viewOnly={true}
      />
      {isQuickViewOpen && (
        <QuickViewPage
          headerText={emailText}
          handlePageClose={handleQuickViewClose}
          userName={`${firstName} ${lastName}`}
          avatarText={`${firstLetterFirstName} ${firstLetterLastName}`}
          EmailText={emailid}
          firstName={firstName}
          lastName={lastName}
        />
      )}
      <Modal
        title="Edit Alert"
        style={{
          top: 20,
        }}
        open={editAlertVisible}
        closable={false}
        footer={[
          <Button key="ok" type="primary" onClick={handleEditAlertClose}>
            OK
          </Button>,
        ]}
      >
        Please select only one note for editing at a time.
      </Modal>
      {showActions && (
        <TaskPage
          onClose={closeActionsPage}
          selectedTaskData={selectedTaskData}
        />
      )}
      {showEventActions && <EventPage onClose={closeEventActionsPage} />}
      {showMailActions && <MailAction onClose={closeMailActionsPage} />}
    </Container>
  );
};

export default ContactDetailPage;
