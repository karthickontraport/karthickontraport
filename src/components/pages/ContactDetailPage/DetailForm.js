import React from "react";
import { Container, Box } from "../../common/Layout";
import TextBox from "../../common/TextBox/TextBox";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SelectField from "../../common/SelectField/SelectField";
import style from "./ContactDetailPage.module.css";

const DetailForm = () => {
  return (
    <Container
      alignBox="row"
      align="vertical"
      wrap="wrap"
      className={style.form}
    >
      <Box className={style.formBox}>
        <TextBox label="FirstName" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="Address" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="City" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="state" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="ZipCode" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="Country" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="Phone" />
      </Box>

      <Box className={style.formBox}>
        <TextBox label="Fax" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="Cell" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="PriEmail" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="SecEmail" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="CompanyName" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="CompanyPhone" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="Department" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="URL" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="Title" />
      </Box>
      <Box className={style.formBox}>
        <TextBox label="LoginName" />
      </Box>
      <Box className={style.formBox}>
        <SelectField label="MediaCode" />
      </Box>
      <Box>
        <Container alignBox="row" wrap="wrap" className={style.Container}>
          <Box className={style.formBox}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="badphone"
            />
          </Box>
          <Box className={style.formBox}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="sendtomarketing"
            />
          </Box>
          <Box className={style.formBox}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="bademail"
            />
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default DetailForm;
