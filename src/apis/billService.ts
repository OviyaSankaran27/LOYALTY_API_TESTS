import api from "../config/axios";
import { AxiosError } from "axios";

export const pushBill = async (data: any) => {
  try {
    const response = await api.post("/bills", data);

    return {
      success: true,
      status: response.status,
      data: response.data
    };

  } catch (error) {
    const err = error as AxiosError;



    if (err.response) {
      return {
        success: false,
        status: err.response.status,
        error: err.response.data
      };
    }

    if (err.request) {
      return {
        success: false,
        status: null,
        error: "No response from server"
      };
    }

    return {
      success: false,
      status: null,
      error: err.message
    };
  }
};
