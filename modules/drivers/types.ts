export interface DriverResponseDto {
  DriverId: string;
  FullName: string;
  CNIC: string;
  MobileNumber: string;
  Email: string;
  Address: string;
  LicenseNumber: string;
  LicenseExpiry: Date;
  TypeOfLicence: string;
  DateOfJoining: Date;
  Salary: string;
  Status: DriverStatus;
  Description: string;
  CreatedAt: Date;
  PhotoUrl: string;
  VehicleId?: string;
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
