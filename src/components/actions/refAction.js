import axios from "axios";
import {
  FETCH_REF_REQUEST,
  FETCH_REF_SUCCESS,
  FETCH_REF_FAILURE,
} from "./actionTypes";

const fetchRefDataRequest = () => ({
  type: FETCH_REF_REQUEST,
});

const fetchRefDataSuccess = (data) => ({
  type: FETCH_REF_SUCCESS,
  payload: data,
});

const fetchRefDataFailure = (error) => ({
  type: FETCH_REF_FAILURE,
  payload: error,
});

export const fetchRefData = () => {
  return async (dispatch) => {
    dispatch(fetchRefDataRequest());

    try {
      const response = await axios.get(
        "https://www.goleads.com/capsapi/api/executives/list"
      );
      dispatch(fetchRefDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchRefDataFailure(error.message));
    }
  };
};
