import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const NoteModel = (props) => {
  const { show, handleClose, handleSave, initialValue, readOnly, viewOnly } =
    props;
  const [noteValue, setNoteValue] = useState(initialValue || "");

  useEffect(() => {
    setNoteValue(initialValue);
  }, [initialValue]);

  const handleChange = (event) => {
    setNoteValue(event.target.value);
  };

  const handleSaveChanges = () => {
    handleSave(noteValue);
    setNoteValue("");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton={!viewOnly}>
          <Modal.Title>
            {viewOnly ? "Note" : initialValue ? "Edit Note" : "Add Note"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewOnly ? (
            <div>{noteValue}</div>
          ) : (
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={10}
                value={noteValue}
                onChange={handleChange}
                readOnly={readOnly}
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          {viewOnly ? (
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                {initialValue ? "Save Changes" : "Add Note"}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NoteModel;
