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

    addCoreSentiment: (state, action) => {
      const { currentId, funcId, succId, sentiment } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template?._id === currentId
      );
      const template = state.list[templateIdx];
      const cfIdx = template.coreFunctions.findIndex((cf) => cf.id === funcId);
      const coreFunction = template.coreFunctions[cfIdx];

      const succIdx = coreFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = coreFunction.successIndicators[succIdx];
      succ.actualAccomplishments.sentiment = sentiment;
    },
    // edit core rating
    editCoreRating: (state, action) => {
      const { currentId, funcId, succId, quality, timeliness, efficiency } =
        action.payload;

      const rawScore = [
        quality && parseInt(quality),
        timeliness && parseInt(timeliness),
        efficiency && parseInt(efficiency),
      ];

      const newRawScore = rawScore.filter((score) => typeof score === "number");
      const rawAverage = newRawScore.reduce((acc, curr) => acc + curr, 0);

      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );

      const template = state.list[templateIdx];
      const cfIdx = template.coreFunctions.findIndex((cf) => cf.id === funcId);
      const coreFunction = template.coreFunctions[cfIdx];

      const aveIdx = coreFunction.rawAverage.findIndex(
        (ave) => ave.id === succId
      );

      coreFunction.rawAverage[aveIdx] = {
        id: succId,
        average: parseInt(rawAverage) / newRawScore.length,
      };

      const succIdx = coreFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = coreFunction.successIndicators[succIdx];
      succ.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average: parseInt(rawAverage) / newRawScore.length,
      };
    },

    deleteCoreRating: (state, action) => {
      const { currentId, funcId, succId } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const cfIdx = state.list[templateIdx].coreFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      const coreFunction = state.list[templateIdx].coreFunctions[cfIdx];
      const succIdx = coreFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = coreFunction.successIndicators[succIdx];
      const updatedAverage = coreFunction.rawAverage.filter(
        (ave) => ave.id !== succId
      );
      coreFunction.rawAverage = updatedAverage;
      succ.actualAccomplishments.rating = {};
    },

    // add core rating
    addCoreRating: (state, action) => {
      const { currentId, funcId, succId, quality, timeliness, efficiency } =
        action.payload;

      const rawScore = [
        quality && parseInt(quality),
        timeliness && parseInt(timeliness),
        efficiency && parseInt(efficiency),
      ];

      const newRawScore = rawScore.filter((score) => typeof score === "number");
      const rawAverage = newRawScore.reduce((acc, curr) => acc + curr, 0);

      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );

      const template = state.list[templateIdx];
      const cfIdx = template.coreFunctions.findIndex((cf) => cf.id === funcId);
      const coreFunction = template.coreFunctions[cfIdx];

      const aveIdx = coreFunction.rawAverage.findIndex(
        (ave) => ave.id === succId
      );

      if (aveIdx !== -1) {
        coreFunction.rawAverage[aveIdx] = {
          id: succId,
          average: parseInt(rawAverage) / newRawScore,
        };
      } else {
        coreFunction.rawAverage.push({
          id: succId,
          average: parseInt(rawAverage) / newRawScore.length,
        });
      }

      const succIdx = coreFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = coreFunction.successIndicators[succIdx];
      succ.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average: parseInt(rawAverage) / newRawScore.length,
      };
    },

    // support rating
    addSupportSentiment: (state, action) => {
      const { currentId, funcId, succId, sentiment } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template?._id === currentId
      );
      const template = state.list[templateIdx];
      const sfIdx = template.supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const supportFunction = template.supportFunctions[sfIdx];

      const succIdx = supportFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = supportFunction.successIndicators[succIdx];
      succ.actualAccomplishments.sentiment = sentiment;
    },
    editSupportRating: (state, action) => {
      const { currentId, funcId, succId, quality, timeliness, efficiency } =
        action.payload;

      const rawScore = [
        quality && parseInt(quality),
        timeliness && parseInt(timeliness),
        efficiency && parseInt(efficiency),
      ];

      const newRawScore = rawScore.filter((score) => typeof score === "number");
      const rawAverage = newRawScore.reduce((acc, curr) => acc + curr, 0);

      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );

      const template = state.list[templateIdx];
      const sfIdx = template.supportFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      const supportFunction = template.supportFunctions[sfIdx];

      const aveIdx = supportFunction.rawAverage.findIndex(
        (ave) => ave.id === succId
      );

      supportFunction.rawAverage[aveIdx] = {
        id: succId,
        average: parseInt(rawAverage) / newRawScore.length,
      };

      const succIdx = supportFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = supportFunction.successIndicators[succIdx];
      succ.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average: parseInt(rawAverage) / newRawScore.length,
      };
    },

    deleteSupportRating: (state, action) => {
      const { currentId, funcId, succId } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const sfIdx = state.list[templateIdx].supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const supportFunction = state.list[templateIdx].supportFunctions[sfIdx];
      const succIdx = supportFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = supportFunction.successIndicators[succIdx];
      const updatedAverage = supportFunction.rawAverage.filter(
        (ave) => ave.id !== succId
      );
      supportFunction.rawAverage = updatedAverage;
      succ.actualAccomplishments.rating = {};
    },

    addSupportRating: (state, action) => {
      const { currentId, funcId, succId, quality, timeliness, efficiency } =
        action.payload;

      const rawScore = [
        quality && parseInt(quality),
        timeliness && parseInt(timeliness),
        efficiency && parseInt(efficiency),
      ];

      const newRawScore = rawScore.filter((score) => typeof score === "number");
      const rawAverage = newRawScore.reduce((acc, curr) => acc + curr, 0);

      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );

      const template = state.list[templateIdx];
      const sfIdx = template.supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const supportFunction = template.supportFunctions[sfIdx];

      supportFunction.rawAverage.push({
        id: succId,
        average: parseInt(rawAverage) / newRawScore.length,
      });

      const succIdx = supportFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = supportFunction.successIndicators[succIdx];
      succ.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average: parseInt(rawAverage) / newRawScore.length,
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
      succ.actualAccomplishments.sentiment = "";
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
      succ.actualAccomplishments.sentiment = "";
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
  addCoreRemarks,
  addSupportRemarks,
  deleteCoreRemarks,
  deleteSupportRemarks,
  addCoreRating,
  deleteCoreRating,
  editCoreRating,
  addSupportRating,
  deleteSupportRating,
  editSupportRating,
  addCoreSentiment,
  addSupportSentiment,
} = slice.actions;
export default slice.reducer;

export const getEvaluationResponses = createSelector(
  (state) => state.entities.responses,
  (responses) => responses
);
