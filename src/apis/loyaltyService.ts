import api from "../config/axios";

export const validateRedeem = async (payload: any) => {
  const res = await api.post("/loyalty/validate-redeem", payload);
  return res.data;
};

export const blockRedeem = async (payload: any) => {
  const res = await api.post("/loyalty/block-redeem", payload);
  return res.data;
};
