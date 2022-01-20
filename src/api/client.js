import axios from "axios";

const client = axios.create({
  // baseURL: "https://e-ipcr-backend.herokuapp.com/api",
  baseURL: "http://localhost:5000/api",
});

export default client;
