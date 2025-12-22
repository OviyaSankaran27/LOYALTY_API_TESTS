// src/apis/customerService.ts
import axios from "axios";
import { BASE_URL, API_KEY } from "../config/env";

export const upsertCustomer = async (payload: any) => {
  try {
    const res = await axios.post(`${BASE_URL}/customers/upsert`, payload, {
      headers: { "x-api-key": API_KEY, "Content-Type": "application/json" }
    });
    return res.data;
  } catch (err: any) {
    if (err.response) throw new Error(JSON.stringify(err.response.data));
    throw new Error(err.message);
  }
};

export const getCustomers = async (mobileOrQuery: string) => {
  try {
    // Accept either a mobile string or a query object; here we pass mobile as string
    const res = await axios.get(`${BASE_URL}/customers`, {
      headers: { "api-key": API_KEY },
      params: { mobile: mobileOrQuery }
    });
    return res.data;
  } catch (err: any) {
    if (err.response) throw new Error(JSON.stringify(err.response.data));
    throw new Error(err.message);
  }
};
