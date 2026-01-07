import api from "../config/axios";

export const upsertCustomer = async (data: any) => {
  const response = await api.post("/customers", data);
  return response.data;
};

export const getCustomer = async (mobile: string) => {
  const response = await api.get(`/customers?mobile=${mobile}`);
  return response.data;
};