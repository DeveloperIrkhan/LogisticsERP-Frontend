import api from "@/lib/axios";
import {
  ApiResponse,
  IExpenseCreateDto,
  IExpenseUpdateDto,
  IExpenseResponseDto,
  IExpenseMonthlyReportDto,
  IExpenseCategoryReportDto,
  ExpenseStatus,
  ExpenseCategory,
} from "./interfaces";

const EXPENSE_ENDPOINTS = {
  AddExpense: "/Expense/add-expense",
  UpdateExpense: "/Expense/update-expense",
  GetExpense: "/Expense/get-expense",
  GetAllExpenses: "/Expense/get-all-expenses",
  DeleteExpense: "/Expense/delete-expense",
  GetByVehicle: "/Expense/get-by-vehicle",
  GetByUser: "/Expense/get-by-user",
  GetByStatus: "/Expense/get-by-status",
  GetByCategory: "/Expense/get-by-category",
  GetByDateRange: "/Expense/get-by-date-range",
  Approve: "/Expense/approve",
  Reject: "/Expense/reject",
  MonthlyReport: "/Expense/report/monthly",
  CategoryReport: "/Expense/report/category",
  YearlyReport: "/Expense/report/yearly",
} as const;

// ── CREATE ───────────────────────────────────────────────────
export const createExpenseAsync = async (
  dto: IExpenseCreateDto,
): Promise<ApiResponse<IExpenseResponseDto>> => {
  const response = await api.post(EXPENSE_ENDPOINTS.AddExpense, dto);
  return response.data;
};

// ── UPDATE ───────────────────────────────────────────────────
export const updateExpenseAsync = async (
  id: string,
  dto: IExpenseUpdateDto,
): Promise<ApiResponse<IExpenseResponseDto>> => {
  const response = await api.put(
    `${EXPENSE_ENDPOINTS.UpdateExpense}/${id}`,
    dto,
  );
  return response.data;
};

// ── GET BY ID ────────────────────────────────────────────────
export const getExpenseByIdAsync = async (
  id: string,
): Promise<ApiResponse<IExpenseResponseDto>> => {
  const response = await api.get(`${EXPENSE_ENDPOINTS.GetExpense}/${id}`);
  return response.data;
};

// ── GET ALL ──────────────────────────────────────────────────
export const getAllExpensesAsync = async (): Promise<
  ApiResponse<IExpenseResponseDto[]>
> => {
  const response = await api.get(EXPENSE_ENDPOINTS.GetAllExpenses);
  return response.data;
};

// ── DELETE ───────────────────────────────────────────────────
export const deleteExpenseAsync = async (
  id: string,
): Promise<ApiResponse<boolean>> => {
  const response = await api.delete(`${EXPENSE_ENDPOINTS.DeleteExpense}/${id}`);
  return response.data;
};

// ── FILTER by vehicleId ──────────────────────────────────────────────────
export const getExpensesByVehicleAsync = async (
  vehicleId: string,
): Promise<ApiResponse<IExpenseResponseDto[]>> => {
  const response = await api.get(
    `${EXPENSE_ENDPOINTS.GetByVehicle}/${vehicleId}`,
  );
  return response.data;
};
// ── FILTER by userId ──────────────────────────────────────────────────
export const getExpensesByUserAsync = async (
  userId: string,
): Promise<ApiResponse<IExpenseResponseDto[]>> => {
  const response = await api.get(`${EXPENSE_ENDPOINTS.GetByUser}/${userId}`);
  return response.data;
};
// ── FILTER by ExpenseStatus ──────────────────────────────────────────────────
export const getExpensesByStatusAsync = async (
  status: ExpenseStatus,
): Promise<ApiResponse<IExpenseResponseDto[]>> => {
  const response = await api.get(EXPENSE_ENDPOINTS.GetByStatus, {
    params: { status },
  });
  return response.data;
};

// ── FILTER by ExpenseCategory ──────────────────────────────────────────────────
export const getExpensesByCategoryAsync = async (
  category: ExpenseCategory,
): Promise<ApiResponse<IExpenseResponseDto[]>> => {
  const response = await api.get(EXPENSE_ENDPOINTS.GetByCategory, {
    params: { category },
  });
  return response.data;
};

// ── FILTER by Date Range ──────────────────────────────────────────────────
export const getExpensesByDateRangeAsync = async (
  from: string,
  to: string,
): Promise<ApiResponse<IExpenseResponseDto[]>> => {
  const response = await api.get(EXPENSE_ENDPOINTS.GetByDateRange, {
    params: { from, to },
  });
  return response.data;
};

// ── APPROVE / REJECT ─────────────────────────────────────────
export const approveExpenseAsync = async (
  id: string,
  approvedBy: string,
): Promise<ApiResponse<IExpenseResponseDto>> => {
  const response = await api.put(`${EXPENSE_ENDPOINTS.Approve}/${id}`, null, {
    params: { approvedBy },
  });
  return response.data;
};

export const rejectExpenseAsync = async (
  id: string,
  approvedBy: string,
): Promise<ApiResponse<IExpenseResponseDto>> => {
  const response = await api.put(`${EXPENSE_ENDPOINTS.Reject}/${id}`, null, {
    params: { approvedBy },
  });
  return response.data;
};

// ── REPORTS ──────────────────────────────────────────────────
export const getMonthlyExpenseReportAsync = async (
  year: number,
  month: number,
): Promise<ApiResponse<IExpenseMonthlyReportDto>> => {
  const response = await api.get(EXPENSE_ENDPOINTS.MonthlyReport, {
    params: { year, month },
  });
  return response.data;
};

export const getCategoryExpenseReportAsync = async (
  year: number,
  month: number,
): Promise<ApiResponse<IExpenseCategoryReportDto[]>> => {
  const response = await api.get(EXPENSE_ENDPOINTS.CategoryReport, {
    params: { year, month },
  });
  return response.data;
};

export const getYearlyExpenseReportAsync = async (
  year: number,
): Promise<ApiResponse<IExpenseMonthlyReportDto>> => {
  const response = await api.get(EXPENSE_ENDPOINTS.YearlyReport, {
    params: { year },
  });
  return response.data;
};
