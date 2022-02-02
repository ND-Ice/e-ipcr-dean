import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "template",
  initialState: {
    currentId: null,
    coreFunctionsMeasure: 90,
    supportFunctionsMeasure: 10,
    coreFunctions: [],
    supportFunctions: [],
    targetIndicator: {
      funcId: null,
      indicatorId: null,
    },
    list: [],
  },
  reducers: {
    addCoreFunction: (state, action) => {
      state.coreFunctionsMeasure -= action.payload.percentage;
      state.coreFunctions.push(action.payload);
    },
    deleteCoreFunction: (state, action) => {
      const { cfId, percentage } = action.payload;
      const updated = state.coreFunctions.filter((cf) => cf.id !== cfId);
      state.coreFunctions = updated;
      state.coreFunctionsMeasure += parseInt(percentage);
    },
    editCoreFunction: (state, action) => {
      const { cfId, title, description } = action.payload;
      const cfIdx = state.coreFunctions.findIndex((cf) => cf?.id === cfId);
      state.coreFunctions[cfIdx].title = title;
      state.coreFunctions[cfIdx].description = description;
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload.currentId;
    },
    addCoreSuccessIndicator: (state, action) => {
      const { cfId, id, title, description } = action.payload;
      const cfIdx = state.coreFunctions.findIndex((cf) => cf.id === cfId);
      state.coreFunctions[cfIdx].successIndicators.push({
        id,
        title: title,
        description,
        remarks: "",
        actualAccomplishments: {
          title: "",
          description: "",
          rating: {},
        },
      });
    },
    deleteCoreSuccessIndicator: (state, action) => {
      const { cfId, succId } = action.payload;
      const cfIdx = state.coreFunctions.findIndex((cf) => cf.id === cfId);
      const updated = state.coreFunctions[cfIdx].successIndicators.filter(
        (succ) => succ.id !== succId
      );
      state.coreFunctions[cfIdx].successIndicators = updated;
    },
    editCoreSuccessIndicator: (state, action) => {
      const { cfId, indicatorId, title, description } = action.payload;
      const cfIdx = state.coreFunctions.findIndex((cf) => cf.id === cfId);
      const succIdx = state.coreFunctions[cfIdx].successIndicators.findIndex(
        (succ) => succ.id === indicatorId
      );
      const successIndicator =
        state.coreFunctions[cfIdx].successIndicators[succIdx];

      successIndicator.title = title;
      successIndicator.description = description;
    },
    setTargetIndicator: (state, action) => {
      const { funcId, indicatorId } = action.payload;
      state.targetIndicator.funcId = funcId;
      state.targetIndicator.indicatorId = indicatorId;
    },
    // support functions
    addSupportFunctions: (state, action) => {
      state.supportFunctionsMeasure -= action.payload.percentage;
      state.supportFunctions.push(action.payload);
    },
    deleteSupportFunctions: (state, action) => {
      const { sfId, percentage } = action.payload;
      const updated = state.supportFunctions.filter((sf) => sf.id !== sfId);
      state.supportFunctions = updated;
      state.supportFunctionsMeasure += parseInt(percentage);
    },
    editSupportFunctions: (state, action) => {
      const { sfId, title, description } = action.payload;
      const sfIdx = state.supportFunctions.findIndex((sf) => sf?.id === sfId);
      state.supportFunctions[sfIdx].title = title;
      state.supportFunctions[sfIdx].description = description;
    },
    addSupportSuccessIndicator: (state, action) => {
      const { sfId, id, title, description } = action.payload;
      const sfIdx = state.supportFunctions.findIndex((sf) => sf.id === sfId);
      state.supportFunctions[sfIdx].successIndicators.push({
        id,
        title: title,
        description,
        remarks: "",
        actualAccomplishments: {
          title: "",
          description: "",
          rating: {},
        },
      });
    },
    deleteSupportSuccessIndicator: (state, action) => {
      const { sfId, succId } = action.payload;
      const sfIdx = state.supportFunctions.findIndex((sf) => sf.id === sfId);
      const updated = state.supportFunctions[sfIdx].successIndicators.filter(
        (succ) => succ.id !== succId
      );
      state.supportFunctions[sfIdx].successIndicators = updated;
    },
    editSupportSuccessIndicator: (state, action) => {
      const { sfId, indicatorId, title, description } = action.payload;
      const sfIdx = state.supportFunctions.findIndex((sf) => sf.id === sfId);
      const succIdx = state.supportFunctions[sfIdx].successIndicators.findIndex(
        (succ) => succ.id === indicatorId
      );
      const successIndicator =
        state.supportFunctions[sfIdx].successIndicators[succIdx];

      successIndicator.title = title;
      successIndicator.description = description;
    },
    clearTemplate: (state, action) => {
      state.supportFunctions = [];
      state.coreFunctions = [];
      state.coreFunctionsMeasure = 90;
      state.supportFunctionsMeasure = 10;
    },
    templatesReceived: (state, action) => {
      state.list = action.payload;
    },
    addTemplate: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTemplate: (state, action) => {
      const updated = state.list.filter(
        (template) => template._id !== action.payload.id
      );
      state.list = updated;
    },
  },
});

export const {
  addCoreFunction,
  deleteCoreFunction,
  editCoreFunction,
  setCurrentId,
  addCoreSuccessIndicator,
  deleteCoreSuccessIndicator,
  editCoreSuccessIndicator,
  setTargetIndicator,
  templatesReceived,
  addTemplate,
  deleteTemplate,

  // support functions
  addSupportFunctions,
  deleteSupportFunctions,
  editSupportFunctions,
  addSupportSuccessIndicator,
  deleteSupportSuccessIndicator,
  editSupportSuccessIndicator,
  clearTemplate,
} = slice.actions;
export default slice.reducer;

export const getTemplate = createSelector(
  (state) => state.entities.template,
  (template) => template
);
