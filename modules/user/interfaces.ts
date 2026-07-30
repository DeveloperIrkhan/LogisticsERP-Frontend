export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
  Pending = "Pending",
  Rejected = "Rejected",
}

export interface IUserResponseDto {
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: UserStatus;
  profilePictureUrl?: string | null;
  roleId: string;
  roleName: string;
  createdAt: string;
  approvedBy?: string | null;
  approvedAt?: string | null;
}

export interface IApproveUserDto {
  roleId: string;
  approvedBy: string;
}

export interface IRejectUserDto {
  approvedBy: string;
  reason?: string;
}

export interface IUpdateUserRoleDto {
  roleId: string;
}

export interface IRoleResponseDto {
  roleId: string;
  roleName: string;
  userCount: number;
}
export interface IUpdateUserProfileDto {
  fullName?: string;
  phoneNumber?: string;
  avatar?: File;
}

export const getStatusStyle = (status: UserStatus) => {
  switch (status) {
    case UserStatus.Active:
      return "bg-green-100 text-green-700 border-green-200";
    case UserStatus.Pending:
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case UserStatus.Inactive:
      return "bg-gray-100 text-gray-700 border-gray-200";
    case UserStatus.Rejected:
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};
