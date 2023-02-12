import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:9090/dashboard/",
  headers: { "Content-type": "application/json" }
});

export default http;
