import React, { useEffect, useState } from "react";
import { Container, Box } from "../../common/Layout";
import TextBox from "../../common/TextBox/TextBox";
import { Checkbox } from "antd";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientData } from "../../actions/dataViewAction";
import { updateClientField } from "../../actions/updateClientField";
import SelectField from "../../common/SelectField/SelectField";
import BusinessTypeField from "../../common/BusinessTypeField/BusinessTypeField";
import IndustryTypeField from "../../common/IndustryTypeField/IndustryTypeField";
import Skeleton from "@mui/material/Skeleton";
import RefLoginField from "../../common/RefLoginField/RefLoginField";
import style from "./ContactDetailPage.module.css";

const DetailForm = (props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});
  const clientId = localStorage.getItem("currentCustomerID");
  const { cliData, cliLoading, error } = useSelector(
    (state) => state.clientData
  );

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

      const formattedInitialData = {};
      Object.keys(initialData).forEach((fieldName) => {
        const fieldValue = initialData[fieldName];
        formattedInitialData[fieldName] = fieldValue;
      });

      setFormData(formattedInitialData);
      setInitialFormData(formattedInitialData);
    }
    localStorage.setItem("FirstName", formData.FirstName);
    localStorage.setItem("LastName", formData.LastName);
    localStorage.setItem("PriEmail", formData.PriEMail);
  }, [cliData]);

  const handleEditField = (fieldName, fieldValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: fieldValue,
    }));
  };

  const handleSaveField = async (field, value) => {
    try {
      if (clientId) {
        await dispatch(updateClientField(clientId, field, value));

        setInitialFormData((prevData) => ({
          ...prevData,
          [field]: value,
        }));

        localStorage.setItem("FirstName", formData.FirstName);
        localStorage.setItem("LastName", formData.LastName);
        localStorage.setItem("PriEmail", formData.PriEMail);
        props.updateEmailText();
        message.success({
          content: "successfully Updated!",
          duration: 3,
        });
      }
    } catch (error) {
      message.error(error, {
        content: error,
        duration: 3,
      });
    }
  };

  const handleEditCheckbox = (fieldName, checked) => {
    const valueToSave = checked ? 1 : 0;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: valueToSave,
    }));

    if (clientId) {
      dispatch(updateClientField(clientId, fieldName, valueToSave))
        .then(() => {
          message.success({
            content: "Successfully updated.",
            duration: 3,
          });
        })
        .catch((error) => {
          message.error(error, {
            content: error,
            duration: 3,
          });
        });
    }
  };

  const isFieldChanged = (fieldName) => {
    return formData[fieldName] !== initialFormData[fieldName];
  };

  if (cliLoading) {
    const maxCount = 6;

    return (
      <Container
        style={{ height: "15.625rem", gap: "30px" }}
        wrap="wrap"
        alignBox="row"
      >
        {[...Array(maxCount)].map((_, index) => (
          <Box key={index} style={{ width: "360px" }}>
            <Skeleton
              animation="wave"
              height={100}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          </Box>
        ))}
      </Container>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container
      alignBox="row"
      align="vertical"
      wrap="wrap"
      className={style.form}
      isCover={false}
    >
      <Box className={style.formBox}>
        <TextBox
          label="First Name"
          value={formData?.FirstName}
          name="FirstName"
          onChange={(e) => handleEditField("FirstName", e.target.value || "")}
          handleSave={() => handleSaveField("FirstName", formData?.FirstName)}
          isChanged={isFieldChanged("FirstName")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Last Name"
          value={formData?.LastName || ""}
          name="LastName"
          onChange={(e) => handleEditField("LastName", e.target.value || "")}
          handleSave={() => handleSaveField("LastName", formData?.LastName)}
          isChanged={isFieldChanged("LastName")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Address"
          value={formData?.Address || ""}
          name="Address"
          onChange={(e) => handleEditField("Address", e.target.value || "")}
          handleSave={() => handleSaveField("Address", formData?.Address)}
          isChanged={isFieldChanged("Address")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="City"
          value={formData?.City || ""}
          name="City"
          onChange={(e) => handleEditField("City", e.target.value || "")}
          handleSave={() => handleSaveField("City", formData?.City)}
          isChanged={isFieldChanged("City")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="State"
          value={formData?.State || ""}
          name="State"
          onChange={(e) => handleEditField("State", e.target.value || "")}
          handleSave={() => handleSaveField("State", formData?.State)}
          isChanged={isFieldChanged("State")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Zip Code"
          value={formData?.Zipcode || ""}
          name="ZipCode"
          onChange={(e) => handleEditField("ZipCode", e.target.value || "")}
          handleSave={() => handleSaveField("ZipCode", formData?.ZipCode)}
          isChanged={isFieldChanged("ZipCode")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Country"
          value={formData?.Country || ""}
          name="Country"
          onChange={(e) => handleEditField("Country", e.target.value || "")}
          handleSave={() => handleSaveField("Country", formData?.Country)}
          isChanged={isFieldChanged("Country")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Phone"
          value={formData?.Phone || ""}
          name="Phone"
          onChange={(e) => handleEditField("Phone", e.target.value || "")}
          handleSave={() => handleSaveField("Phone", formData?.Phone)}
          isChanged={isFieldChanged("Phone")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Fax"
          value={formData?.Fax || ""}
          name="Fax"
          onChange={(e) => handleEditField("Fax", e.target.value || "")}
          handleSave={() => handleSaveField("Fax", formData?.Fax)}
          isChanged={isFieldChanged("Fax")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Cell"
          value={formData?.Cell || ""}
          name="Cell"
          onChange={(e) => handleEditField("Cell", e.target.value || "")}
          handleSave={() => handleSaveField("Cell", formData?.Cell)}
          isChanged={isFieldChanged("Cell")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Primary Email"
          value={formData?.PriEMail || ""}
          name="PriEmail"
          onChange={(e) => handleEditField("PriEmail", e.target.value || "")}
          handleSave={() => handleSaveField("PriEmail", formData?.PriEmail)}
          isChanged={isFieldChanged("PriEmail")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Secondary Email"
          value={formData?.SecEMail || ""}
          name="SecEmail"
          onChange={(e) => handleEditField("SecEmail", e.target.value || "")}
          handleSave={() => handleSaveField("SecEmail", formData?.SecEmail)}
          isChanged={isFieldChanged("SecEmail")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Company Name"
          value={formData?.CompanyName || ""}
          name="CompanyName"
          onChange={(e) => handleEditField("CompanyName", e.target.value || "")}
          handleSave={() =>
            handleSaveField("CompanyName", formData?.CompanyName)
          }
          isChanged={isFieldChanged("CompanyName")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Company Phone"
          value={formData?.CompanyPhone || ""}
          name="CompanyPhone"
          onChange={(e) =>
            handleEditField("CompanyPhone", e.target.value || "")
          }
          handleSave={() =>
            handleSaveField("CompanyPhone", formData?.CompanyPhone)
          }
          isChanged={isFieldChanged("CompanyPhone")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Department"
          value={formData?.Department || ""}
          name="Department"
          onChange={(e) => handleEditField("Department", e.target.value || "")}
          handleSave={() => handleSaveField("Department", formData?.Department)}
          isChanged={isFieldChanged("Department")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="URL"
          value={formData?.URL || ""}
          name="URL"
          onChange={(e) => handleEditField("URL", e.target.value || "")}
          handleSave={() => handleSaveField("URL", formData?.URL)}
          isChanged={isFieldChanged("URL")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Title"
          value={formData?.Title || ""}
          title="Title"
          onChange={(e) => handleEditField("Title", e.target.value || "")}
          handleSave={() => handleSaveField("Title", formData?.Title)}
          isChanged={isFieldChanged("Title")}
        />
      </Box>
      <Box className={style.formBox}>
        <TextBox
          label="Login Name"
          value={formData?.LoginName || ""}
          name="logname"
          disabled
        />
      </Box>
      <Box className={style.formBox}>
        <SelectField
          label="Media Code"
          value={formData?.MediaCode}
          name="MediaCode"
          onChange={(selectedValue) =>
            handleEditField("MediaCode", selectedValue)
          }
          handleSave={() => handleSaveField("MediaCode", formData?.MediaCode)}
          isChanged={isFieldChanged("MediaCode")}
        />
      </Box>

      <Box className={style.formBox}>
        <BusinessTypeField
          label="Business Type"
          value={formData?.TypeOfBusiness}
          name="TypeOfBusiness"
          onChange={(selectedValue) =>
            handleEditField("TypeOfBusiness", selectedValue)
          }
          handleSave={() =>
            handleSaveField("TypeOfBusiness", formData?.TypeOfBusiness)
          }
          isChanged={isFieldChanged("TypeOfBusiness")}
        />
      </Box>

      <Box className={style.formBox}>
        <IndustryTypeField
          label="Industry"
          value={formData?.Industry}
          name="Industry"
          onChange={(selectedValue) =>
            handleEditField("Industry", selectedValue)
          }
          handleSave={() => handleSaveField("Industry", formData?.Industry)}
          isChanged={isFieldChanged("Industry")}
        />
      </Box>
      <Box className={style.formBox}>
        <RefLoginField
          label="Rep Login"
          value={formData?.RepLogin}
          name="RepLogin"
          onChange={(selectedValue) =>
            handleEditField("RepLogin", selectedValue)
          }
          handleSave={() => handleSaveField("RepLogin", formData.RepLogin)}
          isChanged={isFieldChanged("RepLogin")}
        />
      </Box>
      <Container alignBox="row" wrap="wrap" className={style.Container}>
        <Box className={style.formBox}>
          <Checkbox
            checked={formData?.badphone === true || formData?.badphone === 1}
            onChange={(e) => handleEditCheckbox("badphone", e.target.checked)}
          >
            Do not Call
          </Checkbox>
        </Box>
        <Box className={style.formBox}>
          <Checkbox
            checked={formData?.bademail === true || formData?.bademail === 1}
            onChange={(e) => handleEditCheckbox("bademail", e.target.checked)}
          >
            Do not Mail
          </Checkbox>
        </Box>
        <Box className={style.formBox}>
          <Checkbox
            checked={
              formData?.sendtomarketing === true ||
              formData?.sendtomarketing === 1
            }
            onChange={(e) =>
              handleEditCheckbox("sendtomarketing", e.target.checked)
            }
          >
            Send to Marketing
          </Checkbox>
        </Box>
      </Container>
    </Container>
  );
};

export default DetailForm;
