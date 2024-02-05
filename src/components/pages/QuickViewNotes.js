import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Empty } from "antd";
import { message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { Skeleton } from "antd";
import { Container, Box } from "../common/Layout";
import { fetchNotesData } from "../actions/notesData";
import { addNote } from "../actions/addNotesAction";
import NoteModel from "../common/NoteModel/NoteModel";
import style from "./ContactDetailPage/ContactDetailPage.module.css";
import styles from "./common.module.css";
const QuickViewNotes = (props) => {
  const MAX_NOTE_LENGTH = 200;
  const customerId = localStorage.getItem("currentCustomerID");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const addedBy =
    userInfo && userInfo.RepLogin ? userInfo.RepLogin : "defaultName";
  const dispatch = useDispatch();
  const [showViewNoteModel, setShowViewNoteModel] = useState(false);
  const [showNoteModel, setShowNoteModel] = useState(false);
  const [viewNoteContent, setViewNoteContent] = useState("");
  const { noteData, loading, error } = useSelector(
    (state) => state.notesReducer
  );
  useEffect(() => {
    dispatch(fetchNotesData(customerId));
  }, [dispatch, customerId]);

  const noteCount = noteData.length;
  const handleViewNoteContent = (noteContent) => {
    setViewNoteContent(noteContent);
    setShowViewNoteModel(true);
  };

  const handleShowNoteModel = () => {
    setShowNoteModel(true);
  };

  const handleCloseNoteModel = () => {
    setShowNoteModel(false);
  };

  const handleAddNote = useCallback(
    async (newNote) => {
      try {
        await dispatch(addNote(customerId, newNote, addedBy));
        await dispatch(fetchNotesData(customerId));

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
  return (
    <Container className={styles.qNoteBox} isCover={false}>
      <Box className={styles.noteBoxHead}>
        <Container alignBox="row" align="vertical">
          <Box flexible>Notes ({noteCount})</Box>
          <Box>
            <Tooltip title=" Add Note">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleShowNoteModel}
              />
            </Tooltip>
          </Box>
        </Container>
      </Box>
      <Box className={styles.qNoteContent}>
        {loading && (
          <Container>
            <Skeleton
              avatar
              paragraph={{
                rows: 3,
              }}
            />
          </Container>
        )}

        {error && <div>Error loading notes: {error.message}</div>}
        {!loading && !error && noteData.length === 0 && (
          <Container align="both">
            <Empty
              description={
                <span style={{ fontSize: "14px", color: "#bababa" }}>
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
                  className={`${style.notes} ${style.header} ${style.Qheader}`}
                >
                  {/* <Box style={{ width: "7.5rem", textAlign: "left" }}>
                    Author
                  </Box> */}
                  <Box
                    className={style.noteBox}
                    flexible
                    style={{ textAlign: "left" }}
                  >
                    Notes
                  </Box>
                  <Box style={{ textAlign: "left" }}> Added Time</Box>
                </Container>
              </Box>
              <Box flexible className={styles.noteListBox} scroll="vertical">
                {noteData
                  .slice()
                  .reverse()
                  .map((note) => (
                    <div
                      key={note.notesid}
                      className={`${style.noteWraper} ${style.hover}`}
                    >
                      <Container
                        alignBox="row"
                        className={`${style.notes} ${style.Qnots}`}
                      >
                        {/* <Box
                          className={style.addbox}
                          style={{ width: "7.5rem", textAlign: "left" }}
                        >
                          <Tooltip title={note.addedby}>
                            {" "}
                            <div
                              className={`${style.noteText} ${style.dotted}`}
                            >
                              {note.addedby}
                            </div>
                          </Tooltip>
                        </Box> */}
                        <Box
                          className={style.noteBox}
                          flexible
                          style={{
                            textAlign: "left",
                          }}
                        >
                          <div
                            className={`${style.noteText} `}
                            style={{ display: "inline" }}
                          >
                            {note.notes.length > MAX_NOTE_LENGTH
                              ? `${note.notes.substring(0, MAX_NOTE_LENGTH)}...`
                              : note.notes}
                          </div>
                          {note.notes.length > MAX_NOTE_LENGTH && (
                            <span
                              onClick={() => handleViewNoteContent(note.notes)}
                              className={style.viewNote}
                            >
                              Show More
                            </span>
                          )}
                        </Box>
                        <Box style={{ textAlign: "left" }}>
                          <div className={style.noteText}>{note.addeddate}</div>
                        </Box>
                      </Container>
                    </div>
                  ))}
              </Box>
            </Container>
          </>
        )}
      </Box>
      <NoteModel
        show={showViewNoteModel}
        handleClose={() => setShowViewNoteModel(false)}
        initialValue={viewNoteContent}
        readOnly={true}
        viewOnly={true}
      />

      <NoteModel
        show={showNoteModel}
        handleClose={handleCloseNoteModel}
        handleSave={handleAddNote}
      />
    </Container>
  );
};

export default QuickViewNotes;
