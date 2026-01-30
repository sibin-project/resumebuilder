import axios from "axios";
import api_url from "../config";

const API = axios.create({
  baseURL: `${api_url}/api/ai`,
  timeout: 20000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// For chatbot messages
export const sendMessageToAI = async (prompt) => {
  const res = await API.post("/chat", { prompt });
  return res.data.reply;
};

// For generating resume summary
export const generateSummary = async (data) => {
  const res = await API.post("/generate-summary", data);
  return res.data.summary;
};

export const enhanceExperience = async (text) => {
  const res = await API.post("/enhance-experience", { text });
  return res.data.result;
};

export const atsOptimize = async (text) => {
  const res = await API.post("/ats-optimize", { text });
  return res.data.result;
};

export const checkGrammar = async (text) => {
  const res = await API.post("/grammar-check", { text });
  return res.data.result;
};

export const formatText = async (text) => {
  const res = await API.post("/format-text", { text });
  return res.data.result;
};

export const analyzeResume = async (resumeData) => {
  const res = await API.post("/analyze-resume", { resumeData });
  return res.data;
};
