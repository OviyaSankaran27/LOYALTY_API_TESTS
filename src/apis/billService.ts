import api from "../config/axios";
import { Bill } from "../models/BillModel";

export const generateBill = async (billData: Bill) => {
  const res = await api.post("/bills", billData);
  return res.data;
};
