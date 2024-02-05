import React from "react";
import ContactDetailPage from "../ContactDetailPage/ContactDetailPage";
import style from "./ContactPage.module.css";
const ContactPage = () => {
  return (
    <div className={style.Container}>
      <ContactDetailPage />
    </div>
  );
};

export default ContactPage;
