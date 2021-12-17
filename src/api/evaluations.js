import client from "./client";

// get evaluations by department
const getEvaluations = (department) =>
  client.get(`/evaluations/department/${department}`);

const getOngoinEvaluations = (dept) =>
  client.get(`/evaluations/filter/ongoing/${dept}`);

const getPastEvaluations = (dept) =>
  client.get(`/evaluations/filter/past/${dept}`);

const createEvaluation = (evaluation) =>
  client.post("/evaluations", evaluation);

const getEvaluationPreview = (id) => client.get(`/evaluations/${id}`);

const evaluationsApi = {
  getEvaluations,
  getOngoinEvaluations,
  getPastEvaluations,
  getEvaluationPreview,
  createEvaluation,
};

export default evaluationsApi;
