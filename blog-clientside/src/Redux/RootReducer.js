import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./Features/UserSlice";

const rootReducer = combineReducers({
  user: UserSlice,
});
export default rootReducer;
