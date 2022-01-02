import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "faculties",
  initialState: {
    loading: null,
    lastFetch: null,
    errorMessage: null,
    sortBy: null,
    list: [],
  },
  reducers: {
    facultiesRequested: (faculties, action) => {
      faculties.loading = true;
    },
    facultiesRequestFailed: (faculties, action) => {
      faculties.loading = false;
      faculties.errorMessage = action.payload;
    },
    facultiesReceived: (faculties, action) => {
      faculties.loading = false;
      faculties.lastFetch = Date.now();
      faculties.list = action.payload;
    },
    facultySorted: (faculties, action) => {
      faculties.sortBy = action.payload;
    },
  },
});

export const {
  facultiesReceived,
  facultiesRequested,
  facultiesRequestFailed,
  facultySorted,
} = slice.actions;
export default slice.reducer;

// selectors
export const getFaculties = createSelector(
  (state) => state.entities.faculties,
  (faculties) => faculties
);
