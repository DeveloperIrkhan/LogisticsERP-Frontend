// ─── MAIN DASHBOARD SUMMARY ───────────────────────────────
export interface IDashboardSummary {
  vehicleStats: IVehicleStats;
  fuelAnalytics: IFuelAnalytics;
  maintenanceAnalytics: IMaintenanceAnalytics;
  expenseAnalytics: IExpenseAnalytics;
  expiryAlerts: IExpiryAlertsResponseDto;
  driverStatsDto: driverStatsDto;
}


// ─── VEHICLE STATS ────────────────────────────────────────
export interface IVehicleStats {
  totalVehicles: number;
  activeVehicles: number;
  inactiveVehicles: number;
  assignedVehicles: number;
  unassignedVehicles: number;
  totalDrivers: number;
  activeDrivers: number;
  onDutyDrivers: number;
}
// ─── VEHICLE STATS ────────────────────────────────────────
export interface driverStatsDto {
  totalDrivers: number;
  totalActiveDrivers: number;
  onDutyDrivers: number;
  inActiveDrivers: number;
}

// ─── EXPIRY ALERTS ────────────────────────────────────────

export interface IExpiryAlertsResponseDto {
  vehicleExpiryAlerts: IVehicleExpiryAlertDto;
  driverExpiryAlerts: IDriverExpiryAlertsDto;
}
export interface IDriverExpiryAlertsDto {
  expiredDrivers: DriverExpiryItemDto[];
  expiringDriverIn30Days: DriverExpiryItemDto[];
  expiringDriverIn60Days: DriverExpiryItemDto[];
}
export interface DriverExpiryItemDto {
  driverId: string;
  fullName: string;
  mobileNumber: string;
  expiryType: string; // License, cnic
  expiryDate: string;
  daysRemaining: number;
}

export interface IVehicleExpiryAlertDto {
  expiredVehicles: VehicleExpiryItemDto[];
  vehicleExpiringIn30Days: VehicleExpiryItemDto[];
  vehicleExpiringIn60Days: VehicleExpiryItemDto[];
}
export interface VehicleExpiryItemDto {
  vehicleId: string;
  vehicleNumber: string;
  expiryType: string; // Registration, Insurance, Fitness
  expiryDate: string;
  daysRemaining: number;
}

// ─── FUEL ANALYTICS ───────────────────────────────────────
export interface IFuelAnalytics {
  totalLitersThisMonth: number;
  totalCostThisMonth: number;
  totalLitersThisYear: number;
  totalCostThisYear: number;
  totalFuelRecords: number;
  monthlyTrend: IMonthlyTrend[];
}

// ─── MAINTENANCE ANALYTICS ────────────────────────────────
export interface IMaintenanceAnalytics {
  totalCostThisMonth: number;
  totalCostThisYear: number;
  totalRecordsThisMonth: number;
  upcomingMaintenanceCount: number;
  monthlyTrend: IMonthlyTrend[];
}

// ─── EXPENSE ANALYTICS ────────────────────────────────────
export interface IExpenseAnalytics {
  totalThisMonth: number;
  totalThisYear: number;
  pendingExpenses: number;
  approvedExpenses: number;
  rejectedExpenses: number;
  byCategory: ICategoryBreakdown[];
}

// ─── SHARED ───────────────────────────────────────────────
export interface IMonthlyTrend {
  month: number;
  year: number;
  amount: number;
  monthName: string;
}

export interface ICategoryBreakdown {
  category: string;
  amount: number;
  count: number;
}

// ─── API RESPONSE ─────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
