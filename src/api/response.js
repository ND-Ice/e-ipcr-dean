import client from "./client";

const getEvaluationResponse = (evaluationId) =>
  client.get(`/response/evaluation/${evaluationId}`);

const rateEvaluation = (
  responseId,
  user,
  coreFunctions,
  supportFunctions,
  average
) =>
  client.put(`/response/${responseId}`, {
    isApproved: {
      approvedBy: user,
    },
    coreFunctions,
    supportFunctions,
    ratings: { average: average },
  });

const responseApi = { getEvaluationResponse, rateEvaluation };
export default responseApi;
