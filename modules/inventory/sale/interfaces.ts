import { getPurchaseStatusStyle } from "../purchase/interfaces";
import { ItemTransactionStatus } from "./../items/types";
import { PaymentMode } from "@/modules/expenses/interfaces";

export { PaymentMode, ItemTransactionStatus };
export const getSaleStatusStyle = getPurchaseStatusStyle;

export interface IItemSaleCreateDto {
  itemId: string;
  quantity: number;
  unitPrice: number;
  saleDate: Date;
  buyerName?: string;
  invoiceNumber?: string;
  paymentMode: PaymentMode;
  vehicleId?: string | null;
  addedBy?: string | null;
  notes?: string;
}

export interface IItemSaleUpdateDto {
  quantity?: number;
  unitPrice?: number;
  saleDate?: Date;
  buyerName?: string;
  invoiceNumber?: string;
  paymentMode?: PaymentMode;
  status?: ItemTransactionStatus;
  vehicleId?: string | null;
  notes?: string;
  approvedBy?: string;
}

export interface IItemSaleResponseDto {
  itemSaleId: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  saleDate: Date;
  buyerName?: string;
  invoiceNumber?: string;
  paymentMode: PaymentMode;
  status: ItemTransactionStatus;
  vehicleId?: string;
  addedBy?: string;
  approvedBy?: string;
  notes?: string;
  createdAt: Date;
}

export interface IItemSaleMonthlyReportDto {
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
