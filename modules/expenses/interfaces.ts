export enum ExpenseCategory {
  Fuel = "Fuel",
  Maintenance = "Maintenance",
  Duty = "Duty",
  Insurance = "Insurance",
  Registration = "Registration",
  Repair = "Repair",
  Lubricants = "Lubricants",
  Other = "Other",
}

export enum PaymentMode {
  Cash = "Cash",
  EasyPassa = "EasyPassa",
  JazzCash = "JazzCash",
  BankTransfer = "BankTransfer",
  CreditCard = "CreditCard",
  MobilePayment = "MobilePayment",
  Cheque = "Cheque",
  Voucher = "Voucher",
  Other = "Other",
}

export enum ExpenseStatus {
  Pending = "Pending",
  Approved = "Approved",
  Paid = "Paid",
  Rejected = "Rejected",
}

export interface IExpenseCreateDto {
  expenseName: string;
  amount: number;
  expenseDate: Date;
  expenseCategory: ExpenseCategory;
  paymentMode: PaymentMode;
  userId: string | null;
  vehicleId?: string | null;
  receiptNumber?: string;
  notes?: string;
}

export interface IExpenseUpdateDto {
  expenseName?: string;
  amount?: number;
  expenseDate?: Date;
  expenseCategory?: ExpenseCategory;
  paymentMode?: PaymentMode;
  expenseStatus?: ExpenseStatus;
  receiptNumber?: string;
  notes?: string;
  approvedBy?: string;
}

export interface IExpenseResponseDto {
  expenseId: string;
  expenseName: string;
  amount: number;
  expenseDate: string;
  expenseCategory: ExpenseCategory;
  paymentMode: PaymentMode;
  expenseStatus: ExpenseStatus;
  userId: string;
  vehicleId?: string;
  receiptNumber?: string;
  notes?: string;
  approvedBy?: string;
  createdAt: string;
}

export interface IExpenseMonthlyReportDto {
  year: number;
  month: number;
  totalAmount: number;
  totalRecords: number;
  byCategory: Record<string, number>;
}

export interface IExpenseCategoryReportDto {
  category: ExpenseCategory;
  totalAmount: number;
  totalRecords: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ── Style helpers ───────────────────────────────────────────
export const getExpenseStatusStyle = (status: ExpenseStatus) => {
  switch (status) {
    case ExpenseStatus.Pending:
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case ExpenseStatus.Approved:
      return "bg-green-100 text-green-700 border-green-200";
    case ExpenseStatus.Paid:
      return "bg-blue-100 text-blue-700 border-blue-200";
    case ExpenseStatus.Rejected:
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export const getExpenseCategoryStyle = (category: ExpenseCategory) => {
  switch (category) {
    case ExpenseCategory.Fuel:
      return "bg-blue-100 text-blue-700";
    case ExpenseCategory.Maintenance:
      return "bg-yellow-100 text-yellow-700";
    case ExpenseCategory.Insurance:
      return "bg-purple-100 text-purple-700";
    case ExpenseCategory.Registration:
      return "bg-indigo-100 text-indigo-700";
    case ExpenseCategory.Repair:
      return "bg-orange-100 text-orange-700";
    case ExpenseCategory.Duty:
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
