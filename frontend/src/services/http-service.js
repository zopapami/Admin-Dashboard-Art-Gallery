import axios from "axios";

const admin = axios.create({
  baseURL: "http://localhost:9090/admin/dashboard/",
  headers: { "Content-type": "application/json" }
});

const main = axios.create({
  baseURL: "http://localhost:9090/",
  headers: { "Content-type": "application/json" }
});

const http = {
  admin,
  main
};

export default http;
