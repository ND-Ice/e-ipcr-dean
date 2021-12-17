import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "evaluations",
  initialState: {
    loading: false,
    lastFetch: null,
    errorMessage: null,
    successMessage: null,
    preview: null,
    list: [],
    ongoing: [],
    past: [],
  },
  reducers: {
    evaluationsRequested: (evaluations, action) => {
      evaluations.loading = true;
    },
    evaluationsRequestFailed: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.errorMessage = action.payload;
      evaluations.successMessage = null;
    },
    evaluationsReceived: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.lastFetch = Date.now();
      evaluations.list = action.payload;
    },
    evaluationsAdded: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.list.push(action.payload);
      evaluations.successMessage = "Added Successfuly.";
      evaluations.errorMessage = null;
    },
    ongoingReceived: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.ongoing = action.payload;
    },
    pastReceived: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.past = action.payload;
    },
    evaluationPreviewed: (evaluations, action) => {
      evaluations.preview = action.payload;
      evaluations.loading = false;
    },
  },
});

export const {
  evaluationsReceived,
  evaluationsRequested,
  evaluationsRequestFailed,
  evaluationsAdded,
  ongoingReceived,
  pastReceived,
  evaluationPreviewed,
} = slice.actions;
export default slice.reducer;

// selectors
export const getEvaluations = createSelector(
  (state) => state.entities.evaluations,
  (evaluations) => evaluations
);
