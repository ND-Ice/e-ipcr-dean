import client from "./client";

const getEvaluationResponse = (evaluationId) =>
  client.get(`/response/evaluation/${evaluationId}`);

const evaluateResponse = (
  responseId,
  user,
  dateRated,
  coreFunctions,
  supportFunctions,
  attachments,
  feedback,
  evaluatorSignature,
  userSignature,
  hrSignature
) =>
  client.put(`/response/${responseId}`, {
    isApproved: {
      approvedBy: user,
      approvedDate: dateRated,
    },
    signatures: { evaluatorSignature, userSignature, hrSignature },
    feedback,
    coreFunctions,
    supportFunctions,
    attachments,
  });

const responseApi = { getEvaluationResponse, evaluateResponse };
export default responseApi;
