export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IRoleResponseDto {
  roleId: string;
  roleName: string;
  userCount: number;
}

export interface IRoleCreateDto {
  roleName: string;
}

// The 5 roles your backend seeds on startup — used as icon/color hints only.
// Admins can still add custom roles beyond these from the UI.
export const WELL_KNOWN_ROLES = ["Admin", "FleetManager", "DataEntryOperator", "Driver", "Viewer"];

export const getRoleStyle = (roleName: string) => {
  switch (roleName) {
    case "Admin":
      return "bg-red-100 text-red-700 border-red-200";
    case "FleetManager":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "DataEntryOperator":
      return "bg-green-100 text-green-700 border-green-200";
    case "Driver":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Viewer":
      return "bg-slate-100 text-slate-700 border-slate-200";
    default:
      return "bg-purple-100 text-purple-700 border-purple-200";
  }
};
