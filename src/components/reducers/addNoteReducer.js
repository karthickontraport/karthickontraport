import {
  ADD_NOTE_REQUEST,
  ADD_NOTE_ERROR,
  ADD_NOTE_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  addLoading: false,
  addError: null,
  successData: [],
};

const addNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE_REQUEST:
      return {
        ...state,
        addLoading: true,
        addError: null,
        successData: [],
      };

    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        addLoading: false,
        successData: action.payload,
      };

    case ADD_NOTE_ERROR:
      return {
        ...state,
        addLoading: false,
        addError: action.payload,
      };

    default:
      return state;
  }
};

export default addNoteReducer;
