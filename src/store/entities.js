import { combineReducers } from "redux";
import evaluations from "./evaluations";
import faculties from "./faculties";
import responses from "./response";
import template from "./template";

export default combineReducers({
  evaluations,
  faculties,
  responses,
  template,
});
