import axios from "axios";
import {
  SENT_MAIL_REQUEST,
  SENT_MAIL_ERROR,
  SENT_MAIL_SUCCESS,
} from "./actionTypes";

const API_BASE_URL = "https://www.goleads.com/capsapi/";

export const mailAction = (emailData) => async (dispatch) => {
  dispatch({ type: SENT_MAIL_REQUEST });

  const access_token = localStorage.getItem("accessToken");

  if (!access_token) {
    dispatch({
      type: SENT_MAIL_ERROR,
      payload: "Access token not found. Please log in to the website.",
    });
    return;
  }

  try {
    const bodyFormData = new URLSearchParams();
    bodyFormData.append("to", emailData.to);
    bodyFormData.append("subject", emailData.subject);
    bodyFormData.append("body", emailData.body);
    bodyFormData.append("cc", emailData.cc);
    bodyFormData.append("bcc", emailData.bcc);

    const response = await axios.post(
      `${API_BASE_URL}api/mails/glmail`,
      bodyFormData.toString(), // Convert form data to string
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    dispatch({
      type: SENT_MAIL_SUCCESS,
      payload: response.data,
    });

    console.log(response.data);
  } catch (error) {
    console.error("Send Mail Error:", error);
    dispatch({
      type: SENT_MAIL_ERROR,
      payload: error.message,
    });
  }
};
