import api from "../config/axios";

export const validateRedeem = async (data: any) => {
  const response = await api.post("/redemption/validate", data);
  return response.data;
};

export const blockRedeem = async (data: any) => {
  const response = await api.post("/redemption/block", data);
  return response.data;
};