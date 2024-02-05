import {
  NOTES_FETCH_REQUEST,
  NOTES_FETCH_FAILURE,
  NOTES_FETCH_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  noteData: [],
  loading: false,
  error: null,
};

const notesDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTES_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case NOTES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        noteData: action.payload,
        error: null,
      };
    case NOTES_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default notesDataReducer;
