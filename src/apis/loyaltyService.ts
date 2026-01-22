import axiosInstance from "../config/axios";

export async function getLoyalty(mobile: string) {
  try{
  return axiosInstance.get(`/loyalty`, { params: { mobile } });
  }catch(err: any){
    console.log('AXIOS ERROR: ', err)
  }
}
