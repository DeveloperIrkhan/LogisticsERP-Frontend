import api from "@/lib/axios";
import {
  ApiResponse,
  IItemSaleCreateDto,
  IItemSaleUpdateDto,
  IItemSaleResponseDto,
  IItemSaleMonthlyReportDto,
  ItemTransactionStatus,
} from "./interfaces";

const SALE_ENDPOINTS = {
  AddSale: "/ItemSale/add-sale",
  UpdateSale: "/ItemSale/update-sale",
  GetSale: "/ItemSale/get-sale",
  GetAllSales: "/ItemSale/get-all-sales",
  DeleteSale: "/ItemSale/delete-sale",
  GetByItem: "/ItemSale/get-by-item",
  GetByVehicle: "/ItemSale/get-by-vehicle",
  GetByStatus: "/ItemSale/get-by-status",
  GetByDateRange: "/ItemSale/get-by-date-range",
  Approve: "/ItemSale/approve",
  Reject: "/ItemSale/reject",
  MarkPaid: "/ItemSale/mark-paid",
  MonthlyReport: "/ItemSale/report/monthly",
} as const;

// ── CREATE ───────────────────────────────────────────────────
export const createSaleAsync = async (
  dto: IItemSaleCreateDto,
): Promise<ApiResponse<IItemSaleResponseDto>> => {
  const response = await api.post(SALE_ENDPOINTS.AddSale, dto);
  return response.data;
};

// ── UPDATE ───────────────────────────────────────────────────
export const updateSaleAsync = async (
  id: string,
  dto: IItemSaleUpdateDto,
): Promise<ApiResponse<IItemSaleResponseDto>> => {
  const response = await api.put(`${SALE_ENDPOINTS.UpdateSale}/${id}`, dto);
  return response.data;
};

// ── GET BY ID ────────────────────────────────────────────────
export const getSaleByIdAsync = async (
  id: string,
): Promise<ApiResponse<IItemSaleResponseDto>> => {
  const response = await api.get(`${SALE_ENDPOINTS.GetSale}/${id}`);
  return response.data;
};

// ── GET ALL ──────────────────────────────────────────────────
export const getAllSalesAsync = async (): Promise<
  ApiResponse<IItemSaleResponseDto[]>
> => {
  const response = await api.get(SALE_ENDPOINTS.GetAllSales);
  return response.data;
};

// ── DELETE ───────────────────────────────────────────────────
export const deleteSaleAsync = async (
  id: string,
): Promise<ApiResponse<boolean>> => {
  const response = await api.delete(`${SALE_ENDPOINTS.DeleteSale}/${id}`);
  return response.data;
};

// ── FILTERS ──────────────────────────────────────────────────
export const getSalesByItemAsync = async (
  itemId: string,
): Promise<ApiResponse<IItemSaleResponseDto[]>> => {
  const response = await api.get(`${SALE_ENDPOINTS.GetByItem}/${itemId}`);
  return response.data;
};

export const getSalesByVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IItemSaleResponseDto[]>> => {
  const response = await api.get(`${SALE_ENDPOINTS.GetByVehicle}/${vehicleId}`);
  return response.data;
};

export const getSalesByStatusAsync = async (
  status: ItemTransactionStatus,
): Promise<ApiResponse<IItemSaleResponseDto[]>> => {
  const response = await api.get(SALE_ENDPOINTS.GetByStatus, {
    params: { status },
  });
  return response.data;
};

export const getSalesByDateRangeAsync = async (
  from: string,
  to: string,
): Promise<ApiResponse<IItemSaleResponseDto[]>> => {
  const response = await api.get(SALE_ENDPOINTS.GetByDateRange, {
    params: { from, to },
  });
  return response.data;
};

// ── APPROVE / REJECT / PAID ─────────────────────────────────
export const approveSaleAsync = async (
  id: string,
  approvedBy: string,
): Promise<ApiResponse<IItemSaleResponseDto>> => {
  const response = await api.put(`${SALE_ENDPOINTS.Approve}/${id}`, null, {
    params: { approvedBy },
  });
  return response.data;
};

export const rejectSaleAsync = async (
  id: string,
  approvedBy: string,
): Promise<ApiResponse<IItemSaleResponseDto>> => {
  const response = await api.put(`${SALE_ENDPOINTS.Reject}/${id}`, null, {
    params: { approvedBy },
  });
  return response.data;
};

export const markSalePaidAsync = async (
  id: string,
  approvedBy: string,
): Promise<ApiResponse<IItemSaleResponseDto>> => {
  const response = await api.put(`${SALE_ENDPOINTS.MarkPaid}/${id}`, null, {
    params: { approvedBy },
  });
  return response.data;
};

// ── REPORTS ──────────────────────────────────────────────────
export const getMonthlySaleReportAsync = async (
  year: number,
  month: number,
): Promise<ApiResponse<IItemSaleMonthlyReportDto>> => {
  const response = await api.get(SALE_ENDPOINTS.MonthlyReport, {
    params: { year, month },
  });
  return response.data;
};
