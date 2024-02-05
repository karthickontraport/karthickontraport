import { combineReducers } from "redux";
import authReducer from "./authReducers";
import contactDataReducer from "./contactDataReducer";
import mediaReducers from "./mediaReducers";
import clientDataReducer from "./clientDataReducer";
import clientFieldReducer from "./clientFieldReducer";
import notesDataReducer from "./notesDataReducer";
import addNoteReducer from "./addNoteReducer";
import updateNoteReducer from "./updateNoteReducer";
import removeNoteReducer from "./removeNoteReducer";
import refReducer from "./refReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  data: contactDataReducer,
  mediaData: mediaReducers,
  clientData: clientDataReducer,
  clientField: clientFieldReducer,
  notesReducer: notesDataReducer,
  addReducer: addNoteReducer,
  updateReducer: updateNoteReducer,
  removeReducer: removeNoteReducer,
  refReducer: refReducer,
});

export default rootReducer;
