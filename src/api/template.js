import client from "./client";

const targetYear = new Date().getFullYear();

const getTemplates = () => client.get("/templates");
const analyzeSentiment = (accomplishment) =>
  client.post("/templates/analyzer", { accomplishment });

const deleteTemplate = (id) => client.delete(`/templates/${id}`);

const submitTemplate = (
  coreFunctionsMeasure,
  supportFunctionsMeasure,
  coreFunctions,
  supportFunctions,
  target,
  createdBy,
  signature
) =>
  client.post("/templates", {
    coreFunctionsMeasure,
    supportFunctionsMeasure,
    coreFunctions,
    supportFunctions,
    target,
    targetYear,
    generatedBy: {
      createdBy,
      signature,
    },
  });

const templateApi = {
  submitTemplate,
  getTemplates,
  analyzeSentiment,
  deleteTemplate,
};
export default templateApi;
