import { IVehicleResponse } from "../vehicle/types";

export interface IDriverCreateDto {
  fullName: string;
  cnic: string;
  mobileNumber: string;
  email: string;
  address: string;
  licenseNumber: string;
  Photo?: File;
  License?: File;
  licenseExpiry: Date;
  typeOfLicence: string;
  dateOfJoining: Date;
  salary: string;
  status: DriverStatus;
  description: string;
  vehicleId?: string;
}

export interface IDriverResponseDto {
  driverId: string;
  fullName: string;
  cnic: string;
  mobileNumber: string;
  email: string;
  address: string;
  licenseNumber: string;
  licenseExpiry: string;
  typeOfLicence: string;
  dateOfJoining: string;
  salary: string;
  status: DriverStatus;
  description: string;
  photoUrl?: string;
  licenseUrl?: string;
  vehicleId?: string;
}

export interface IDriverUpdateDto {
  driverId: string;
  fullName?: string;
  cnic?: string;
  mobileNumber?: string;
  email?: string;
  address?: string;
  licenseNumber?: string;
  licenseExpiry?: Date;
  typeOfLicence?: string;
  dateOfJoining?: Date;
  salary?: string;
  status?: DriverStatus;
  description?: string;
  Photo?: File;
  License?: File;
  vehicleId?: string;
}

export interface IDriverDutyStatsDto {
  driverId: string;
  driverName: string;
  totalDuties: number;
  completedDuties: number;
  missedDuties: number;
  cancelledDuties: number;
  currentlyOnDuty: number;
  totalKmDriven: number;
  totalHours: number;
  lastDutyDate?: string;
  isAvailable: boolean;
}

export enum DriverStatus {
  Active,
  Inactive,
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
