// clientDataReducer.js
import {
  FETCH_DATA_VIEW_REQUEST,
  FETCH_DATA_VIEW_SUCCESS,
  FETCH_DATA_VIEW_FAILURE,
  FETCH_DATA_VIEW_ERROR,
} from "../actions/actionTypes";

const initialState = {
  cliData: {},
  cliLoading: false,
  error: null,
};

const clientDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_VIEW_REQUEST:
      return {
        ...state,
        cliLoading: true,
        error: null,
      };
    case FETCH_DATA_VIEW_SUCCESS:
      return {
        ...state,
        cliLoading: false,
        cliData: action.payload,
      };
    case FETCH_DATA_VIEW_FAILURE:
    case FETCH_DATA_VIEW_ERROR:
      return {
        ...state,
        cliLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default clientDataReducer;
