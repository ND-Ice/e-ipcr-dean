import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "evaluations",
  initialState: {
    loading: false,
    lastFetch: null,
    list: [],
    responses: [],
  },
  reducers: {
    evaluationsRequested: (evaluations, action) => {
      evaluations.loading = true;
    },
    evaluationsRequestFailed: (evaluations, action) => {
      evaluations.loading = false;
    },
    evaluationsReceived: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.lastFetch = Date.now();
      evaluations.list = action.payload;
    },
    evaluationsAdded: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.list.push(action.payload);
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
  evaluationPreviewed,
} = slice.actions;
export default slice.reducer;

// selectors
export const getEvaluations = createSelector(
  (state) => state.entities.evaluations,
  (evaluations) => evaluations
);
