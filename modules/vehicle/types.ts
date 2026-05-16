import { DocumentResponseDto } from "../documents/type";
import { DriverResponseDto } from "../drivers/types";

export interface IVehicleCreateRequest {
  vehicleId?: string;
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
  registrationDate: Date;
  registrationExpiry: Date;
  fitnessExpiry: Date;
  insuredBy: string;
  insuranceExpiry: Date;
  typeOfInsurance: string;
  insuranceFrom: Date;
  insuranceTo: Date;
  status: VehicleStatus;
  drivers?: Array<DriverResponseDto>;
  documents?: Array<DocumentResponseDto>;
}

export enum VehicleStatus {
  Active,
  InActive,
  Maintenance,
  Decommissioned,
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}
