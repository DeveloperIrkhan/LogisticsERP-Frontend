import { PaymentMode } from "@/modules/expenses/interfaces";

export { PaymentMode };

export enum ItemTransactionStatus {
  Pending = "Pending",
  Approved = "Approved",
  Paid = "Paid",
  Rejected = "Rejected",
}

export interface IItemPurchaseCreateDto {
  itemId: string;
  quantity: number;
  unitPrice: number;
  purchaseDate: Date;
  supplierName?: string;
  invoiceNumber?: string;
  paymentMode: PaymentMode;
  vehicleId?: string | null;
  addedBy?: string | null;
  notes?: string;
}

export interface IItemPurchaseUpdateDto {
  quantity?: number;
  unitPrice?: number;
  purchaseDate?: Date;
  supplierName?: string;
  invoiceNumber?: string;
  paymentMode?: PaymentMode;
  status?: ItemTransactionStatus;
  vehicleId?: string | null;
  notes?: string;
  approvedBy?: string;
}

export interface IItemPurchaseResponseDto {
  itemPurchaseId: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  purchaseDate: string;
  supplierName?: string;
  invoiceNumber?: string;
  paymentMode: PaymentMode;
  status: ItemTransactionStatus;
  vehicleId?: string;
  addedBy?: string;
  approvedBy?: string;
  notes?: string;
  createdAt: string;
}

export interface IItemPurchaseMonthlyReportDto {
  year: number;
  month: number;
  totalAmount: number;
  totalRecords: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ── Style helpers ───────────────────────────────────────────
export const getPurchaseStatusStyle = (status: ItemTransactionStatus) => {
  switch (status) {
    case ItemTransactionStatus.Pending:
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case ItemTransactionStatus.Approved:
      return "bg-green-100 text-green-700 border-green-200";
    case ItemTransactionStatus.Paid:
      return "bg-blue-100 text-blue-700 border-blue-200";
    case ItemTransactionStatus.Rejected:
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};
