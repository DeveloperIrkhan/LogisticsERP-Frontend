import { IDashboardSummary } from '@/modules/dashboards/types';
import React from 'react'
import PortionDesign from '../PortionDesign';
import { AlertTriangle, Clock, CalendarClock, CheckCircle2 } from 'lucide-react';

interface IFuelAnalytics {
    getSummary: IDashboardSummary;
    className?: string;
}

type AlertItem = {
    vehicleId: string;
    vehicleNumber: string;
    expiryType: string;
    expiryDate: string;
    daysRemaining: number;
};

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

const AlertRow = ({ alert, tone }: { alert: AlertItem; tone: Tone }) => {
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
                      {alert.vehicleNumber}
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
    items,
    emptyMessage,
}: {
    title: string;
    icon: React.ReactNode;
    tone: Tone;
    items: AlertItem[];
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
                    {items.length}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                {items.length > 0
                    ? items.map((alert, index) => (
                        <AlertRow key={`${alert.vehicleId}-${alert.expiryType}-${index}`} alert={alert} tone={tone} />
                    ))
                    : <EmptySection message={emptyMessage} />
                }
            </div>
        </div>
    );
};

const ExpiringAlerts = ({ getSummary, className }: IFuelAnalytics) => {
    const { expiredVehicles, expiringIn30Days, expiringIn60Days } = getSummary.expiryAlerts;

    return (
        <PortionDesign className={`bg-white ${className}`}>
            <div className="flex items-center justify-between p-4 pb-2">
                <h2 className="font-bold text-gray-900">Upcoming Alerts</h2>
                <span className="text-xs text-gray-400">
                    {expiredVehicles.length + expiringIn30Days.length + expiringIn60Days.length} total
                </span>
            </div>

            <div className="flex flex-col gap-5 p-4 pt-2">
                <AlertSection
                    title="Expired"
                    icon={<AlertTriangle size={16} />}
                    tone="expired"
                    items={expiredVehicles}
                    emptyMessage="No expired documents"
                />
                <AlertSection
                    title="Expiring in 30 days"
                    icon={<Clock size={16} />}
                    tone="warning"
                    items={expiringIn30Days}
                    emptyMessage="Nothing expiring this month"
                />
                <AlertSection
                    title="Expiring in 60 days"
                    icon={<CalendarClock size={16} />}
                    tone="upcoming"
                    items={expiringIn60Days}
                    emptyMessage="Nothing expiring in the next 60 days"
                />
            </div>
        </PortionDesign>
    )
}

export default ExpiringAlerts