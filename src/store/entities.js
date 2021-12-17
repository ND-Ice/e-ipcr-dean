import { combineReducers } from "redux";
import evaluations from "./evaluations";
import faculties from "./faculties";

export default combineReducers({
  evaluations,
  faculties,
});
