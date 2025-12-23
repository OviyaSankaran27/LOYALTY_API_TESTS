import axios from "axios";
import { BASE_URL, API_KEY } from "../config/env";

const headers = {
  "x-api-key": API_KEY,
  "Content-Type": "application/json"
};

export const generateBill = async (payload: any) => {
  const res = await axios.post(`${BASE_URL}/bills`, payload, {
    headers
  });
  return res.data;
};
