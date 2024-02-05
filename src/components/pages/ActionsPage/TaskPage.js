// TaskPage.jsx
import React, { useState } from "react";
import ActionsModel from "../../common/ActionsModel/ActionsModel";
import TaskModelBox from "../../common/TaskModelBox/TaskModelBox";

const TaskPage = ({ onClose }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const addedBy = userInfo && userInfo.Name ? userInfo.Name : "defaultName";
  const [formData, setFormData] = useState({
    subject: "",
    dueDate: null,
    assignee: addedBy,
    details: "",
  });

  const formatDateTime = (date) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleSave = () => {
    const taskData = {
      subject: formData.subject,
      dueDate: formatDateTime(formData.dueDate),
      assignee: formData.assignee,
      assignedDate: formatDateTime(new Date()),
      details: formData.details,
      firstName: localStorage.getItem("FirstName") || "",
      lastName: localStorage.getItem("LastName") || "",
      contact: localStorage.getItem("PriEmail") || "",
      CustomerID: localStorage.getItem("currentCustomerID") || "",
    };

    const storedData = JSON.parse(localStorage.getItem("taskData")) || {};
    if (!storedData[taskData.CustomerID]) {
      storedData[taskData.CustomerID] = [];
    }

    const existingTaskIndex = storedData[taskData.CustomerID].findIndex(
      (task) => task.subject === taskData.subject
    );

    if (existingTaskIndex !== -1) {
      storedData[taskData.CustomerID][existingTaskIndex] = taskData;
    } else {
      storedData[taskData.CustomerID].push(taskData);
    }

    localStorage.setItem("taskData", JSON.stringify(storedData));

    onClose();
  };

  const updateFormData = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <ActionsModel
      title="Assign a task for selected contacts"
      onClose={onClose}
      onSave={handleSave}
    >
      <TaskModelBox onUpdateData={updateFormData} />
    </ActionsModel>
  );
};

export default TaskPage;
