import { IVehicleResponse } from "../vehicle/types";
export interface IDriverCreateDto {
  driverId?: string;
  fullName: string;
  cnic: string;
  mobileNumber: string;
  email: string;
  address: string;
  licenseNumber: string;
  licenseExpiry: Date;
  typeOfLicence: string;
  dateOfJoining: Date;
  salary: string;
  status: DriverStatus;
  description: string;
  Photo?: File;
  License?: File;
  vehicleId?: string;
  vehicle?: IVehicleResponse;
}
export interface IDriverResponseDto {
  fullName: string;
  cnic: string;
  mobileNumber: string;
  email: string;
  address: string;
  licenseNumber: string;
  licenseExpiry: Date;
  typeOfLicence: string;
  dateOfJoining: Date;
  salary: string;
  status: DriverStatus;
  description: string;
  photoUrl: string;
  licenseUrl: string;
  driverId?: string;
}

export enum DriverStatus {
  ACTIVE = 0,
  INACTIVE = 1,
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}
