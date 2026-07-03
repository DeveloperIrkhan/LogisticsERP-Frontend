import api from "@/lib/axios";
import {
  ApiResponse,
  IMaintenanceCreateDto,
  IMaintenanceUpdateDto,
  IMaintenanceResponseDto,
  IMaintenanceCostReportDto,
} from "./types";

const MAINTENANCE_ENDPOINTS = {
  AddMaintenance: "/Maintenance/add-maintenance",
  UpdateMaintenance: "/Maintenance/update-maintenance",
  GetMaintenance: "/Maintenance/get-maintenance",
  GetAllMaintenance: "/Maintenance/get-all-maintenance",
  DeleteMaintenance: "/Maintenance/delete-maintenance",
  GetByVehicle: "/Maintenance/get-by-vehicle",
  GetByDateRange: "/Maintenance/get-by-date-range",
  CostByVehicle: "/Maintenance/cost/vehicle",
  MonthlyCost: "/Maintenance/cost/monthly",
  YearlyCost: "/Maintenance/cost/yearly",
  Upcoming: "/Maintenance/upcoming",
} as const;

// ── CREATE ───────────────────────────────────────────────────
export const createMaintenanceAsync = async (
  dto: IMaintenanceCreateDto,
): Promise<ApiResponse<IMaintenanceResponseDto>> => {
  const response = await api.post(MAINTENANCE_ENDPOINTS.AddMaintenance, dto);
  return response.data;
};

// ── UPDATE ───────────────────────────────────────────────────
export const updateMaintenanceAsync = async (
  id: string,
  dto: IMaintenanceUpdateDto,
): Promise<ApiResponse<IMaintenanceResponseDto>> => {
  const response = await api.put(
    `${MAINTENANCE_ENDPOINTS.UpdateMaintenance}/${id}`,
    dto,
  );
  return response.data;
};

// ── GET BY ID ────────────────────────────────────────────────
export const getMaintenanceByIdAsync = async (
  id: string,
): Promise<ApiResponse<IMaintenanceResponseDto>> => {
  const response = await api.get(
    `${MAINTENANCE_ENDPOINTS.GetMaintenance}/${id}`,
  );
  return response.data;
};

// ── GET ALL ──────────────────────────────────────────────────
export const getAllMaintenanceAsync = async (): Promise<
  ApiResponse<IMaintenanceResponseDto[]>
> => {
  const response = await api.get(MAINTENANCE_ENDPOINTS.GetAllMaintenance);
  return response.data;
};

// ── DELETE ───────────────────────────────────────────────────
export const deleteMaintenanceAsync = async (
  id: string,
): Promise<ApiResponse<boolean>> => {
  const response = await api.delete(
    `${MAINTENANCE_ENDPOINTS.DeleteMaintenance}/${id}`,
  );
  return response.data;
};

// ── GET BY VEHICLE ───────────────────────────────────────────
export const getMaintenanceByVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IMaintenanceResponseDto[]>> => {
  const response = await api.get(
    `${MAINTENANCE_ENDPOINTS.GetByVehicle}/${vehicleId}`,
  );
  return response.data;
};

// ── GET BY DATE RANGE ────────────────────────────────────────
export const getMaintenanceByDateRangeAsync = async (
  from: string,
  to: string,
): Promise<ApiResponse<IMaintenanceResponseDto[]>> => {
  const response = await api.get(MAINTENANCE_ENDPOINTS.GetByDateRange, {
    params: { from, to },
  });
  return response.data;
};

// ── COST BY VEHICLE ──────────────────────────────────────────
export const getMaintenanceCostByVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IMaintenanceCostReportDto>> => {
  const response = await api.get(
    `${MAINTENANCE_ENDPOINTS.CostByVehicle}/${vehicleId}`,
  );
  return response.data;
};

// ── MONTHLY COST ─────────────────────────────────────────────
export const getMaintenanceMonthlyCostAsync = async (
  year: number,
  month: number,
): Promise<ApiResponse<IMaintenanceCostReportDto>> => {
  const response = await api.get(MAINTENANCE_ENDPOINTS.MonthlyCost, {
    params: { year, month },
  });
  return response.data;
};

// ── YEARLY COST ──────────────────────────────────────────────
export const getMaintenanceYearlyCostAsync = async (
  year: number,
): Promise<ApiResponse<IMaintenanceCostReportDto>> => {
  const response = await api.get(MAINTENANCE_ENDPOINTS.YearlyCost, {
    params: { year },
  });
  return response.data;
};

// ── UPCOMING ─────────────────────────────────────────────────
export const getUpcomingMaintenanceAsync = async (
  days: number = 30,
): Promise<ApiResponse<IMaintenanceResponseDto[]>> => {
  const response = await api.get(MAINTENANCE_ENDPOINTS.Upcoming, {
    params: { days },
  });
  return response.data;
};