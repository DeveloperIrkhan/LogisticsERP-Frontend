import { IDashboardSummary, IExpenseAnalytics } from '@/modules/dashboards/types';
import React from 'react'
import PortionDesign from '../PortionDesign';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import BarChart from '../Charts/BarChart';

interface IProps {
    getSummary: IDashboardSummary;
    className?: string;
}

const CATEGORY_COLORS = [
    'bg-violet-500',
    'bg-blue-500',
    'bg-teal-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-gray-400',
];

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PKR',
        maximumFractionDigits: 0,
    }).format(value);

const StatusChip = ({
    label,
    value,
    icon,
    className,
}: {
    label: string;
    value: number;
    icon: React.ReactNode;
    className: string;
}) => (
    <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${className}`}>
        {icon}
        <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold">{value}</span>
            <span className="text-[11px] opacity-80">{label}</span>
        </div>
    </div>
);

const ExpenseAnalytics = ({ getSummary, className }: IProps) => {
    const {
        totalThisMonth,
        totalThisYear,
        pendingExpenses,
        approvedExpenses,
        rejectedExpenses,
        byCategory,
    } = getSummary.expenseAnalytics;

    const totalAmount = byCategory.reduce((sum, cat) => sum + cat.amount, 0);

    const sortedCategories = [...byCategory]
        .sort((a, b) => b.amount - a.amount)
        .map((cat) => ({
            ...cat,
            percentage: totalAmount > 0 ? (cat.amount / totalAmount) * 100 : 0,
        }));

    return (
        <PortionDesign className={`bg-white ${className}`}>
            <div className="flex items-center justify-between p-4 pb-2">
                <h2 className="font-bold text-gray-900">Expense Analytics</h2>
            </div>

            <div className="flex flex-col gap-5 p-4 pt-0">
                {/* Headline totals */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                        <span className="text-xs text-gray-500">This Month</span>
                        <p className="text-xl font-bold text-gray-900">
                            {formatCurrency(totalThisMonth)} /-
                        </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                        <span className="text-xs text-gray-500">This Year</span>
                        <p className="text-xl font-bold text-gray-900">
                            {formatCurrency(totalThisYear)} /-
                        </p>
                    </div>
                </div>

                {/* Status breakdown */}
                <div className="grid grid-cols-3 gap-2">
                    <StatusChip
                        label="Pending"
                        value={pendingExpenses}
                        icon={<Clock size={14} className="text-amber-600" />}
                        className="bg-amber-50 text-amber-700"
                    />
                    <StatusChip
                        label="Approved"
                        value={approvedExpenses}
                        icon={<CheckCircle2 size={14} className="text-green-600" />}
                        className="bg-green-50 text-green-700"
                    />
                    <StatusChip
                        label="Rejected"
                        value={rejectedExpenses}
                        icon={<XCircle size={14} className="text-red-600" />}
                        className="bg-red-50 text-red-700"
                    />
                </div>
                <div className="">
                    <BarChart
                        chartTitle='Fuel'
                        totalCount={5000}
                        value={2000}
                        key={1}
                    />

                    <BarChart
                        chartTitle='Mentinance'
                        totalCount={5000}
                        value={3000}
                        key={2}
                    />
                    <BarChart
                        chartTitle='Insurance'
                        totalCount={5000}
                        value={1000}
                        key={3}
                    />
                </div>
                {/* Category breakdown */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-gray-800">By Category</h3>
                    {sortedCategories.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {sortedCategories.map((cat, index) => (
                                <div key={`${cat.category}-${index}`} className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium text-gray-700">{cat.category}</span>
                                        <span className="text-gray-500">
                                            {formatCurrency(cat.amount)}
                                            <span className="ml-1 text-gray-400">({cat.count})</span>
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className={`h-full rounded-full ${CATEGORY_COLORS[index % CATEGORY_COLORS.length]}`}
                                            style={{ width: `${cat.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}


                        </div>
                    ) : (
                        <div className="flex items-center gap-2 rounded-lg border border-dashed border-gray-200 p-3 text-sm text-gray-400">
                            No expenses recorded yet
                        </div>
                    )}
                </div>
            </div>
        </PortionDesign>
    )
}

export default ExpenseAnalytics