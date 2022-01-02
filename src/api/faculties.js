import client from "./client";

const getFaculties = (dept) => client.get(`/faculties/`);
const getFaculty = (id) => client.get(`/faculties/${id}`);

const facultiesApi = { getFaculties, getFaculty };
export default facultiesApi;
