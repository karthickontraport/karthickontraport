import {
  SENT_MAIL_REQUEST,
  SENT_MAIL_ERROR,
  SENT_MAIL_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  success: false,
  responseData: null,
};

const mailReducers = (state = initialState, action) => {
  switch (action.type) {
    case SENT_MAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
        responseData: null,
      };
    case SENT_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        responseData: action.payload,
      };
    case SENT_MAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
        responseData: null,
      };
    default:
      return state;
  }
};

export default mailReducers;
