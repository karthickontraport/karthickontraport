import axios from "axios";
import {
  NOTES_FETCH_REQUEST,
  NOTES_FETCH_FAILURE,
  NOTES_FETCH_SUCCESS,
} from "./actionTypes";

const API_BASE_URL = "https://www.goleads.com/capsapi/";

export const fetchNotesData = (customerId) => async (dispatch) => {
  dispatch({ type: NOTES_FETCH_REQUEST });

  const access_token = localStorage.getItem("accessToken");

  if (!access_token) {
    dispatch({
      type: NOTES_FETCH_FAILURE,
      payload: "Access token not found. Please log in to the website.",
    });
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}api/clientnotes/lists`, {
      params: {
        customerid: customerId,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
    });

    let notesData = response.data;

    dispatch({
      type: NOTES_FETCH_SUCCESS,
      payload: notesData,
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    dispatch({
      type: NOTES_FETCH_FAILURE,
      payload: error.message,
    });
  }
};
