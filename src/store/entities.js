import { combineReducers } from "redux";
import evaluations from "./evaluations";
import faculties from "./faculties";
import responses from "./response";

export default combineReducers({
  evaluations,
  faculties,
  responses,
});
