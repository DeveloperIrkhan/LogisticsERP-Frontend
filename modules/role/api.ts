import api from "@/lib/axios";
import { ApiResponse, IRoleCreateDto, IRoleResponseDto } from "./interfaces";

const ROLE_ENDPOINTS = {
  GetAll: "/Role/get-all-roles",
  Create: "/Role/add-role",
} as const;

export const getAllRolesAsync = async (): Promise<ApiResponse<IRoleResponseDto[]>> => {
  const response = await api.get(ROLE_ENDPOINTS.GetAll);
  return response.data;
};

export const createRoleAsync = async (
  dto: IRoleCreateDto,
): Promise<ApiResponse<IRoleResponseDto>> => {
  const response = await api.post(ROLE_ENDPOINTS.Create, dto);
  return response.data;
};
