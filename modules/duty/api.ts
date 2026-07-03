import api from "@/lib/axios";
import {
  ApiResponse,
  IDutyCreateDto,
  IDutyUpdateDto,
  IDutyResponseDto,
  IEndDutyDto,
  DutyStatus,
} from "./dutyTypes";

const DUTY_ENDPOINTS = {
  AddDuty: "/Duty/add-duty",
  UpdateDuty: "/Duty/update-duty",
  GetDuty: "/Duty/get-duty",
  GetAllDuties: "/Duty/get-all-duties",
  DeleteDuty: "/Duty/delete-duty",
  GetByVehicle: "/Duty/get-by-vehicle",
  GetByDriver: "/Duty/get-by-driver",
  GetByStatus: "/Duty/get-by-status",
  GetByDateRange: "/Duty/get-by-date-range",
  GetActiveDuties: "/Duty/get-active-duties",
  StartDuty: "/Duty/start-duty",
  EndDuty: "/Duty/end-duty",
  ApproveDuty: "/Duty/approve-duty",
  CancelDuty: "/Duty/cancel-duty",
} as const;

// ── CRUD ─────────────────────────────────────────────────────
export const createDutyAsync = async (
  dto: IDutyCreateDto,
): Promise<ApiResponse<IDutyResponseDto>> => {
  const response = await api.post(DUTY_ENDPOINTS.AddDuty, dto);
  return response.data;
};

export const updateDutyAsync = async (
  id: string,
  dto: IDutyUpdateDto,
): Promise<ApiResponse<IDutyResponseDto>> => {
  const response = await api.put(`${DUTY_ENDPOINTS.UpdateDuty}/${id}`, dto);
  return response.data;
};

export const getDutyByIdAsync = async (
  id: string,
): Promise<ApiResponse<IDutyResponseDto>> => {
  const response = await api.get(`${DUTY_ENDPOINTS.GetDuty}/${id}`);
  return response.data;
};

export const getAllDutiesAsync = async (): Promise<
  ApiResponse<IDutyResponseDto[]>
> => {
  const response = await api.get(DUTY_ENDPOINTS.GetAllDuties);
  return response.data;
};

export const deleteDutyAsync = async (
  id: string,
): Promise<ApiResponse<boolean>> => {
  const response = await api.delete(`${DUTY_ENDPOINTS.DeleteDuty}/${id}`);
  return response.data;
};

// ── FILTERING ────────────────────────────────────────────────
export const getDutiesByVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IDutyResponseDto[]>> => {
  const response = await api.get(`${DUTY_ENDPOINTS.GetByVehicle}/${vehicleId}`);
  return response.data;
};

export const getDutiesByDriverAsync = async (
  driverId: string,
): Promise<ApiResponse<IDutyResponseDto[]>> => {
  const response = await api.get(`${DUTY_ENDPOINTS.GetByDriver}/${driverId}`);
  return response.data;
};

export const getDutiesByStatusAsync = async (
  status: DutyStatus,
): Promise<ApiResponse<IDutyResponseDto[]>> => {
  const response = await api.get(DUTY_ENDPOINTS.GetByStatus, {
    params: { status },
  });
  return response.data;
};

export const getDutiesByDateRangeAsync = async (
  from: string,
  to: string,
): Promise<ApiResponse<IDutyResponseDto[]>> => {
  const response = await api.get(DUTY_ENDPOINTS.GetByDateRange, {
    params: { from, to },
  });
  return response.data;
};

export const getActiveDutiesAsync = async (): Promise<
  ApiResponse<IDutyResponseDto[]>
> => {
  const response = await api.get(DUTY_ENDPOINTS.GetActiveDuties);
  return response.data;
};

// ── DUTY TRACKING ────────────────────────────────────────────
export const startDutyAsync = async (
  id: string,
): Promise<ApiResponse<IDutyResponseDto>> => {
  const response = await api.put(`${DUTY_ENDPOINTS.StartDuty}/${id}`);
  return response.data;
};

export const endDutyAsync = async (
  id: string,
  dto: IEndDutyDto,
): Promise<ApiResponse<IDutyResponseDto>> => {
  const response = await api.put(`${DUTY_ENDPOINTS.EndDuty}/${id}`, dto);
  return response.data;
};

export const approveDutyAsync = async (
  id: string,
  approvedBy: string,
): Promise<ApiResponse<IDutyResponseDto>> => {
  const response = await api.put(`${DUTY_ENDPOINTS.ApproveDuty}/${id}`, null, {
    params: { approvedBy },
  });
  return response.data;
};

export const cancelDutyAsync = async (
  id: string,
  reason: string,
): Promise<ApiResponse<IDutyResponseDto>> => {
  const response = await api.put(`${DUTY_ENDPOINTS.CancelDuty}/${id}`, null, {
    params: { reason },
  });
  return response.data;
};
