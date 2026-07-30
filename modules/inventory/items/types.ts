import { PaymentMode } from "../../expenses/interfaces";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export enum ItemCategory {
  SpareParts = "SpareParts",
  LubricantOil = "LubricantOil",
  Tyres = "Tyres",
  Battery = "Battery",
  Tools = "Tools",
  Consumables = "Consumables",
  Filters = "Filters",
  Electricals = "Electricals",
  Other = "Other",
}
export enum ItemUnit {
  Piece = "Piece",
  Litre = "Litre",
  Kg = "Kg",
  Box = "Box",
  Set = "Set",
  Meter = "Meter",
  Gallon = "Gallon",
}
export enum ItemTransactionStatus {
  Pending = "Pending",
  Approved = "Approved",
  Paid = "Paid",
  Rejected = "Rejected",
}
export type ItemCreateDto = {
  itemName: string;
  itemCategory: ItemCategory;
  itemUnit: ItemUnit;
  reorderLevel?: number | null;
  description: string;
  openingStock: number;
};
export type ItemUpdateDto = {
  itemName: string;
  itemCategory: ItemCategory | undefined;
  itemUnit: ItemUnit | undefined;
  currentStock: number | undefined;
  reorderLevel: number | undefined;
  description: string;
  isActive?: boolean | null;
};

export type ItemResponseDto = {
  itemId: string;
  itemName: string;
  itemCategory: ItemCategory;
  itemUnit: ItemUnit;
  currentStock: number;
  reorderLevel?: number | null;
  description: string;
  isActive: boolean;
  createdAt: Date;
};
export type ItemStockReportDto = {
  itemId: string;
  itemName: string;
  itemCategory: ItemCategory;
  itemUnit: ItemUnit;
  currentStock: number;
  reorderLevel?: number | null;
  isLowStock: boolean;
  totalPurchasedQty: number;
  totalSoldQty: number;
};

export type ItemPurchaseMonthlyReportDto = {
  year: number;
  month: number;
  totalAmount: number;
  totalRecords: number;
};

export type ItemSaleMonthlyReportDto = {
  year: number;
  month: number;
  totalAmount: number;
  totalRecords: number;
};

export type ItemSaleCreateDto = {
  itemId: string;
  quantity: number;
  unitPrice: number;
  saleDate: Date;
  buyerName: string;
  invoiceNumber: string;
  paymentMode: PaymentMode;
  vehicleId: string;
  addedBy: string;
  notes: string;
};

export type ItemSaleUpdateDto = {
  quantity?: number | null;
  unitPrice?: number | null;
  saleDate?: string | null;
  buyerName: string;
  invoiceNumber: string;
  paymentMode?: PaymentMode | null;
  status?: ItemTransactionStatus | null;
  vehicleId: string;
  notes: string;
  approvedBy: string;
};

export type ItemSaleResponseDto = {
  itemSaleId: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  saleDate: string;
  buyerName: string;
  invoiceNumber: string;
  paymentMode: PaymentMode;
  status: ItemTransactionStatus;
  vehicleId: string;
  addedBy: string;
  approvedBy: string;
  notes: string;
  createdAt: Date;
};

export type ItemPurchaseCreateDto = {
  itemId: string;
  quantity: number;
  unitPrice: number;
  purchaseDate: string;
  supplierName: string;
  invoiceNumber: string;
  paymentMode: PaymentMode;
  vehicleId: string;
  addedBy: string;
  notes: string;
};

export type ItemPurchaseUpdateDto = {
  quantity?: number | null;
  unitPrice?: number | null;
  purchaseDate?: string | null;
  supplierName: string;
  invoiceNumber: string;
  paymentMode?: PaymentMode | null;
  status?: ItemTransactionStatus | null;
  vehicleId: string;
  notes: string;
  approvedBy: string;
};

export type ItemPurchaseResponseDto = {
  itemPurchaseId: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  purchaseDate: string;
  supplierName: string;
  invoiceNumber: string;
  paymentMode: PaymentMode;
  status: ItemTransactionStatus;
  vehicleId: string;
  addedBy: string;
  approvedBy: string;
  notes: string;
  createdAt: Date;
};
