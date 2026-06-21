// ─── MAIN DASHBOARD SUMMARY ───────────────────────────────
export interface IDashboardSummary {
  vehicleStats: IVehicleStats;
  fuelAnalytics: IFuelAnalytics;
  maintenanceAnalytics: IMaintenanceAnalytics;
  expenseAnalytics: IExpenseAnalytics;
  expiryAlerts: IExpiryAlerts;
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
export interface IExpiryAlerts {
  expiredVehicles: IExpiryItem[];
  expiringIn30Days: IExpiryItem[];
  expiringIn60Days: IExpiryItem[];
}

export interface IExpiryItem {
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
