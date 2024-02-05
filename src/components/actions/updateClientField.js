// updateClientField.js

import axios from "axios";
import {
  SAVE_FIELD_REQUEST,
  SAVE_FIELD_SUCCESS,
  SAVE_FIELD_FAILURE,
} from "./actionTypes";

const API_BASE_URL = "https://www.goleads.com/capsapi/";

export const updateClientField = (id, field, value) => async (dispatch) => {
  dispatch({ type: SAVE_FIELD_REQUEST });

  const access_token = localStorage.getItem("accessToken");

  if (!access_token) {
    dispatch({
      type: SAVE_FIELD_FAILURE,
      payload: "Access token not found. Please log in to the website.",
    });
    return;
  }

  try {
    const url = `${API_BASE_URL}api/client/update?Id=${id}&field=${field}&value=${value}`;
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const updatedData = response.data;
    console.log("updateClientField", updatedData);

    dispatch({ type: SAVE_FIELD_SUCCESS, payload: updatedData });
  } catch (error) {
    console.error("Update Client Field Error:", error);
    dispatch({ type: SAVE_FIELD_FAILURE, payload: error.message });
  }
};
