import { combineReducers } from "redux";
import authReducer from "./authReducers";
import contactDataReducer from "./contactDataReducer";
import mediaReducers from "./mediaReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  data: contactDataReducer,
  mediaData: mediaReducers,
});

export default rootReducer;
