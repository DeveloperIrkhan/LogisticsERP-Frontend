import { IDriverResponseDto } from "./types";
import api from "@/lib/axios";

export const getDrivers = async (): Promise<IDriverResponseDto[]> => {
  const respose = await api.get("/Driver/get-all-driver");
  return respose.data;
};

export const getDriverById = async (
  id: string,
): Promise<IDriverResponseDto> => {
  const response = await api.get(`/Driver/get-driver-by-id/${id}`);
  return response.data;
};

export const createDriver = async (formDate: FormData) => {
  const res = await api.post("/Driver/add-driver", formDate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};
