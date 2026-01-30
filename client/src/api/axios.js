import axios from "axios";
import api_url from "../config";

const api = axios.create({
  baseURL: api_url, // ONLY main backend URL here
});

export default api;
