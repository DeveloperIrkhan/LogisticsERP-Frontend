import { ApiResponse, DriverStatus, IDriverResponseDto } from "./types";
import api from "@/lib/axios";

const DRIVER_ENDPOINTS = {
  GetDrivers: "/Driver/get-all-drivers",
  AddNewDriver: "/Driver/add-driver",
  DeleteDriver: "/Driver/delete-driver",
  UpdateDriver: "/Driver/update-driver",
  GetVehicleById: "/Driver/get-driver-by-id",
  AssignDriverToVehicle: "/Driver/assign-driver-to-vehicle",
  UnassignDriver: "/Driver/unassign-driver",
  DriverListForSpecficVehicle: "/Driver/drivers-list-for-specfic-vehicle",
  GetAvailableDrivers: "/Driver/available-drivers",
  GetDriversByStatus: "/Driver/drivers-by-status",
  IsDriverAvailable: "/Driver/is-available",
  ChangeStatus: "/Driver/change-status",
  GetDutyStats: "/Driver/duty-stats",
  GetExpiringLicenses: "/Driver/expiring-licenses",
} as const;

export const getDriversAsync = async (): Promise<
  ApiResponse<IDriverResponseDto[]>
> => {
  const response = await api.get(`${DRIVER_ENDPOINTS.GetDrivers}`);
  return response.data;
};

export const createDriverAsync = async (
  formDate: FormData,
): Promise<ApiResponse<IDriverResponseDto>> => {
  const res = await api.post("/Driver/add-driver", formDate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteDriverAsync = async (
  driverId: string,
): Promise<ApiResponse<IDriverResponseDto>> => {
  const response = await api.delete(
    `${DRIVER_ENDPOINTS.DeleteDriver}/${driverId}`,
  );
  return response.data;
};

export const getDriverByIdAsync = async (
  driverId: string,
): Promise<ApiResponse<IDriverResponseDto>> => {
  const response = await api.get(`/Driver/get-driver-by-id/${driverId}`);
  return response.data;
};

export const assignDriverToVehicleAsync = async (
  driverId: string,
  vehicleId: string,
): Promise<ApiResponse<IDriverResponseDto>> => {
  const response = await api.post(
    `${DRIVER_ENDPOINTS.AssignDriverToVehicle}`,
    null, // no request body
    { params: { driverId, vehicleId } },
  );
  return response.data;
};

export const unassignDriverAsync = async (
  driverId: string,
): Promise<ApiResponse<IDriverResponseDto>> => {
  return await api
    .post(`${DRIVER_ENDPOINTS.UnassignDriver}/${driverId}`)
    .then((resp) => resp.data);
};

export const driverListForSpecficVehicleAsync = async (
  driverId: string,
): Promise<ApiResponse<IDriverResponseDto>> => {
  const response = await api.get(
    `${DRIVER_ENDPOINTS.DriverListForSpecficVehicle}/${driverId}`,
  );
  return response.data;
};

export const getAvailableDriversAsync = async (): Promise<
  ApiResponse<IDriverResponseDto[]>
> => {
  const response = await api.get(`${DRIVER_ENDPOINTS.GetAvailableDrivers}`);
  return response.data;
};

export const getDriversByStatusAsync = async (
  status: DriverStatus,
): Promise<ApiResponse<IDriverResponseDto>> => {
  const response = await api.get(`${DRIVER_ENDPOINTS.GetDriversByStatus}`, {
    params: status,
  });
  return response.data;
};

export const isDriverAvailableAsync = async (
  driverId: string,
): Promise<ApiResponse<IDriverResponseDto>> => {
  const response = await api.get(
    `${DRIVER_ENDPOINTS.IsDriverAvailable}/${driverId}`,
  );
  return response.data;
};

export const changeStatusAsync = async (
  driverId: string,
  status: DriverStatus,
): Promise<ApiResponse<IDriverResponseDto>> => {
  const response = await api.put(
    `${DRIVER_ENDPOINTS.ChangeStatus}/${driverId}`,
    {
      params: status,
    },
  );
  return response.data;
};

export const getDutyStatsAsync = async (
  driverId: string,
): Promise<ApiResponse<IDriverResponseDto>> => {
  const response = await api.put(
    `${DRIVER_ENDPOINTS.GetDutyStats}/${driverId}`,
  );
  return response.data;
};

export const getExpiringLicensesAsync = async (
  days: number,
): Promise<ApiResponse<IDriverResponseDto>> => {
  const response = await api.put(`${DRIVER_ENDPOINTS.GetExpiringLicenses}/`, {
    params: days,
  });
  return response.data;
};
