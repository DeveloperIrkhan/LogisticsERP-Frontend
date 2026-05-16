import { ApiResponse, Driver } from "./types";
import api from "@/lib/axios";


export const getDrivers = async (): Promise<Driver[]> => {
  const respose = await api.get("/drivers");
  return respose.data;
};



export const createDriver = async (driver: Partial<Driver>) => {
  const res = await api.post<ApiResponse<Driver>>("/drivers", driver);
  return res.data.data;
};




