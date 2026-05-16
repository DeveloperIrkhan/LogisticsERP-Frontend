import { ApiResponse, IVehicleCreateRequest, IVehicleResponse } from "./types";
import api from "@/lib/axios";

export const getVehicles = async (): Promise<IVehicleCreateRequest[]> => {
  const response = await api.get("/Vehicle/get-all-vehicle");
  return response.data;
};

export const getVehicleById = async (
  id: string,
): Promise<IVehicleCreateRequest> => {
  const response = await api.get(`/Vehicle/get-vehicle-by-id/${id}`);
  return response.data;
};

export const createVehicle = async (
  IVehicleCreateRequest: Partial<IVehicleCreateRequest>,
) => {
  const response = await api.post<ApiResponse<IVehicleCreateRequest>>(
    "/Vehicle/add-vehicle",
    IVehicleCreateRequest,
  );
  return response.data.data;
};
export const updateVehicle = async (
  IVehicleCreateRequest: Partial<IVehicleCreateRequest>,
) => {
  const response = await api.put<ApiResponse<IVehicleCreateRequest>>(
    "/Vehicle/update-vehicle",
    IVehicleCreateRequest,
  );
  return response.data.data;
};
