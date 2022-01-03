import client from "./client";

const getEvaluationResponse = (evaluationId) =>
  client.get(`/response/evaluation/${evaluationId}`);

const rateEvaluation = (
  responseId,
  user,
  dateRated,
  recommendation,
  coreFunctions,
  supportFunctions,
  average
) =>
  client.put(`/response/${responseId}`, {
    isApproved: {
      approvedBy: user,
      approvedDate: dateRated,
      recommendation: recommendation,
    },
    coreFunctions,
    supportFunctions,
    ratings: { average: average },
  });

const responseApi = { getEvaluationResponse, rateEvaluation };
export default responseApi;
