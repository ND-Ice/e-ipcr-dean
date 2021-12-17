import client from "./client";

const getFacultiesByDepartment = (dept) =>
  client.get(`/faculties/department/${dept}`);

const facultiesApi = { getFacultiesByDepartment };
export default facultiesApi;
