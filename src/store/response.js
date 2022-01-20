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
    // feedback
    addComment: (state, action) => {
      const { responseId, comments } = action.payload;
      const responseIdx = state.list.findIndex(
        (response) => response._id === responseId
      );
      const response = state.list[responseIdx];
      response.feedback.comments = comments;
    },
    addRecommendation: (state, action) => {
      const { responseId, recommendations } = action.payload;
      const responseIdx = state.list.findIndex(
        (response) => response._id === responseId
      );
      const response = state.list[responseIdx];
      response.feedback.recommendations = recommendations;
    },
    // add core rating
    addCoreRating: (state, action) => {
      const { responseId, funcId, succId, quality, timeliness, efficiency } =
        action.payload;

      const responseIdx = state.list.findIndex(
        (response) => response._id === responseId
      );
      const response = state.list[responseIdx];
      const cfIdx = response.coreFunctions.findIndex((cf) => cf.id === funcId);

      const cf = response.coreFunctions[cfIdx];
      cf.rawAverage.push(
        (parseInt(quality) + parseInt(timeliness) + parseInt(efficiency)) / 3
      );
      const succIdx = cf.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = cf.successIndicators[succIdx];
      succ.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average:
          (parseInt(quality) + parseInt(timeliness) + parseInt(efficiency)) / 3,
      };
    },
    addSupportRating: (state, action) => {
      const { responseId, funcId, succId, quality, timeliness, efficiency } =
        action.payload;

      const responseIdx = state.list.findIndex(
        (response) => response._id === responseId
      );
      const response = state.list[responseIdx];
      const sfIdx = response.supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );

      const sf = response.supportFunctions[sfIdx];
      sf.rawAverage.push(
        (parseInt(quality) + parseInt(timeliness) + parseInt(efficiency)) / 3
      );
      const succIdx = sf.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = sf.successIndicators[succIdx];
      succ.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average:
          (parseInt(quality) + parseInt(timeliness) + parseInt(efficiency)) / 3,
      };
    },
    // core remarks
    deleteCoreRemarks: (state, action) => {
      const { responseId, funcId, succId } = action.payload;
      const responseIdx = state.list.findIndex(
        (response) => response._id === responseId
      );
      const cfIdx = state.list[responseIdx].coreFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      const succIdx = state.list[responseIdx].coreFunctions[
        cfIdx
      ].successIndicators.findIndex((succ) => succ.id === succId);

      const succ =
        state.list[responseIdx].coreFunctions[cfIdx].successIndicators[succIdx];
      succ.remarks = "";
    },
    addCoreRemarks: (state, action) => {
      const { responseId, funcId, succId, remarks } = action.payload;
      const responseIdx = state.list.findIndex(
        (response) => response._id === responseId
      );
      const cfIdx = state.list[responseIdx].coreFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      const cf = state.list[responseIdx].coreFunctions[cfIdx];
      const succIdx = cf.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = cf.successIndicators[succIdx];
      succ.remarks = remarks;
    },
    addSupportRemarks: (state, action) => {
      const { responseId, funcId, succId, remarks } = action.payload;
      const responseIdx = state.list.findIndex(
        (response) => response._id === responseId
      );
      const sfIdx = state.list[responseIdx].supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const sf = state.list[responseIdx].supportFunctions[sfIdx];
      const succIdx = sf.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = sf.successIndicators[succIdx];
      succ.remarks = remarks;
    },
    deleteSupportRemarks: (state, action) => {
      const { responseId, funcId, succId } = action.payload;
      const responseIdx = state.list.findIndex(
        (response) => response._id === responseId
      );
      const sfIdx = state.list[responseIdx].supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const succIdx = state.list[responseIdx].supportFunctions[
        sfIdx
      ].successIndicators.findIndex((succ) => succ.id === succId);

      const succ =
        state.list[responseIdx].supportFunctions[sfIdx].successIndicators[
          succIdx
        ];
      succ.remarks = "";
    },
    // ratings
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
  addComment,
  addRecommendation,
  setTargetIndicator,
  rateCoreFunctions,
  rateSupportFunctions,
  addCoreRemarks,
  addSupportRemarks,
  deleteCoreRemarks,
  deleteSupportRemarks,
  addCoreRating,
  addSupportRating,
} = slice.actions;
export default slice.reducer;

export const getEvaluationResponses = createSelector(
  (state) => state.entities.responses,
  (responses) => responses
);
