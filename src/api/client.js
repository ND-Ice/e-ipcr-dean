import axios from "axios";

const client = axios.create({
  baseURL: "https://e-ipcr-backend.herokuapp.com/api",
});

export default client;
