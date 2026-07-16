import api from "@/lib/axios";
import {
  ApiResponse,
  IDashboardSummary,
  IExpiryAlertsResponseDto,
} from "./types";

const DASHBOARD_ENDPOINTS = {
  getDashboardSummary: "/Dashboard/summary",
  expiryAlerts: "/Dashboard/expiry-alerts",
} as const;

export const getDashBoardSummeryAsync = async (): Promise<
  ApiResponse<IDashboardSummary>
> => {
  const response = await api.get(`${DASHBOARD_ENDPOINTS.getDashboardSummary}`);
  return response.data;
};

export const getExpiryAlerts = async (): Promise<
  ApiResponse<IExpiryAlertsResponseDto>
> => {
  const response = await api.get(`${DASHBOARD_ENDPOINTS.expiryAlerts}`);
  return response.data;
};
