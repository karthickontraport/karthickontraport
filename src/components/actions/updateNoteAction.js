import axios from "axios";
import {
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_ERROR,
  UPDATE_NOTE_SUCCESS,
} from "./actionTypes";

const API_BASE_URL = "https://www.goleads.com/capsapi/";

export const updateNote = (customerId, notes, notedid) => async (dispatch) => {
  dispatch({ type: UPDATE_NOTE_REQUEST });

  const access_token = localStorage.getItem("accessToken");

  if (!access_token) {
    dispatch({
      type: UPDATE_NOTE_ERROR,
      payload: "Access token not found. Please log in to the website.",
    });
    return;
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}api/clientnotes/editnotes`,
      new URLSearchParams({
        customerid: customerId,
        notes: notes,
        notesid: notedid,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    dispatch({
      type: UPDATE_NOTE_SUCCESS,
      payload: response.data,
    });

    console.log(response.data);
  } catch (error) {
    console.error("Add Note Error:", error);
    dispatch({
      type: UPDATE_NOTE_ERROR,
      payload: error.message,
    });
  }
};
