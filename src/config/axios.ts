import axios from "axios";

const api = axios.create({
  baseURL: "https://api.casaqa.ajira.tech/v2",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "BZHPfPzustkkLYAt2aF4"
  }
});

export default api;
