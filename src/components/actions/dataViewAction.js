// dataViewAction.js
import axios from "axios";
import {
  FETCH_DATA_VIEW_REQUEST,
  FETCH_DATA_VIEW_SUCCESS,
  FETCH_DATA_VIEW_FAILURE,
  FETCH_DATA_VIEW_ERROR,
} from "./actionTypes";

const API_BASE_URL = "https://www.goleads.com/capsapi/";

export const fetchClientData = (clientId) => async (dispatch) => {
  dispatch({ type: FETCH_DATA_VIEW_REQUEST });

  const access_token = localStorage.getItem("accessToken");

  if (!access_token) {
    dispatch({
      type: FETCH_DATA_VIEW_FAILURE,
      payload: "Access token not found. Please log in to the website.",
    });
    return;
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}api/client/view?id=${clientId}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = response.data;

    dispatch({ type: FETCH_DATA_VIEW_SUCCESS, payload: data });
  } catch (error) {
    console.error("Fetch Client Error:", error);
    dispatch({ type: FETCH_DATA_VIEW_ERROR, payload: error.message });
  }
};
