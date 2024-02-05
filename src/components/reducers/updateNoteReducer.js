import {
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_ERROR,
  UPDATE_NOTE_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  updatingNote: false,
  updateNoteError: null,
  updateNoteSuccess: [],
};

const updateNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NOTE_REQUEST:
      return {
        ...state,
        updatingNote: true,
        updateNoteError: null,
        updateNoteSuccess: [],
      };

    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        updatingNote: false,
        updateNoteSuccess: action.payload,
      };

    case UPDATE_NOTE_ERROR:
      return {
        ...state,
        updatingNote: false,
        updateNoteError: action.payload,
      };

    default:
      return state;
  }
};

export default updateNoteReducer;
