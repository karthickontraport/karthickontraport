import axios from "axios";
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "./actionTypes";

const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());

    try {
      const response = await axios.get(
        "https://www.goleads.com/capsapi/api/executives/mediacodes"
      );
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
