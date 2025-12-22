import axios from "axios";
import { BASE_URL, API_KEY } from "../config/env";
import { Bill } from "../models/BillModel";

export const generateBill = async (billData: Bill) => {
  try {
    const response = await axios.post(`${BASE_URL}/bills`, billData, {
      headers: { "Authorization": `Bearer ${API_KEY}` }
    });
    return response.data;
  } catch (err: any) {
    if (err.response) {
      throw new Error(`Bill API failed: ${JSON.stringify(err.response.data)}`);
    } else {
      throw new Error(`generateBill API failed: ${err.message}`);
    }
  }
};
