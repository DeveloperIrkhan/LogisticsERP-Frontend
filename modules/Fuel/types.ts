export interface IFuelCreateDto {
  vehicleId: string;
  driverId: string;
  addedBy?: string;
  fuelingDate: Date;
  odoMeterReading: number;
  liters: number;
  costPerLiter: number;
  totalCost: number;
  isFullTank: boolean;
  mileage?: number;
  stationName: string;
  stationLocation?: string;
  province?: string;
  receiptNumber?: string;
  fuelType?: string;
  paymentMethod?: string;
  donor?: string;
  notes?: string;
}

export interface IFuelUpdateDto {
  fuelId: string;
  driverId?: string;
  fuelingDate?: Date;
  odoMeterReading?: number;
  liters?: number;
  costPerLiter?: number;
  totalCost?: number;
  isFullTank?: boolean;
  mileage?: number;
  stationName?: string;
  stationLocation?: string;
  province?: string;
  receiptNumber?: string;
  fuelType?: string;
  paymentMethod?: string;
  donor?: string;
  notes?: string;
}

export interface IFuelResponseDto {
  fuelId: string;
  vehicleId: string;
  driverId: string;
  addedBy?: string;
  fuelingDate: string;
  odoMeterReading: number;
  liters: number;
  costPerLiter: number;
  totalCost: number;
  isFullTank: boolean;
  mileage?: number;
  stationName: string;
  stationLocation?: string;
  province?: string;
  receiptNumber?: string;
  fuelType?: string;
  paymentMethod?: string;
  donor?: string;
  notes?: string;
  vehicle?: VehicleSummaryDto;
  driver?: DriverSummaryDto;
  createdAt: string;
}

export interface VehicleSummaryDto {
  vehicleId: string;
  number: string;
  modelName: string;
  vehicleType: string;
}

export interface DriverSummaryDto {
  driverId: string;
  fullName: string;
}

export interface IFuelCostReportDto {
  year: number;
  month?: number;
  totalCost: number;
  totalLiters: number;
  totalRecords: number;
}

export interface IFuelConsumptionReportDto {
  vehicleId: string;
  totalLiters: number;
  totalCost: number;
  averageMileage?: number;
  totalRecords: number;
  lastFuelingDate?: string;
}

// ── Common dropdown options ─────────────────────────────────
export const FUEL_TYPES = ["Petrol", "Diesel", "CNG"] as const;
export const PAYMENT_METHODS = [
  "Cash",
  "Card",
  "BankTransfer",
  "Cheque",
  "Voucher",
] as const;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
