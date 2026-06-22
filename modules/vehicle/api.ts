import {
  ApiResponse,
  IVehicleCreateRequest,
  IVehicleResponse,
  VehicleFilterDto,
  VehicleStatus,
} from "./types";
import api from "@/lib/axios";

const VEHICLE_ENDPOINTS = {
  getAll: "/Vehicle/get-all-vehicles",
  add: "/Vehicle/add-vehicle",
  getFullRecord: "/Vehicle/get-full-record-of-vehicleId",
  getDocuments: "/Vehicle/get-documents-of-vehicle",
  getById: "/Vehicle/get-vehicle-by-id",
  getAssignedList: "/Vehicle/get-active-vehicle-list",
  getUnassignedList: "/Vehicle/get-unassigned-vehicle-list",
  getDriversForVehicle: "/Vehicle/get-assigned-drivers-for-vehicle",
  update: "/Vehicle/update-vehicle",
  delete: "/Vehicle/delete-vehicle",
  filter: "/Vehicle/filtering-vehicle",
  getRegistrationExpiry: "/Vehicle/get-registeration-expiry",
  getFitnessExpiry: "/Vehicle/get-fitness-expiry",
  getInsuranceExpiry: "/Vehicle/get-Insurance-expiry",
  changeState: "/Vehicle/change-vehicle-state",
  getByStatus: "/Vehicle/get-by-status",
} as const;

export const createVehicleAsync = async (
  data: IVehicleCreateRequest,
): Promise<ApiResponse<IVehicleResponse>> => {
  const response = await api.post(`${VEHICLE_ENDPOINTS.add}`, data);
  return response.data;
};

export const getVehicleByIdAsync = async (
  id: string,
): Promise<ApiResponse<IVehicleResponse>> => {
  const response = await api.get(`${VEHICLE_ENDPOINTS.getById}/${id}`);
  return response.data;
};
export const getVehicleFullRecordByIdAsync = async (
  id: string,
): Promise<ApiResponse<IVehicleResponse>> => {
  const response = await api.get(`${VEHICLE_ENDPOINTS.getFullRecord}/${id}`);
  return response.data;
};
export const getVehicleDocumentsAsync = async (
  id: string,
): Promise<ApiResponse<IVehicleResponse>> => {
  const response = await api.get(`${VEHICLE_ENDPOINTS.getDocuments}/${id}`);
  return response.data;
};

export const getVehiclesAsync = async (): Promise<
  ApiResponse<IVehicleResponse[]>
> => {
  const response = await api.get(`${VEHICLE_ENDPOINTS.getAll}`);
  return response.data;
};

export const updateVehicleAsync = async (
  data: Promise<ApiResponse<IVehicleCreateRequest>>,
) => {
  const response = await api.put(`${VEHICLE_ENDPOINTS.update}`, data);
  return response.data;
};

export const deleteVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IVehicleResponse>> => {
  const response = await api.delete(`${VEHICLE_ENDPOINTS.delete}/${vehicleId}`);
  return response.data;
};

export const activateVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IVehicleResponse>> => {
  const response = await api.put(`/Vehicle/activate/${vehicleId}`);
  return response.data;
};

export const deactivateVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IVehicleResponse>> => {
  const response = await api.put(`/Vehicle/deactivate/${vehicleId}`);
  return response.data;
};

export const getAssignedVehicleListAsync = async (): Promise<
  ApiResponse<IVehicleResponse[]>
> => {
  const response = await api.get(`${VEHICLE_ENDPOINTS.getAssignedList}`);
  return response.data;
};

export const getUnassignedVehiclesAsync = async (): Promise<
  ApiResponse<IVehicleResponse[]>
> => {
  const response = await api.get(`${VEHICLE_ENDPOINTS.getUnassignedList}`);
  return response.data;
};

export const getAssignedDriversListForSpecficVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IVehicleResponse[]>> => {
  const response = await api.get(
    `${VEHICLE_ENDPOINTS.getDriversForVehicle}/${vehicleId}`,
  );
  return response.data;
};

export const getFilteredVehicleListAsync = async (
  filters: VehicleFilterDto,
): Promise<ApiResponse<IVehicleResponse[]>> => {
  const response = await api.get(`${VEHICLE_ENDPOINTS.filter}`, {
    params: filters,
  });
  return response.data;
};

export const getRegisterationExpiryVehiclesAsync = async (
  days: number,
): Promise<ApiResponse<IVehicleResponse[]>> => {
  const response = await api.get(`${VEHICLE_ENDPOINTS.getRegistrationExpiry}`, {
    params: days,
  });
  return response.data;
};

export const getFittnessExpiryVehiclesAsync = async (
  days: number,
): Promise<ApiResponse<IVehicleResponse[]>> => {
  const response = await api.get(`${VEHICLE_ENDPOINTS.getFitnessExpiry}`, {
    params: days,
  });
  return response.data;
};

export const getInsuranceExpiryVehiclesAsync = async (
  days: number,
): Promise<ApiResponse<IVehicleResponse[]>> => {
  const response = await api.get(`${VEHICLE_ENDPOINTS.getInsuranceExpiry}`, {
    params: days,
  });
  return response.data;
};

export const changeVehicleStatusAsync = async (
  status: VehicleStatus,
  vehicleId: string,
): Promise<ApiResponse<IVehicleResponse>> => {
  const response = await api.put(
    `${VEHICLE_ENDPOINTS.changeState}/${vehicleId}`,
    {
      params: status,
    },
  );
  return response.data;
};

export const getVehicleByStatusAsync = async (
  status: VehicleStatus,
): Promise<ApiResponse<IVehicleResponse>> => {
  const response = await api.get(`${VEHICLE_ENDPOINTS.getByStatus}`, {
    params: status,
  });
  return response.data;
};
