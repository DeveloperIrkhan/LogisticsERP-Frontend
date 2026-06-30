import api from "@/lib/axios";
import {
  ApiResponse,
  IFuelCreateDto,
  IFuelUpdateDto,
  IFuelResponseDto,
  IFuelCostReportDto,
  IFuelConsumptionReportDto,
} from "./types";

const FUEL_ENDPOINTS = {
  AddFuel: "/Fuel/add-fuel",
  UpdateFuel: "/Fuel/update-fuel",
  GetFuel: "/Fuel/get-fuel",
  GetAllFuel: "/Fuel/get-all-fuel",
  DeleteFuel: "/Fuel/delete-fuel",
  GetByVehicle: "/Fuel/get-by-vehicle",
  GetByDriver: "/Fuel/get-by-driver",
  GetByDateRange: "/Fuel/get-by-date-range",
  ConsumptionByVehicle: "/Fuel/consumption/vehicle",
  MonthlyCost: "/Fuel/cost/monthly",
  YearlyCost: "/Fuel/cost/yearly",
} as const;

// ── CREATE ───────────────────────────────────────────────────
export const createFuelAsync = async (
  dto: IFuelCreateDto,
): Promise<ApiResponse<IFuelResponseDto>> => {
  const response = await api.post(FUEL_ENDPOINTS.AddFuel, dto);
  return response.data;
};

// ── UPDATE ───────────────────────────────────────────────────
export const updateFuelAsync = async (
  fuelId: string,
  dto: IFuelUpdateDto,
): Promise<ApiResponse<IFuelResponseDto>> => {
  const response = await api.put(`${FUEL_ENDPOINTS.UpdateFuel}/${fuelId}`, dto);
  return response.data;
};

// ── GET BY ID ────────────────────────────────────────────────
export const getFuelByIdAsync = async (
  fuelId: string,
): Promise<ApiResponse<IFuelResponseDto>> => {
  const response = await api.get(`${FUEL_ENDPOINTS.GetFuel}/${fuelId}`);
  return response.data;
};

// ── GET ALL ──────────────────────────────────────────────────
export const getAllFuelAsync = async (): Promise<
  ApiResponse<IFuelResponseDto[]>
> => {
  const response = await api.get(FUEL_ENDPOINTS.GetAllFuel);
  return response.data;
};

// ── DELETE ───────────────────────────────────────────────────
export const deleteFuelAsync = async (
  fuelId: string,
): Promise<ApiResponse<boolean>> => {
  const response = await api.delete(`${FUEL_ENDPOINTS.DeleteFuel}/${fuelId}`);
  return response.data;
};

// ── GET BY VEHICLE ───────────────────────────────────────────
export const getFuelByVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IFuelResponseDto[]>> => {
  const response = await api.get(`${FUEL_ENDPOINTS.GetByVehicle}/${vehicleId}`);
  return response.data;
};

// ── GET BY DRIVER ────────────────────────────────────────────
export const getFuelByDriverAsync = async (
  driverId: string,
): Promise<ApiResponse<IFuelResponseDto[]>> => {
  const response = await api.get(`${FUEL_ENDPOINTS.GetByDriver}/${driverId}`);
  return response.data;
};

// ── GET BY DATE RANGE ────────────────────────────────────────
export const getFuelByDateRangeAsync = async (
  from: string,
  to: string,
): Promise<ApiResponse<IFuelResponseDto[]>> => {
  const response = await api.get(FUEL_ENDPOINTS.GetByDateRange, {
    params: { from, to },
  });
  return response.data;
};

// ── CONSUMPTION REPORT BY VEHICLE ────────────────────────────
export const getFuelConsumptionByVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IFuelConsumptionReportDto>> => {
  const response = await api.get(
    `${FUEL_ENDPOINTS.ConsumptionByVehicle}/${vehicleId}`,
  );
  return response.data;
};

// ── MONTHLY COST REPORT ──────────────────────────────────────
export const getFuelMonthlyCostAsync = async (
  year: number,
  month: number,
): Promise<ApiResponse<IFuelCostReportDto>> => {
  const response = await api.get(FUEL_ENDPOINTS.MonthlyCost, {
    params: { year, month },
  });
  return response.data;
};

// ── YEARLY COST REPORT ───────────────────────────────────────
export const getFuelYearlyCostAsync = async (
  year: number,
): Promise<ApiResponse<IFuelCostReportDto>> => {
  const response = await api.get(FUEL_ENDPOINTS.YearlyCost, {
    params: { year },
  });
  return response.data;
};
