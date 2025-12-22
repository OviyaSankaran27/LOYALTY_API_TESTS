// src/apis/loyaltyService.ts
import axios from "axios";
import { BASE_URL, API_KEY } from "../config/env";

export const validateRedeem = async (payload: any) => {
  try {
    const res = await axios.post(`${BASE_URL}/loyalty/validate-redeem`, payload, {
      headers: { "x-api-key": API_KEY, "Content-Type": "application/json" }
    });
    return res.data;
  } catch (err: any) {
    if (err.response) throw new Error(JSON.stringify(err.response.data));
    throw new Error(err.message);
  }
};

export const blockRedeem = async (payload: any) => {
  try {
    const res = await axios.post(`${BASE_URL}/loyalty/block-redeem`, payload, {
      headers: { "x-api-key": API_KEY, "Content-Type": "application/json" }
    });
    return res.data;
  } catch (err: any) {
    if (err.response) throw new Error(JSON.stringify(err.response.data));
    throw new Error(err.message);
  }
};
