import client from "./client";

// get evaluations by department
const getEvaluations = (department) =>
  client.get(`/evaluations/department/${department}`);

const createEvaluation = (evaluation) =>
  client.post("/evaluations", evaluation);

const getEvaluationPreview = (id) => client.get(`/evaluations/${id}`);

const evaluationsApi = {
  getEvaluations,
  getEvaluationPreview,
  createEvaluation,
};

export default evaluationsApi;
