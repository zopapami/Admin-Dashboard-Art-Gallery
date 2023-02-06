import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:9090/",
  headers: { "Content-type": "application/json" }
});

export default http;
