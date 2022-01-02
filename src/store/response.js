import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "responses",
  initialState: {
    loading: false,
    list: [],
    targetIndicator: {
      responseId: null,
      funcId: null,
      indicatorId: null,
    },
  },
  reducers: {
    evaluationReponseRequested: (state, action) => {
      state.loading = true;
    },
    evaluationReponseRequestFailed: (state, action) => {
      state.loading = false;
    },
    evaluationResponseReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    setTargetIndicator: (state, action) => {
      state.targetIndicator.responseId = action.payload.responseId;
      state.targetIndicator.funcId = action.payload.funcId;
      state.targetIndicator.indicatorId = action.payload.indicatorId;
    },
    rateCoreFunctions: (state, action) => {
      const {
        responseId,
        funcId,
        indicatorId,
        quality,
        timeliness,
        efficiency,
      } = action.payload;
      // get response idx
      const responseIdx = state.list.findIndex(
        (response) => response._id === responseId
      );
      // get response
      const response = state.list[responseIdx];
      // get core functions idx
      const coreFunctionIdx = response.coreFunctions.findIndex(
        (coreFunc) => coreFunc.id === funcId
      );
      // get core functions
      const coreFunction = response.coreFunctions[coreFunctionIdx];
      coreFunction.rawAverage.push(
        (parseInt(quality) + parseInt(timeliness) + parseInt(efficiency)) / 3
      );
      // get indicator idx
      const indicatorIdx = coreFunction.successIndicators.findIndex(
        (successIndicator) => successIndicator.id === indicatorId
      );
      // get success indicator
      const successIndicator = coreFunction.successIndicators[indicatorIdx];
      successIndicator.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average:
          (parseInt(quality) + parseInt(timeliness) + parseInt(efficiency)) / 3,
      };
    },
    rateSupportFunctions: (state, action) => {
      const {
        responseId,
        funcId,
        indicatorId,
        quality,
        timeliness,
        efficiency,
      } = action.payload;
      // get response idx
      const responseIdx = state.list.findIndex(
        (response) => response._id === responseId
      );
      // get response
      const response = state.list[responseIdx];
      // get core functions idx
      const supportFuncIdx = response.supportFunctions.findIndex(
        (suppFunc) => suppFunc.id === funcId
      );
      // get core functions
      const supportFunction = response.supportFunctions[supportFuncIdx];
      supportFunction.rawAverage.push(
        (parseInt(quality) + parseInt(timeliness) + parseInt(efficiency)) / 3
      );
      // get indicator idx
      const indicatorIdx = supportFunction.successIndicators.findIndex(
        (successIndicator) => successIndicator.id === indicatorId
      );
      // get success indicator
      const successIndicator = supportFunction.successIndicators[indicatorIdx];
      successIndicator.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average:
          (parseInt(quality) + parseInt(timeliness) + parseInt(efficiency)) / 3,
      };
    },
  },
});
export const {
  evaluationReponseRequested,
  evaluationReponseRequestFailed,
  evaluationResponseReceived,
  setTargetIndicator,
  rateCoreFunctions,
  rateSupportFunctions,
} = slice.actions;
export default slice.reducer;

export const getEvaluationResponses = createSelector(
  (state) => state.entities.responses,
  (responses) => responses
);
