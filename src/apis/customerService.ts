import axios from "axios";
import { BASE_URL, API_KEY } from "../config/env";

const headers = {
  "x-api-key": API_KEY,
  "Content-Type": "application/json"
};

export const upsertCustomer = async (payload: any) => {
  const res = await axios.post(`${BASE_URL}/customers/upsert`, payload, {
    headers
  });
  return res.data;
};

export const getCustomer = async (mobile: string) => {
  const res = await axios.get(`${BASE_URL}/customers`, {
    headers,
    params: { mobile }
  });
  return res.data;
};
