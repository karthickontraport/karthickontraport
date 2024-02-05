import React, { useState } from "react";
import { Container, Box } from "../../common/Layout";
import { Button, Flex, Modal, Checkbox } from "antd";
import TextBox from "../../common/TextBox/TextBox";
import SelectField from "../../common/SelectField/SelectField";
import BusinessTypeField from "../../common/BusinessTypeField/BusinessTypeField";
import IndustryTypeField from "../../common/IndustryTypeField/IndustryTypeField";
import RefLoginField from "../../common/RefLoginField/RefLoginField";
import style from "./ContactDetailPage.module.css";

const AddForm = (props) => {
  const { onCancel, onSave } = props;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const addedBy =
    userInfo && userInfo.RepLogin ? userInfo.RepLogin : "defaultName";
  const [mandatoryFieldsValid, setMandatoryFieldsValid] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const handleSave = () => {
    const mandatoryFields = ["FirstName", "LastName", "Phone", "PriEmail"];

    const fieldValues = {};
    mandatoryFields.forEach((field) => {
      fieldValues[field] = props[field];
    });

    const isValid = mandatoryFields.every(
      (field) => fieldValues[field] && fieldValues[field].trim() !== ""
    );

    setMandatoryFieldsValid(isValid);

    if (isValid) {
      onSave();
    } else {
      setModalVisible(true);
    }
  };

  const handleModalOk = () => {
    setModalVisible(false);
  };
  return (
    <Container className={style.addform}>
      <Box className={style.addformHead}>Add Contacts</Box>
      <Box flexible scroll="vertical" className={style.addBox}>
        <Container
          alignBox="row"
          align="vertical"
          wrap="wrap"
          className={style.form}
        >
          <Box className={style.formBox}>
            <TextBox label="First Name" name="FirstName" mandatory />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Last Name" name="LastName" mandatory />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Address" name="Address" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="City" name="City" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="State" name="State" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Zip Code" name="ZipCode" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Country" name="Country" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Phone" name="Phone" mandatory />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Fax" name="Fax" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Cell" name="Cell" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Primary Email" name="PriEmail" mandatory />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Secondary Email" name="SecEmail" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Company Name" name="CompanyName" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Company Phone" name="CompanyPhone" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Department" name="Department" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="URL" name="URL" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Title" title="Title" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Login Name" name="logname" />
          </Box>
          <Box className={style.formBox}>
            <TextBox label="Password" name="Password" />
          </Box>
          <Box className={style.formBox}>
            <SelectField label="Media Code" name="MediaCode" />
          </Box>

          <Box className={style.formBox}>
            <BusinessTypeField label="Business Type" name="TypeOfBusiness" />
          </Box>

          <Box className={style.formBox}>
            <IndustryTypeField label="Industry" name="Industry" />
          </Box>
          <Box className={style.formBox}>
            <RefLoginField label="Rep Login" name="Rep Login" value={addedBy} />
          </Box>
          <Container alignBox="row" wrap="wrap" className={style.Container}>
            <Box className={style.formBox}>
              <Checkbox> Do not Call </Checkbox>
            </Box>
            <Box className={style.formBox}>
              <Checkbox> Do not Mail </Checkbox>
            </Box>
            <Box className={style.formBox}>
              <Checkbox>Send to Marketing"</Checkbox>
            </Box>
          </Container>
        </Container>
      </Box>
      <Box className={style.addformFoot}>
        <Flex gap="middle" wrap="wrap">
          <Button type="primary" onClick={handleSave}>
            Submit
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Flex>
      </Box>
      {!mandatoryFieldsValid && (
        <Modal
          title="Alert"
          style={{
            top: 20,
          }}
          open={modalVisible}
          closable={false}
          footer={[
            <Button key="ok" type="primary" onClick={handleModalOk} danger>
              OK
            </Button>,
          ]}
        >
          Please fill in all mandatory fields.
        </Modal>
      )}
    </Container>
  );
};

export default AddForm;
