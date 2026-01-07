import api from "../config/axios";

export const pushBill = async (data: any) => {
  const response = await api.post("/bills", data);
  return response.data;
};