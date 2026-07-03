export enum DutyStatus {
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Approved = "Approved",
}

export enum DutyType {
  Emergency = "Emergency",
  Routine = "Routine",
  SpecialTask = "SpecialTask",
}

export interface IDutyCreateDto {
  vehicleId: string;
  driverId: string;
  fromLocation: string;
  toLocation: string;
  purpose: string;
  officerName: string;
  dateOut: Date;
  dutyType: DutyType;
  killometerOut?: number;
  donor?: string;
  remarks?: string;
}

export interface IDutyUpdateDto {
  fromLocation?: string;
  toLocation?: string;
  purpose?: string;
  officerName?: string;
  donor?: string;
  remarks?: string;
  dutyType?: DutyType;
  status?: DutyStatus;
  dateIn?: Date;
  killometerOut?: number;
  killometerIn?: number;
  totalKm?: number;
  totalHours?: number;
}

export interface IEndDutyDto {
  dateIn: Date;
  killometerIn: number;
  remarks?: string;
}

export interface IDutyResponseDto {
  dutyId: string;
  vehicleId: string;
  driverId: string;
  fromLocation: string;
  toLocation: string;
  purpose: string;
  officerName: string;
  donor: string;
  dutyType: DutyType;
  status: DutyStatus;
  dateOut: string;
  dateIn?: string;
  killometerOut?: number;
  killometerIn?: number;
  totalKm?: number;
  totalHours?: number;
  remarks?: string;
  approvedBy?: string;
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ── Status style helpers ────────────────────────────────────
export const getDutyStatusStyle = (status: DutyStatus) => {
  switch (status) {
    case DutyStatus.Pending:
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case DutyStatus.InProgress:
      return "bg-blue-100 text-blue-700 border-blue-200";
    case DutyStatus.Completed:
      return "bg-green-100 text-green-700 border-green-200";
    case DutyStatus.Cancelled:
      return "bg-red-100 text-red-700 border-red-200";
    case DutyStatus.Approved:
      return "bg-purple-100 text-purple-700 border-purple-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export const getDutyTypeStyle = (type: DutyType) => {
  switch (type) {
    case DutyType.Emergency:
      return "bg-red-100 text-red-700";
    case DutyType.Routine:
      return "bg-green-100 text-green-700";
    case DutyType.SpecialTask:
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
