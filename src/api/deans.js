import client from "./client";

const getDeans = () => client.get("/deans");
const addDean = (dean) => client.post("/deans", dean);

const deansApi = { getDeans, addDean };
export default deansApi;
