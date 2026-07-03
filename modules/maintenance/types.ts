export interface IMaintenanceCreateDto {
  vehicleId: string;
  driverId?: string;
  addedBy?: string;
  maintenanceDate: Date;
  currentKm: number;
  cost: number;
  description: string;
  maintenanceType?: string;
  workshopName?: string;
  changedParts?: string;
  invoiceNumber?: string;
  nextMaintenanceKm?: number;
  nextMaintenanceDate?: Date;
}

export interface IMaintenanceUpdateDto {
  maintenanceRecordId: string;
  driverId?: string;
  maintenanceDate?: Date;
  currentKm?: number;
  cost?: number;
  description?: string;
  maintenanceType?: string;
  workshopName?: string;
  changedParts?: string;
  invoiceNumber?: string;
  nextMaintenanceKm?: number;
  nextMaintenanceDate?: Date;
}

export interface IMaintenanceResponseDto {
  maintenanceRecordId: string;
  vehicleId: string;
  driverId?: string;
  addedBy?: string;
  maintenanceDate: string;
  currentKm: number;
  cost: number;
  description: string;
  maintenanceType?: string;
  workshopName?: string;
  changedParts?: string;
  invoiceNumber?: string;
  nextMaintenanceKm?: number;
  nextMaintenanceDate?: string;
  createdAt: string;
}

export interface IMaintenanceCostReportDto {
  year: number;
  month?: number;
  totalCost: number;
  totalRecords: number;
}

export const MAINTENANCE_TYPES = [
  "Engine Oil",
  "Oil Filter",
  "Air Filter",
  "Tyre Change",
  "Brake Service",
  "Battery Replacement",
  "AC Service",
  "Engine Repair",
  "Transmission Service",
  "Suspension",
  "Electrical",
  "Body Work",
  "General Service",
  "Other",
] as const;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}