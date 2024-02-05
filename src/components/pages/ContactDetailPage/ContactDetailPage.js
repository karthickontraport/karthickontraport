import React from "react";
import { Container, Box } from "../../common/Layout";
import ContactBox from "../../common/ContactBox/ContactBox";
import ContactHeader from "../../common/ContactHeader/ContactHeader";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DetailForm from "./DetailForm";
import style from "./ContactDetailPage.module.css";

const ContactDetailPage = (props) => {
  const { handleBackClick, handleAddNote } = props;
  return (
    <Container className={style.Container}>
      <Box>
        <ContactHeader handleBackClick={handleBackClick} />
      </Box>
      <Box flexible scroll="vertical">
        <Container className={style.Container}>
          <Box>
            <ContactBox heading="Contact Information">
              <DetailForm />
            </ContactBox>
          </Box>
          <Box>
            <ContactBox
              actionBtnText="Add Note"
              heading="Note"
              needSelect
              handleAddNote={handleAddNote}
            >
              <Box>
                <Container align="both">
                  <NoteAddIcon />
                  No notes available for this contact
                </Container>
              </Box>
            </ContactBox>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default ContactDetailPage;
