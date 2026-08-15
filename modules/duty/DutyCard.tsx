import React from 'react'
import { getDutyStatusStyle, getDutyTypeStyle, IDutyResponseDto } from './dutyTypes';
import { ArrowRight, Calendar, Gauge, User } from 'lucide-react';
import Link from 'next/link';


const DutyCard = ({ duty }: { duty: IDutyResponseDto }) => {
    const dateOut = new Date(duty.dateOut).toDateString();
    const dateIn = duty.dateIn
        ? new Date(duty.dateIn).toDateString()
        : "-";
    return (
        <div
            key={duty.dutyId}
            className="shadow-xl rounded-2xl bg-red-100 border border-stone-200 p-5 transition-shadow hover:shadow-md"
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="font-mono text-lg font-semibold text-slate-800">
                        {duty.fromLocation} → {duty.toLocation}
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500 truncate">
                        {duty.purpose}
                    </p>
                </div>

                <span
                    className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-semibold ${getDutyStatusStyle(
                        duty.status
                    )}`}
                >
                    {duty.status}
                </span>
            </div>

            {/* Type */}
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                <span
                    className={`rounded-md border px-2.5 py-1 font-medium uppercase ${getDutyTypeStyle(
                        duty.dutyType
                    )}`}
                >
                    {duty.dutyType}
                </span>

                {duty.totalKm && (
                    <span className="flex items-center gap-1.5">
                        <Gauge className="h-3.5 w-3.5" />
                        {duty.totalKm} km
                    </span>
                )}
            </div>

            {/* Details */}
            <div className="mt-4 space-y-2 border-t border-stone-200 pt-4">
                <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        Date Out
                    </span>
                    <span className="font-mono text-right text-sm font-semibold text-slate-800">
                        {dateOut}
                    </span>
                </div>

                {dateIn && (
                    <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-xs text-slate-400">
                            <Calendar className="h-3.5 w-3.5" />
                            Date In
                        </span>
                        <span className="font-mono text-right text-sm font-semibold text-slate-800">
                            {dateIn}
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-xs text-slate-400">
                        <User className="h-3.5 w-3.5" />
                        Officer
                    </span>
                    <span className="font-mono text-right text-sm font-semibold text-slate-800">
                        {duty.officerName}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-xs text-slate-400">
                        <ArrowRight className="h-3.5 w-3.5" />
                        Route
                    </span>
                    <span className="font-mono text-right text-sm font-semibold text-slate-800">
                        {duty.fromLocation} → {duty.toLocation}
                    </span>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">
                <div>
                    <p className="text-xs text-slate-400">Total Hours</p>
                    <p className="font-mono text-sm font-semibold text-red-700">
                        {duty.totalHours ? `${duty.totalHours.toFixed(2)} hrs` : "—"}
                    </p>
                </div>

                <Link
                    href={`/duty/get-single-duty/${duty.dutyId}`}
                    className="group/button flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-800"
                >
                    View Details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" />
                </Link>
            </div>
        </div>
    )
}


export default DutyCard