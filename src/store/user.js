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
    userRequesetFailed: (user, action) => {
      user.loading = false;
      user.errorMessage = action.payload;
      user.successMessage = null;
    },
    currentUserReceived: (user, action) => {
      user.loading = false;
      user.currentUser = action.payload;
      user.errorMessage = null;
    },
    accountActivated: (user, action) => {
      user.loading = false;
      user.successMessage = action.payload;
      user.errorMessage = null;
    },
    changePasswordRequest: (user, action) => {
      user.loading = false;
      user.successMessage = action.payload;
      user.errorMessage = null;
    },
    userLoggedOut: (user, action) => {
      user.currentUser = null;
    },
  },
});

export const {
  currentUserReceived,
  accountActivated,
  userRequested,
  userRequesetFailed,
  changePasswordRequest,
  userLoggedOut,
} = slice.actions;
export default slice.reducer;

// selectors
export const getUser = createSelector(
  (state) => state.user,
  (user) => user
);
