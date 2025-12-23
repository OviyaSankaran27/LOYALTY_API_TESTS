import axios from "axios";
import { BASE_URL, API_KEY } from "../config/env";

const headers = {
  "x-api-key": API_KEY,
  "Content-Type": "application/json"
};

export const validateRedeem = async (payload: any) => {
  const res = await axios.post(`${BASE_URL}/loyalty/validate-redeem`, payload, {
    headers
  });
  return res.data;
};

export const blockRedeem = async (payload: any) => {
  const res = await axios.post(`${BASE_URL}/loyalty/block-redeem`, payload, {
    headers
  });
  return res.data;
};
