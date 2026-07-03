"use client";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import {
    Wrench,
    Calendar,
    Gauge,
    Banknote,
    Building2,
    ArrowRight,
    Plus,
    AlertTriangle,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import { IMaintenanceResponseDto } from "./types";
import { getAllMaintenanceAsync } from "./api";

const MaintenanceList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [records, setRecords] = useState<IMaintenanceResponseDto[]>([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                setIsLoading(true);
                const response = await getAllMaintenanceAsync();
                if (response.success) {
                    setRecords(response.data);
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching maintenance records:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecords();
    }, []);

    if (isLoading) return <Spinner />;

    const totalCost = records.reduce((sum, r) => sum + r.cost, 0);

    const isUpcoming = (nextDate?: string) => {
        if (!nextDate) return false;
        const diff = new Date(nextDate).getTime() - new Date().getTime();
        return diff > 0 && diff <= 30 * 24 * 60 * 60 * 1000;
    };

    const isOverdue = (nextDate?: string) => {
        if (!nextDate) return false;
        return new Date(nextDate) < new Date();
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Banner */}
                <div className="mb-10 px-4 py-7 rounded-t-2xl bg-linear-to-r from-red-400 to-red-900">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
                        <div>
                            <h1 className="text-3xl text-white font-extrabold">
                                Upcoming Maintenance Records
                            </h1>
                            <p className="mt-2 text-white text-lg">
                                Track all vehicle maintenance and service history
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Total Records</p>
                                <h2 className="text-3xl font-bold text-white">
                                    {records.length}
                                </h2>
                            </div>
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Total Cost</p>
                                <h2 className="text-3xl font-bold text-white">
                                    PKR {totalCost.toLocaleString()}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Button */}
                <div className="flex justify-end mb-6">
                    <Link
                        href="/maintenance/add-maintenance"
                        className="flex items-center gap-2 bg-linear-to-r from-red-500 to-red-800 hover:from-red-600 hover:to-red-900 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add Maintenance Record
                    </Link>
                </div>

                {/* Empty state */}
                {records.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-slate-200">
                        <div className="bg-red-100 text-red-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <Wrench className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mt-6">
                            No Maintenance Records Found
                        </h2>
                        <p className="text-slate-500 mt-3 text-lg">
                            There are currently no maintenance entries recorded.
                        </p>
                    </div>
                )}

                {/* Records Grid */}
                {records.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {records.map((record) => {
                            const maintenanceDate = new Date(
                                record.maintenanceDate,
                            ).toDateString();
                            const upcoming = isUpcoming(record.nextMaintenanceDate);
                            const overdue = isOverdue(record.nextMaintenanceDate);

                            return (
                                <div
                                    key={record.maintenanceRecordId}
                                    className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                                >
                                    {/* Top Gradient */}
                                    <div className="bg-linear-to-r p-2 from-red-400 to-red-900 group-hover:from-red-900 group-hover:to-red-400 transition-colors duration-400">
                                        <div className="flex w-full items-center justify-between px-4">
                                            <p className="text-white/90 font-normal text-sm">
                                                {record.maintenanceType || "Maintenance"}
                                            </p>
                                            {overdue && (
                                                <span className="bg-red-900 px-2.5 py-1 text-white text-xs rounded-md flex items-center gap-1">
                                                    <AlertTriangle className="w-3 h-3" /> Overdue
                                                </span>
                                            )}
                                            {upcoming && !overdue && (
                                                <span className="bg-yellow-500 px-2.5 py-1 text-white text-xs rounded-md flex items-center gap-1">
                                                    <AlertTriangle className="w-3 h-3" /> Due Soon
                                                </span>
                                            )}
                                            {!upcoming && !overdue && (
                                                <span className="bg-white/20 px-2.5 py-1 text-white text-xs rounded-md">
                                                    OK
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="absolute top-0 right-0 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-40"></div>

                                    <div className="relative p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-800">
                                                    {record.workshopName || "Workshop"}
                                                </h2>
                                                <p className="text-sm text-slate-500 mt-1 truncate max-w-[180px]">
                                                    {record.description}
                                                </p>
                                            </div>
                                            <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                                                <Wrench className="w-7 h-7" />
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-4">
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="w-5 h-5 text-dark-color" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">
                                                            Service Date
                                                        </p>
                                                        <p className="font-bold text-sm text-slate-800">
                                                            {maintenanceDate}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Gauge className="w-5 h-5 text-dark-color" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">
                                                            Current Km
                                                        </p>
                                                        <p className="font-bold text-sm text-slate-800">
                                                            {record.currentKm} km
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Building2 className="w-5 h-5 text-dark-color" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">
                                                            Invoice #
                                                        </p>
                                                        <p className="font-bold text-sm text-slate-800">
                                                            {record.invoiceNumber || "-"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="w-5 h-5 text-dark-color" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">
                                                            Next Service
                                                        </p>
                                                        <p
                                                            className={`font-bold text-sm ${overdue
                                                                    ? "text-red-600"
                                                                    : upcoming
                                                                        ? "text-yellow-600"
                                                                        : "text-slate-800"
                                                                }`}
                                                        >
                                                            {record.nextMaintenanceDate
                                                                ? new Date(
                                                                    record.nextMaintenanceDate,
                                                                ).toDateString()
                                                                : "-"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs text-slate-500">Cost</p>
                                                <p className="text-lg font-bold text-red-600">
                                                    PKR {record.cost.toLocaleString()}
                                                </p>
                                            </div>

                                            <Link
                                                href={`/maintenance/get-by-id/${record.maintenanceRecordId}`}
                                                className="group/button flex items-center gap-2 bg-linear-to-r from-red-400 to-red-900 hover:from-red-600 hover:to-red-900 text-white px-4 py-2 font-medium rounded-md shadow-lg transition-all duration-600"
                                            >
                                                View Details
                                                <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MaintenanceList;