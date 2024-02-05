import axios from "axios";
import {
  ADD_NOTE_REQUEST,
  ADD_NOTE_ERROR,
  ADD_NOTE_SUCCESS,
} from "./actionTypes";

const API_BASE_URL = "https://www.goleads.com/capsapi/";

export const addNote = (customerId, notes, addedBy) => async (dispatch) => {
  dispatch({ type: ADD_NOTE_REQUEST });

  const access_token = localStorage.getItem("accessToken");

  if (!access_token) {
    dispatch({
      type: ADD_NOTE_ERROR,
      payload: "Access token not found. Please log in to the website.",
    });
    return;
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}api/clientnotes/addnotes`,
      new URLSearchParams({
        customerid: customerId,
        notes: notes,
        addedby: addedBy,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    dispatch({
      type: ADD_NOTE_SUCCESS,
      payload: response.data,
    });

    console.log(response.data);
  } catch (error) {
    console.error("Add Note Error:", error);
    dispatch({
      type: ADD_NOTE_ERROR,
      payload: error.message,
    });
  }
};
