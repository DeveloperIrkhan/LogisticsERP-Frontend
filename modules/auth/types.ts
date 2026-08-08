export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IRegisterDto {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  avator?: File;
}

export interface ILoginDto {
  userNameOrEmail: string;
  password: string;
}

export interface IUserAuthDto {
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  roleId: string;
  roleName: string;
  profilePictureUrl?: string | null;
  mustChangePassword: boolean;
}

export interface IAuthResponseDto {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  user: IUserAuthDto;
}

export interface IForgotPasswordDto {
  email: string;
}

export interface IResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface IChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

// Matches the Role table your backend seeds on startup.
export enum RoleName {
  Admin = "Admin",
  FleetManager = "FleetManager",
  DataEntryOperator = "DataEntryOperator",
  Driver = "Driver",
  Viewer = "Viewer",
}
