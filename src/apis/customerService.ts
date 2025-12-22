import axios from "axios";
import { BASE_URL, API_KEY } from "../config/env";

export const upsertCustomer = async (payload: any) => {
  const res = await axios.post(`${BASE_URL}/customers/upsert`, payload, {
    headers: { "x-api-key": API_KEY, "Content-Type": "application/json" }
  });
  return res.data;
};

export const getCustomers = async (mobile: string) => {
  const res = await axios.get(`${BASE_URL}/customers`, {
    headers: { "x-api-key": API_KEY },
    params: { mobile }
  });
  return res.data;
};
