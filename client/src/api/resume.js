import axios from "axios";
import api_url from "../config";

const API = axios.create({ baseURL: `${api_url}/api/resume` });
API.interceptors.request.use(cfg => {
  const t = localStorage.getItem("token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export const getMyResumes = () => API.get("/my-resumes");
export const getResume = (id) => API.get(`/${id}`);
export const createResume = (data) => API.post("/create", data);
export const updateResume = (id, data) => API.put(`/update/${id}`, data);
export const deleteResume = (id) => API.delete(`/delete/${id}`);
