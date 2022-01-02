import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    errorMessage: null,
    successMessage: null,
    currentUser: null,
  },
  reducers: {
    userRequested: (user, action) => {
      user.loading = true;
    },
    userRequestFailed: (user, action) => {
      user.loading = false;
    },
    currentUserReceived: (user, action) => {
      user.loading = false;
      user.currentUser = action.payload;
    },
    accountActivated: (user, action) => {
      user.loading = false;
      user.successMessage = action.payload;
    },
    changePasswordRequest: (user, action) => {
      user.loading = false;
    },
    userLoggedOut: (user, action) => {
      user.currentUser = null;
      localStorage.removeItem("persist:root");
    },
    userRegistered: (user, action) => {
      user.loading = false;
    },
  },
});

export const {
  currentUserReceived,
  accountActivated,
  userRequested,
  userRequestFailed,
  changePasswordRequest,
  userLoggedOut,
  userRegistered,
} = slice.actions;
export default slice.reducer;

// selectors
export const getUser = createSelector(
  (state) => state.user,
  (user) => user
);
