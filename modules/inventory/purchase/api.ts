import api from "@/lib/axios";
import {
  ApiResponse,
  IItemPurchaseCreateDto,
  IItemPurchaseUpdateDto,
  IItemPurchaseResponseDto,
  IItemPurchaseMonthlyReportDto,
  ItemTransactionStatus,
} from "./interfaces";

const PURCHASE_ENDPOINTS = {
  AddPurchase: "/ItemPurchase/add-purchase",
  UpdatePurchase: "/ItemPurchase/update-purchase",
  GetPurchase: "/ItemPurchase/get-purchase",
  GetAllPurchases: "/ItemPurchase/get-all-purchases",
  DeletePurchase: "/ItemPurchase/delete-purchase",
  GetByItem: "/ItemPurchase/get-by-item",
  GetByVehicle: "/ItemPurchase/get-by-vehicle",
  GetByStatus: "/ItemPurchase/get-by-status",
  GetByDateRange: "/ItemPurchase/get-by-date-range",
  Approve: "/ItemPurchase/approve",
  Reject: "/ItemPurchase/reject",
  MarkPaid: "/ItemPurchase/mark-paid",
  MonthlyReport: "/ItemPurchase/report/monthly",
} as const;

// ── CREATE ───────────────────────────────────────────────────
export const createPurchaseAsync = async (
  dto: IItemPurchaseCreateDto,
): Promise<ApiResponse<IItemPurchaseResponseDto>> => {
  const response = await api.post(PURCHASE_ENDPOINTS.AddPurchase, dto);
  return response.data;
};

// ── UPDATE ───────────────────────────────────────────────────
export const updatePurchaseAsync = async (
  id: string,
  dto: IItemPurchaseUpdateDto,
): Promise<ApiResponse<IItemPurchaseResponseDto>> => {
  const response = await api.put(
    `${PURCHASE_ENDPOINTS.UpdatePurchase}/${id}`,
    dto,
  );
  return response.data;
};

// ── GET BY ID ────────────────────────────────────────────────
export const getPurchaseByIdAsync = async (
  id: string,
): Promise<ApiResponse<IItemPurchaseResponseDto>> => {
  const response = await api.get(`${PURCHASE_ENDPOINTS.GetPurchase}/${id}`);
  return response.data;
};

// ── GET ALL ──────────────────────────────────────────────────
export const getAllPurchasesAsync = async (): Promise<
  ApiResponse<IItemPurchaseResponseDto[]>
> => {
  const response = await api.get(PURCHASE_ENDPOINTS.GetAllPurchases);
  return response.data;
};

// ── DELETE ───────────────────────────────────────────────────
export const deletePurchaseAsync = async (
  id: string,
): Promise<ApiResponse<boolean>> => {
  const response = await api.delete(`${PURCHASE_ENDPOINTS.DeletePurchase}/${id}`);
  return response.data;
};

// ── FILTERS ──────────────────────────────────────────────────
export const getPurchasesByItemAsync = async (
  itemId: string,
): Promise<ApiResponse<IItemPurchaseResponseDto[]>> => {
  const response = await api.get(`${PURCHASE_ENDPOINTS.GetByItem}/${itemId}`);
  return response.data;
};

export const getPurchasesByVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IItemPurchaseResponseDto[]>> => {
  const response = await api.get(
    `${PURCHASE_ENDPOINTS.GetByVehicle}/${vehicleId}`,
  );
  return response.data;
};

export const getPurchasesByStatusAsync = async (
  status: ItemTransactionStatus,
): Promise<ApiResponse<IItemPurchaseResponseDto[]>> => {
  const response = await api.get(PURCHASE_ENDPOINTS.GetByStatus, {
    params: { status },
  });
  return response.data;
};

export const getPurchasesByDateRangeAsync = async (
  from: string,
  to: string,
): Promise<ApiResponse<IItemPurchaseResponseDto[]>> => {
  const response = await api.get(PURCHASE_ENDPOINTS.GetByDateRange, {
    params: { from, to },
  });
  return response.data;
};

// ── APPROVE / REJECT / PAID ─────────────────────────────────
export const approvePurchaseAsync = async (
  id: string,
  approvedBy: string,
): Promise<ApiResponse<IItemPurchaseResponseDto>> => {
  const response = await api.put(`${PURCHASE_ENDPOINTS.Approve}/${id}`, null, {
    params: { approvedBy },
  });
  return response.data;
};

export const rejectPurchaseAsync = async (
  id: string,
  approvedBy: string,
): Promise<ApiResponse<IItemPurchaseResponseDto>> => {
  const response = await api.put(`${PURCHASE_ENDPOINTS.Reject}/${id}`, null, {
    params: { approvedBy },
  });
  return response.data;
};

export const markPurchasePaidAsync = async (
  id: string,
  approvedBy: string,
): Promise<ApiResponse<IItemPurchaseResponseDto>> => {
  const response = await api.put(`${PURCHASE_ENDPOINTS.MarkPaid}/${id}`, null, {
    params: { approvedBy },
  });
  return response.data;
};

// ── REPORTS ──────────────────────────────────────────────────
export const getMonthlyPurchaseReportAsync = async (
  year: number,
  month: number,
): Promise<ApiResponse<IItemPurchaseMonthlyReportDto>> => {
  const response = await api.get(PURCHASE_ENDPOINTS.MonthlyReport, {
    params: { year, month },
  });
  return response.data;
};
