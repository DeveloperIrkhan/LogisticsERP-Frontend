import React from 'react'
import PortionDesign from '../PortionDesign'
import SectionHeader from '../SectionHeader'
import { Fuel, Wrench } from 'lucide-react'
import { IDashboardSummary, IMonthlyTrend } from '@/modules/dashboards/types';

interface IFuelAnalytics {
    getSummary: IDashboardSummary;
    className?: string;

}

const FuelAnalytics = ({ getSummary, className }: IFuelAnalytics) => {

    const totalAlerts = getSummary?.expiryAlerts.expiredVehicles.length +
        getSummary?.expiryAlerts.expiringIn30Days.length +
        getSummary?.expiryAlerts.expiringIn60Days.length


    return (
        <PortionDesign className={`bg-white ${className}`}>
            <h2 className="p-3 font-bold text-gray-900">Anaylytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Fuel Analytics */}
                <div className="bg-white rounded-xl p-5">
                    <SectionHeader
                        title="Fuel Analytics"
                        subtitle="This month vs this year"
                        icon={<Fuel className="w-5 h-5" />}
                    />
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-xs text-blue-600">This Month Cost</p>
                            <p className="text-lg font-bold text-blue-800">
                                PKR {getSummary.fuelAnalytics.totalCostThisMonth.toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-xs text-blue-600">This Month Liters</p>
                            <p className="text-lg font-bold text-blue-800">
                                {getSummary.fuelAnalytics.totalLitersThisMonth.toLocaleString()} L
                            </p>
                        </div>
                        <div className="bg-indigo-50 rounded-lg p-3">
                            <p className="text-xs text-indigo-600">This Year Cost</p>
                            <p className="text-lg font-bold text-indigo-800">
                                PKR {getSummary.fuelAnalytics.totalCostThisYear.toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-indigo-50 rounded-lg p-3">
                            <p className="text-xs text-indigo-600">Total Records</p>
                            <p className="text-lg font-bold text-indigo-800">
                                {getSummary.fuelAnalytics.totalFuelRecords}
                            </p>
                        </div>
                    </div>
                    {getSummary.fuelAnalytics.monthlyTrend.length > 0 && (
                        <MonthlyTrendBar
                            data={getSummary.fuelAnalytics.monthlyTrend}
                            label="Monthly Fuel Cost Trend"
                        />
                    )}
                </div>

                {/* Maintenance Analytics */}
                <div className="bg-white rounded-xl p-5">
                    <SectionHeader
                        title="Maintenance Analytics"
                        subtitle="Cost tracking and upcoming"
                        icon={<Wrench className="w-5 h-5" />}
                    />
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-yellow-50 rounded-lg p-3">
                            <p className="text-xs text-yellow-600">This Month Cost</p>
                            <p className="text-lg font-bold text-yellow-800">
                                PKR {getSummary.maintenanceAnalytics.totalCostThisMonth.toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3">
                            <p className="text-xs text-yellow-600">Records This Month</p>
                            <p className="text-lg font-bold text-yellow-800">
                                {getSummary.maintenanceAnalytics.totalRecordsThisMonth}
                            </p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3">
                            <p className="text-xs text-orange-600">This Year Cost</p>
                            <p className="text-lg font-bold text-orange-800">
                                PKR {getSummary.maintenanceAnalytics.totalCostThisYear.toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3">
                            <p className="text-xs text-red-600">Upcoming (30 days)</p>
                            <p className="text-lg font-bold text-red-800">
                                {getSummary.maintenanceAnalytics.upcomingMaintenanceCount}
                            </p>
                        </div>
                    </div>
                    {getSummary.maintenanceAnalytics.monthlyTrend.length > 0 && (
                        <MonthlyTrendBar
                            data={getSummary.maintenanceAnalytics.monthlyTrend}
                            label="Monthly Maintenance Cost Trend"
                        />
                    )}
                </div>
            </div>
        </PortionDesign>
    )
}

export default FuelAnalytics




const MonthlyTrendBar = ({
    data,
    label,
}: {
    data: IMonthlyTrend[];
    label: string;
}) => {
    const max = Math.max(...data.map((d) => d.amount), 1);
    return (
        <div>
            <p className="text-xs text-gray-500 mb-3">{label}</p>
            <div className="flex items-end gap-1 h-24">
                {data.slice(-6).map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                            className="w-full bg-red-400 rounded-t-sm hover:bg-red-600 transition-colors cursor-pointer"
                            style={{ height: `${(item.amount / max) * 80}px` }}
                            title={`PKR ${item.amount.toLocaleString()}`}
                        />
                        <p className="text-xs text-gray-400 rotate-0">
                            {item.monthName?.slice(0, 5)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
