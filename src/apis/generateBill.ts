import axiosInstance from "../config/axios";

export async function generateBill(payload: any) {
  try{
    console.log('Entered generateBill try Block')
    return axiosInstance.post("/bill", payload);
  }catch(err: any){
    console.log('AXIOS ERROR: ', err)
  }
}
