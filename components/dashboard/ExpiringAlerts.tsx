import { DriverExpiryItemDto, IDashboardSummary, IDriverExpiryAlertsDto, IVehicleExpiryAlertDto, VehicleExpiryItemDto } from '@/modules/dashboards/types';
import React from 'react'
import PortionDesign from '../PortionDesign';
import { AlertTriangle, Clock, CalendarClock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface IFuelAnalytics {
    getSummary: IDashboardSummary;
    className?: string;
}


type Tone = 'expired' | 'warning' | 'upcoming';

const TONE_STYLES: Record<Tone, {
    badge: string;
    card: string;
    icon: string;
    label: string;
}> = {
    expired: {
        badge: 'bg-red-50 text-red-700 ring-1 ring-red-200',
        card: 'bg-red-50/60 border-red-200',
        icon: 'text-red-600',
        label: 'text-red-700',
    },
    warning: {
        badge: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
        card: 'bg-amber-50/60 border-amber-200',
        icon: 'text-amber-600',
        label: 'text-amber-700',
    },
    upcoming: {
        badge: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
        card: 'bg-blue-50/60 border-blue-200',
        icon: 'text-blue-600',
        label: 'text-blue-700',
    },
};

const VehicleAlertRow = ({ alert, tone }: { alert: VehicleExpiryItemDto; tone: Tone }) => {
    const styles = TONE_STYLES[tone];
    const date = new Date(alert.expiryDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className={`flex items-center justify-between gap-4 rounded-lg border p-3 ${styles.card}`}>
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-gray-900">
                        vehicle no : {alert.vehicleNumber}
                    </span>
                    <span className="text-xs text-gray-500">
                        {alert.expiryType} · {date}
                    </span>
                </div>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}>
                {alert.daysRemaining < 0
                    ? `${Math.abs(alert.daysRemaining)} days overdue`
                    : `${alert.daysRemaining} days left`}
            </span>
        </div>
    );
};


const DriverAlertRow = ({ alert, tone }: { alert: DriverExpiryItemDto; tone: Tone }) => {
    const styles = TONE_STYLES[tone];
    const date = new Date(alert.expiryDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className={`flex items-center justify-between gap-4 rounded-lg border p-3 ${styles.card}`}>
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-gray-900">
                        name : {alert.fullName}
                    </span>
                    <span className="text-[15px] font-semibold text-gray-900">
                        mobile : {alert.mobileNumber}
                    </span>
                    <span className="text-xs text-gray-500">
                        {alert.expiryType} · {date}
                    </span>
                </div>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}>
                {alert.daysRemaining < 0
                    ? `${Math.abs(alert.daysRemaining)} days overdue`
                    : `${alert.daysRemaining} days left`}
            </span>
        </div>
    );
};


const EmptySection = ({ message }: { message: string }) => (
    <div className="flex items-center gap-2 rounded-lg border border-dashed border-gray-200 p-3 text-sm text-gray-400">
        <CheckCircle2 size={16} className="text-gray-300" />
        {message}
    </div>
);



const AlertSection = ({
    title,
    icon,
    tone,
    vehicleItems,
    driverItems,
    emptyMessage,
}: {
    title: string;
    icon: React.ReactNode;
    tone: Tone;
    vehicleItems?: VehicleExpiryItemDto[];
    driverItems?: DriverExpiryItemDto[];
    emptyMessage: string;
}) => {
    const styles = TONE_STYLES[tone];

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className={styles.icon}>{icon}</span>
                    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${styles.badge}`}>
                    {vehicleItems ? vehicleItems.length : driverItems?.length}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                {vehicleItems && vehicleItems.length > 0 && vehicleItems.slice(0, 2).map((alert, index) => (
                    <VehicleAlertRow key={`${alert}-${alert.expiryType}-${index}`} alert={alert} tone={tone} />
                ))}
                {driverItems && driverItems.length > 0 && driverItems.slice(0, 2).map((alert, index) => (
                    <DriverAlertRow key={`${alert.driverId}-${alert.expiryType}-${index}`} alert={alert} tone={tone} />
                ))}
                {(!vehicleItems || vehicleItems.length === 0) && (!driverItems || driverItems.length === 0) && <EmptySection message={emptyMessage} />}
            </div>
        </div>
    );
};

const ExpiringAlerts = ({ getSummary, className }: IFuelAnalytics) => {
    const { driverExpiryAlerts, vehicleExpiryAlerts } = getSummary.expiryAlerts;
    const { expiredDrivers, expiringDriverIn30Days, expiringDriverIn60Days } = driverExpiryAlerts;
    const { expiredVehicles, vehicleExpiringIn30Days, vehicleExpiringIn60Days } = vehicleExpiryAlerts;

    const totalAlerts =
        expiredVehicles.length +
        vehicleExpiringIn30Days.length +
        vehicleExpiringIn60Days.length +
        expiredDrivers.length +
        expiringDriverIn30Days.length +
        expiringDriverIn60Days.length;

    console.log("expiring alerts", getSummary.expiryAlerts);
    return (
        <PortionDesign className={`bg-white ${className}`}>
            <div className="flex items-center justify-between p-4 pb-2">
                <h2 className="font-bold text-gray-900 w-full">Upcoming Alerts</h2>
                <Link className='text-sm flex w-full text-blue-500 justify-end
             hover:text-red-600 hoverEffect' href={"/dashboard/alerts"}>view all</Link>
            </div>

            <div className="flex flex-col gap-5 p-4 pt-2">
                <h2 className="font-semibold text-gray-800">Vehicle Alerts</h2>
                <AlertSection
                    title="Expired"
                    icon={<AlertTriangle size={16} />}
                    tone="expired"
                    vehicleItems={expiredVehicles}
                    emptyMessage="No expired documents"
                />
                <AlertSection
                    title="Expiring in 30 days"
                    icon={<Clock size={16} />}
                    tone="warning"
                    vehicleItems={vehicleExpiringIn30Days}
                    emptyMessage="Nothing expiring this month"
                />
                <AlertSection
                    title="Expiring in 60 days"
                    icon={<CalendarClock size={16} />}
                    tone="upcoming"
                    vehicleItems={vehicleExpiringIn60Days}
                    emptyMessage="Nothing expiring in the next 60 days"
                />
            </div>

            <div className="flex flex-col gap-5 p-4 pt-2">
                <h2 className="font-semibold text-gray-800">Driver Alerts</h2>
                <AlertSection
                    title="Expired"
                    icon={<AlertTriangle size={16} />}
                    tone="expired"
                    driverItems={expiredDrivers}
                    emptyMessage="No expired documents"
                />
                <AlertSection
                    title="Expiring in 30 days"
                    icon={<Clock size={16} />}
                    tone="warning"
                    driverItems={expiringDriverIn30Days}
                    emptyMessage="Nothing expiring this month"
                />
                <AlertSection
                    title="Expiring in 60 days"
                    icon={<CalendarClock size={16} />}
                    tone="upcoming"
                    driverItems={expiringDriverIn60Days}
                    emptyMessage="Nothing expiring in the next 60 days"
                />
            </div>
        </PortionDesign>
    )
}

export default ExpiringAlerts