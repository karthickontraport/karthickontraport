// clientFieldReducer.js

import {
  EDIT_FIELD,
  SAVE_FIELD_REQUEST,
  SAVE_FIELD_SUCCESS,
  SAVE_FIELD_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  fields: {},
  uploading: false,
  uperror: null,
  upsuccess: false,
};

const clientFieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.fieldName]: action.payload.fieldValue,
        },
      };

    case SAVE_FIELD_REQUEST:
      return {
        ...state,
        uploading: true,
        upsuccess: false,
      };

    case SAVE_FIELD_SUCCESS:
      return {
        ...state,
        uploading: false,
        upsuccess: true,
        uperror: null,
      };

    case SAVE_FIELD_FAILURE:
      return {
        ...state,
        uploading: false,
        uperror: action.payload,
        upsuccess: false,
      };

    default:
      return state;
  }
};

export default clientFieldReducer;
