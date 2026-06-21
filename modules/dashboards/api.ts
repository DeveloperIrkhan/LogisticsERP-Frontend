import api from "@/lib/axios";
import { ApiResponse, IDashboardSummary } from "./types";

const DASHBOARD_ENDPOINTS = {
  getDashboardSummary: "/Dashboard/summary",
} as const;

export const getDashBoardSummeryAsync = async (): Promise<
  ApiResponse<IDashboardSummary>
> => {
  const response = await api.get(`${DASHBOARD_ENDPOINTS.getDashboardSummary}`);
  return response.data;
};
