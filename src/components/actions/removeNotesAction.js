import axios from "axios";
import {
  REMOVE_NOTE_REQUEST,
  REMOVE_NOTE_ERROR,
  REMOVE_NOTE_SUCCESS,
} from "./actionTypes";

const API_BASE_URL = "https://www.goleads.com/capsapi/";

export const removeNote = (notesId) => async (dispatch) => {
  dispatch({ type: REMOVE_NOTE_REQUEST });

  const access_token = localStorage.getItem("accessToken");

  if (!access_token) {
    dispatch({
      type: REMOVE_NOTE_ERROR,
      payload: "Access token not found. Please log in to the website.",
    });
    return;
  }

  try {
    const url = `${API_BASE_URL}api/clientnotes/removenotes?notesId=${notesId}`;
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    dispatch({
      type: REMOVE_NOTE_SUCCESS,
      payload: response.data,
    });

    console.log(response.data);
  } catch (error) {
    console.error("Add Note Error:", error);
    dispatch({
      type: REMOVE_NOTE_ERROR,
      payload: error.message,
    });
  }
};
