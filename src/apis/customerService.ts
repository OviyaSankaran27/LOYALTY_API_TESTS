import api from "../config/axios";

export const upsertCustomer = async (payload: any) => {
  const res = await api.post("/customers/upsert", payload);
  return res.data;
};

export const getCustomer = async (mobile: string) => {
  const res = await api.get("/customers", {
    params: { mobile }
  });
  return res.data;
};
