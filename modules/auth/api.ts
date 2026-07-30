import api from "@/lib/axios";
import {
  ApiResponse,
  IAuthResponseDto,
  IChangePasswordDto,
  IForgotPasswordDto,
  ILoginDto,
  IRegisterDto,
  IResetPasswordDto,
  IUserAuthDto,
} from "./types";
import { extractApiResponse } from "./ApiError";

const AUTH_ENDPOINTS = {
  Register: "/Auth/register",
  Login: "/Auth/login",
  RefreshToken: "/Auth/refresh-token",
  Logout: "/Auth/logout",
  ForgotPassword: "/Auth/forgot-password",
  ResetPassword: "/Auth/reset-password",
  ChangePassword: "/Auth/change-password",
  Me: "/Auth/me",
} as const;


export const registerAsync = async (
  formDate: FormData,
): Promise<ApiResponse<IUserAuthDto>> => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.Register, formDate, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return extractApiResponse<IUserAuthDto>(
      error,
      "Registration failed. Please try again.",
    );
  }
};

export const loginAsync = async (
  dto: ILoginDto,
): Promise<ApiResponse<IAuthResponseDto>> => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.Login, dto);
    return response.data;
  } catch (error) {
    return extractApiResponse<IAuthResponseDto>(
      error,
      "Login failed. Please try again.",
    );
  }
};

export const refreshTokenAsync = async (
  refreshToken: string,
): Promise<ApiResponse<IAuthResponseDto>> => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.RefreshToken, {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    return extractApiResponse<IAuthResponseDto>(
      error,
      "Session expired. Please log in again.",
    );
  }
};

export const logoutAsync = async (
  refreshToken: string,
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.Logout, { refreshToken });
    return response.data;
  } catch (error) {
    return extractApiResponse<boolean>(error, "Logout failed.");
  }
};

export const forgotPasswordAsync = async (
  dto: IForgotPasswordDto,
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.ForgotPassword, dto);
    return response.data;
  } catch (error) {
    return extractApiResponse<boolean>(
      error,
      "Something went wrong. Please try again.",
    );
  }
};

export const resetPasswordAsync = async (
  dto: IResetPasswordDto,
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.ResetPassword, dto);
    return response.data;
  } catch (error) {
    return extractApiResponse<boolean>(
      error,
      "This reset link is invalid or has expired.",
    );
  }
};

export const changePasswordAsync = async (
  dto: IChangePasswordDto,
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.ChangePassword, dto);
    return response.data;
  } catch (error) {
    return extractApiResponse<boolean>(error, "Failed to change password.");
  }
};
