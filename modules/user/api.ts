import api from "@/lib/axios";
import {
  ApiResponse,
  IApproveUserDto,
  IRejectUserDto,
  IRoleResponseDto,
  IUpdateUserProfileDto,
  IUpdateUserRoleDto,
  IUserResponseDto,
  UserStatus,
} from "./interfaces";

const USER_ENDPOINTS = {
  GetAll: "/User/get-all-users",
  GetById: "/User/get-user",
  PendingApprovals: "/User/pending-approvals",
  GetByStatus: "/User/get-by-status",
  Approve: "/User/approve",
  Reject: "/User/reject",
  Deactivate: "/User/deactivate",
  Reactivate: "/User/reactivate",
  UpdateRole: "/User/update-role",
  Delete: "/User/delete-user",
  MyProfile: "/User/my-profile",
  UpdateMyProfile: "/User/update-my-profile",
} as const;

const ROLE_ENDPOINTS = {
  GetAll: "/Role/get-all-roles",
  Create: "/Role/add-role",
} as const;

export const getAllUsersAsync = async (): Promise<
  ApiResponse<IUserResponseDto[]>
> => {
  const response = await api.get(USER_ENDPOINTS.GetAll);
  return response.data;
};

export const getUserByIdAsync = async (
  id: string,
): Promise<ApiResponse<IUserResponseDto>> => {
  const response = await api.get(`${USER_ENDPOINTS.GetById}/${id}`);
  return response.data;
};

export const getPendingApprovalsAsync = async (): Promise<
  ApiResponse<IUserResponseDto[]>
> => {
  const response = await api.get(USER_ENDPOINTS.PendingApprovals);
  return response.data;
};

export const getUsersByStatusAsync = async (
  status: UserStatus,
): Promise<ApiResponse<IUserResponseDto[]>> => {
  const response = await api.get(USER_ENDPOINTS.GetByStatus, {
    params: { status },
  });
  return response.data;
};

export const approveUserAsync = async (
  id: string,
  dto: IApproveUserDto,
): Promise<ApiResponse<IUserResponseDto>> => {
  const response = await api.put(`${USER_ENDPOINTS.Approve}/${id}`, dto);
  return response.data;
};

export const rejectUserAsync = async (
  id: string,
  dto: IRejectUserDto,
): Promise<ApiResponse<IUserResponseDto>> => {
  const response = await api.put(`${USER_ENDPOINTS.Reject}/${id}`, dto);
  return response.data;
};

export const updateMyProfileAsync = async (
  dto: FormData,
): Promise<ApiResponse<IUserResponseDto>> => {
  const response = await api.put(USER_ENDPOINTS.UpdateMyProfile, dto, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deactivateUserAsync = async (
  id: string,
): Promise<ApiResponse<IUserResponseDto>> => {
  const response = await api.put(`${USER_ENDPOINTS.Deactivate}/${id}`);
  return response.data;
};

export const reactivateUserAsync = async (
  id: string,
): Promise<ApiResponse<IUserResponseDto>> => {
  const response = await api.put(`${USER_ENDPOINTS.Reactivate}/${id}`);
  return response.data;
};

export const updateUserRoleAsync = async (
  id: string,
  dto: IUpdateUserRoleDto,
): Promise<ApiResponse<IUserResponseDto>> => {
  const response = await api.put(`${USER_ENDPOINTS.UpdateRole}/${id}`, dto);
  return response.data;
};

export const deleteUserAsync = async (
  id: string,
): Promise<ApiResponse<boolean>> => {
  const response = await api.delete(`${USER_ENDPOINTS.Delete}/${id}`);
  return response.data;
};

export const getMyProfileAsync = async (): Promise<
  ApiResponse<IUserResponseDto>
> => {
  const response = await api.get(USER_ENDPOINTS.MyProfile);
  return response.data;
};

export const getAllRolesAsync = async (): Promise<
  ApiResponse<IRoleResponseDto[]>
> => {
  const response = await api.get(ROLE_ENDPOINTS.GetAll);
  return response.data;
};
