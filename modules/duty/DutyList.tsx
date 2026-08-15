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
import PageTitlelCard from "@/components/Badge/PageTitlelCard";
import DutyCard from "./DutyCard";

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
                <PageTitlelCard
                    h2="Duty Logs"
                    p="Manage and track all driver duties"
                    boxTitle="Total Duties"
                    Total={duties.length}
                    ActiveNowTitle="In Progress"
                    ActiveNow={counts.pending + counts.inProgress}
                />

                {/* Filter Tabs + Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex flex-wrap gap-2 my-5">
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
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all bg-red-500 text-white shadow-md hover:bg-red-600"
                    >
                        <Plus className="w-5 h-5" />
                        Assign Duty
                    </Link>
                </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {filtered.length > 0 && (
                        filtered.sort(
                            (a, b) =>
                                new Date(b.dateOut).getTime() - new Date(a.dateOut).getTime()
                        ).map((duty) => (
                            <DutyCard key={duty.dutyId} duty={duty} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DutyList;


