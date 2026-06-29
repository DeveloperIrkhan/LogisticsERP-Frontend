import { DocumentResponseDto } from "../documents/type";
import { IDriverResponseDto } from "../drivers/types";

export interface IVehicleCreateRequest {
  number: string;
  modelName: string;
  company: string;
  engineNumber: string;
  chassisNumber: string;
  vehicleType: string;
  doner: string;
  purchsedCast: number;
  depreciation: number;
  registrationDate: Date;
  registrationExpiry: Date;
  fitnessExpiry: Date;
  insuredBy: string;
  insuranceFrom: Date;
  insuranceExpiry: Date;
  insuranceTo: Date;
  typeOfInsurance: string;
  status: VehicleStatus;
}
export interface VehicleUpdateDto {
  vehicleId: string;
  number?: string;
  modelName?: string;
  company?: string;
  engineNumber?: string;
  chassisNumber?: string;
  vehicleType?: string;
  doner?: string;
  purchsedCast?: number;
  depreciation?: number;
  registrationDate?: Date;
  registrationExpiry?: Date;
  fitnessExpiry?: Date;
  insuredBy?: string;
  insuranceFrom?: Date;
  insuranceExpiry?: Date;
  insuranceTo?: Date;
  typeOfInsurance?: string;
  status?: VehicleStatus;
}
export interface IVehicleResponse {
  vehicleId: string;
  number: string;
  modelName: string;
  company: string;
  engineNumber: string;
  chassisNumber: string;
  vehicleType: string;
  doner: string;
  purchsedCast: number;
  depreciation: number;
  registrationDate: string;
  registrationExpiry: string;
  fitnessExpiry: string;
  insuredBy: string;
  insuranceExpiry: string;
  typeOfInsurance: string;
  insuranceFrom: string;
  insuranceTo: string;
  status: VehicleStatus;
  drivers?: Array<IDriverResponseDto>;
  documents?: Array<DocumentResponseDto>;
}

export enum VehicleStatus {
  Active = "Active",
  InActive = "InActive",
  Maintenance = "Maintenance",
  Decommissioned = "Decommissioned",
}

export interface VehicleFilterDto {
  number?: string;
  company?: string;
  doner?: string;
  insuredBy?: string;
  driverId?: string;
  status?: VehicleStatus;
  vehicleType: string;
  fromDate?: Date;
  toDate?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const vehicleTypes = [
  "Car",
  "Jeep",
  "Truck",
  "Ambulance",
  "Pickup",
  "Van",
  "Bus",
  "Motorcycle",
];
