import {
  REMOVE_NOTE_REQUEST,
  REMOVE_NOTE_SUCCESS,
  REMOVE_NOTE_ERROR,
} from "../actions/actionTypes";

const initialState = {
  removeLoading: false,
  error: null,
  successMessage: null,
};

const removeNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_NOTE_REQUEST:
      return {
        ...state,
        removeLoading: true,
        error: null,
        successMessage: null,
      };

    case REMOVE_NOTE_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        successMessage: action.payload,
      };

    case REMOVE_NOTE_ERROR:
      return {
        ...state,
        removeLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default removeNoteReducer;
