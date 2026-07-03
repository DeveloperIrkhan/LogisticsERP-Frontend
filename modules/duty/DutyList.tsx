"use client";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import {
    Clock,
    MapPin,
    User,
    Truck,
    ArrowRight,
    Plus,
    Calendar,
    Gauge,
    CheckCircle,
    XCircle,
    AlertTriangle,
    PlayCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import {
    IDutyResponseDto,
    DutyStatus,
    DutyType,
    getDutyStatusStyle,
    getDutyTypeStyle,
} from "./dutyTypes";
import { getAllDutiesAsync } from "./api";

const DutyList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [duties, setDuties] = useState<IDutyResponseDto[]>([]);
    const [filter, setFilter] = useState<DutyStatus | "All">("All");

    useEffect(() => {
        const fetchDuties = async () => {
            try {
                setIsLoading(true);
                const response = await getAllDutiesAsync();
                if (response.success) {
                    setDuties(response.data);
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            } catch {
                console.error("Error fetching duties");
            } finally {
                setIsLoading(false);
            }
        };
        fetchDuties();
    }, []);

    if (isLoading) return <Spinner />;

    const filtered =
        filter === "All" ? duties : duties.filter((d) => d.status === filter);

    const counts = {
        all: duties.length,
        pending: duties.filter((d) => d.status === DutyStatus.Pending).length,
        inProgress: duties.filter((d) => d.status === DutyStatus.InProgress).length,
        completed: duties.filter((d) => d.status === DutyStatus.Completed).length,
        cancelled: duties.filter((d) => d.status === DutyStatus.Cancelled).length,
        approved: duties.filter((d) => d.status === DutyStatus.Approved).length,
    };

    const filterButtons = [
        { label: "All", value: "All", count: counts.all, color: "bg-slate-600" },
        { label: "Pending", value: DutyStatus.Pending, count: counts.pending, color: "bg-yellow-500" },
        { label: "In Progress", value: DutyStatus.InProgress, count: counts.inProgress, color: "bg-blue-500" },
        { label: "Completed", value: DutyStatus.Completed, count: counts.completed, color: "bg-lime-500" },
        { label: "Approved", value: DutyStatus.Approved, count: counts.approved, color: "bg-lime-200" },
        { label: "Cancelled", value: DutyStatus.Cancelled, count: counts.cancelled, color: "bg-red-500" },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header Banner */}
                <div className="mb-10 px-4 py-7 rounded-t-2xl bg-linear-to-r from-red-400 to-red-900">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
                        <div>
                            <h1 className="text-3xl text-white font-extrabold">Duty Logs</h1>
                            <p className="mt-2 text-white text-lg">
                                Manage and track all driver duties
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Total Duties</p>
                                <h2 className="text-3xl font-bold text-white">{duties.length}</h2>
                            </div>
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Active Now</p>
                                <h2 className="text-3xl font-bold text-white">{counts.inProgress}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs + Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {filterButtons.map((btn) => (
                            <button
                                key={btn.value}
                                onClick={() => setFilter(btn.value as DutyStatus | "All")}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === btn.value
                                    ? `${btn.color} text-white shadow-md`
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-red-300"
                                    }`}
                            >
                                {btn.label}
                                <span
                                    className={`text-xs px-1.5 py-0.5 rounded-full ${filter === btn.value
                                        ? "bg-white/25 text-white"
                                        : "bg-slate-100 text-slate-500"
                                        }`}
                                >
                                    {btn.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    <Link
                        href="/duty/create-duty"
                        className="flex items-center gap-2 bg-linear-to-r from-red-500 to-red-800 hover:from-red-600 hover:to-red-900 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Assign Duty
                    </Link>
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-slate-200">
                        <div className="bg-red-100 text-red-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <Clock className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mt-6">
                            No Duties Found
                        </h2>
                        <p className="text-slate-500 mt-3 text-lg">
                            {filter === "All"
                                ? "No duties have been assigned yet."
                                : `No duties with status "${filter}".`}
                        </p>
                    </div>
                )}

                {/* Duty Grid */}
                {filtered.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filtered.map((duty) => {
                            const dateOut = new Date(duty.dateOut).toDateString();
                            const dateIn = duty.dateIn
                                ? new Date(duty.dateIn).toDateString()
                                : null;

                            return (
                                <div
                                    key={duty.dutyId}
                                    className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                                >
                                    {/* Top Gradient */}
                                    <div className="bg-linear-to-r p-2 from-red-400 to-red-900 group-hover:from-red-900 group-hover:to-red-400 transition-colors duration-400">
                                        <div className="flex w-full items-center justify-between px-4">
                                            <span
                                                className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getDutyTypeStyle(duty.dutyType)}`}
                                            >
                                                {duty.dutyType}
                                            </span>
                                            <span
                                                className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getDutyStatusStyle(duty.status)}`}
                                            >
                                                {duty.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute top-0 right-0 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-40"></div>

                                    <div className="relative p-6">
                                        {/* From → To */}
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <p className="text-xs text-slate-500">From</p>
                                                <p className="font-bold text-slate-800 text-sm">
                                                    {duty.fromLocation}
                                                </p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-red-400 shrink-0" />
                                            <div>
                                                <p className="text-xs text-slate-500">To</p>
                                                <p className="font-bold text-slate-800 text-sm">
                                                    {duty.toLocation}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-slate-500 mt-2 truncate">
                                            {duty.purpose}
                                        </p>

                                        <div className="mt-5 space-y-3">
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">Date Out</p>
                                                        <p className="text-sm font-semibold text-slate-700">
                                                            {dateOut}
                                                        </p>
                                                    </div>
                                                </div>
                                                {dateIn && (
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-slate-400" />
                                                        <div>
                                                            <p className="text-xs text-slate-500">Date In</p>
                                                            <p className="text-sm font-semibold text-slate-700">
                                                                {dateIn}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-slate-400" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">Officer</p>
                                                        <p className="text-sm font-semibold text-slate-700">
                                                            {duty.officerName}
                                                        </p>
                                                    </div>
                                                </div>
                                                {duty.totalKm && (
                                                    <div className="flex items-center gap-2">
                                                        <Gauge className="w-4 h-4 text-slate-400" />
                                                        <div>
                                                            <p className="text-xs text-slate-500">Total Km</p>
                                                            <p className="text-sm font-semibold text-slate-700">
                                                                {duty.totalKm} km
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-between items-center">
                                            {duty.totalHours && (
                                                <div>
                                                    <p className="text-xs text-slate-500">Total Hours</p>
                                                    <p className="text-lg font-bold text-red-600">
                                                        {duty.totalHours.toFixed(2)} hrs
                                                    </p>
                                                </div>
                                            )}
                                            <Link
                                                href={`/duty/get-single-duty/${duty.dutyId}`}
                                                className="ml-auto group/button flex items-center gap-2 bg-linear-to-r from-red-400 to-red-900 hover:from-red-600 hover:to-red-900 text-white px-4 py-2 font-medium rounded-md shadow-lg transition-all duration-600"
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

export default DutyList;