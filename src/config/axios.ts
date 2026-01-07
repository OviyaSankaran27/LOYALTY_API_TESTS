import axios from "axios";
import { BASE_URL, API_KEY } from "./env";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
    "api-key": API_KEY
  },
  timeout: 10000
});

api.interceptors.request.use((config) => {
  console.log(`HTTP_REQUEST: [${config.method?.toUpperCase()}] ${config.url}`);
  return config;
});

export default api;