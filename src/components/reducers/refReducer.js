import {
  FETCH_REF_REQUEST,
  FETCH_REF_SUCCESS,
  FETCH_REF_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const refReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REF_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_REF_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_REF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default refReducer;
