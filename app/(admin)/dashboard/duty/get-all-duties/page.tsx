"use client";

import Spinner from "@/components/Spinner";
import { useCallback, useEffect, useState } from "react";

import {
    Clock,
    MapPin,
    User,
    Truck,
    ArrowRight,
    Calendar,
    Gauge,
    CheckCircle,
    XCircle,
    PlayCircle,
    Trash,
    StopCircle,
    FileText,
    Clock1,
} from "lucide-react";

import { IoHomeOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { GoShield } from "react-icons/go";
import { BsBriefcaseFill } from "react-icons/bs";
import { CiPaperplane } from "react-icons/ci";

import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    approveDutyAsync,
    cancelDutyAsync,
    deleteDutyAsync,
    endDutyAsync,
    ExportDutyPdfAsync,
    getAllDutiesAsync,
    startDutyAsync,
} from "@/modules/duty/api";

import {
    DutyStatus,
    IDutyResponseDto,
    IEndDutyDto,
} from "@/modules/duty/dutyTypes";

import MidModal from "@/components/Modals/MidModal";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { FaCommentDots, FaFilePdf } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

const DutyList = () => {
    const router = useRouter();


    const [isLoading, setIsLoading] = useState(false);

    const [duties, setDuties] = useState<IDutyResponseDto[]>([]);

    const [filter, setFilter] = useState<DutyStatus | "All">("All");


    const [selectedDutyId, setSelectedDutyId] = useState<string | null>(null);

    const [modalType, setModalType] = useState<
        "delete" | "end" | "approve" | "cancel" | null
    >(null);

    const [isDeleting, setIsDeleting] = useState(false);

    const [actioningDutyId, setActioningDutyId] = useState<string | null>(null);

    const [endDutyData, setEndDutyData] = useState<IEndDutyDto>({
        dateIn: new Date(),
        killometerIn: 0,
        remarks: "",
    });

    const [cancelReason, setCancelReason] = useState("");

    const [approvedBy, setApprovedBy] = useState("");


    const fetchDuties = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await getAllDutiesAsync();

            if (response.success) {
                setDuties(response.data);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Error fetching duties:", error);
            toast.error("Failed to load duties.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDuties();
    }, [fetchDuties]);


    const closeModal = () => {
        setSelectedDutyId(null);
        setModalType(null);

        setCancelReason("");
        setApprovedBy("");

        setEndDutyData({
            dateIn: new Date(),
            killometerIn: 0,
            remarks: "",
        });
    };

    const openDeleteModal = (dutyId: string) => {
        setSelectedDutyId(dutyId);
        setModalType("delete");
    };

    const openEndModal = (dutyId: string) => {
        setSelectedDutyId(dutyId);

        setEndDutyData({
            dateIn: new Date(),
            killometerIn: 0,
            remarks: "",
        });

        setModalType("end");
    };

    const openApproveModal = (dutyId: string) => {
        setSelectedDutyId(dutyId);
        setApprovedBy("");
        setModalType("approve");
    };

    const openCancelModal = (dutyId: string) => {
        setSelectedDutyId(dutyId);
        setCancelReason("");
        setModalType("cancel");
    };

    const handleDelete = async (dutyId: string) => {
        try {
            setIsDeleting(true);

            const res = await deleteDutyAsync(dutyId);

            if (res.success) {
                toast.success("Duty deleted successfully!");

                closeModal();

                await fetchDuties();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error("Delete duty error:", error);
            toast.error("Something went wrong.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleStart = async (dutyId: string) => {
        try {
            setActioningDutyId(dutyId);

            const res = await startDutyAsync(dutyId);

            if (res.success) {
                toast.success(res.message || "Duty started!");

                await fetchDuties();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error("Start duty error:", error);
            toast.error("Something went wrong.");
        } finally {
            setActioningDutyId(null);
        }
    };


    const handleEnd = async (dutyId: string) => {
        try {
            setActioningDutyId(dutyId);

            const res = await endDutyAsync(dutyId, endDutyData);

            if (res.success) {
                toast.success(res.message || "Duty ended!");

                closeModal();

                await fetchDuties();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error("End duty error:", error);
            toast.error("Something went wrong.");
        } finally {
            setActioningDutyId(null);
        }
    };

    const handleGeneratePdf = async (dutyId: string) => {
        try {
            const blob = await ExportDutyPdfAsync(dutyId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `DutyReport_${dutyId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download duty PDF:", error);
        };
    };
    const handleApprove = async (dutyId: string) => {
        if (!approvedBy.trim()) {
            toast.error("Please enter approver name.");
            return;
        }

        try {
            setActioningDutyId(dutyId);

            const res = await approveDutyAsync(
                dutyId,
                approvedBy.trim()
            );

            if (res.success) {
                toast.success(res.message || "Duty approved!");

                closeModal();

                await fetchDuties();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error("Approve duty error:", error);
            toast.error("Something went wrong.");
        } finally {
            setActioningDutyId(null);
        }
    };


    const handleCancel = async (dutyId: string) => {
        if (!cancelReason.trim()) {
            toast.error("Please enter cancellation reason.");
            return;
        }

        try {
            setActioningDutyId(dutyId);

            const res = await cancelDutyAsync(
                dutyId,
                cancelReason.trim()
            );

            if (res.success) {
                toast.success(res.message || "Duty cancelled!");

                closeModal();

                await fetchDuties();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error("Cancel duty error:", error);
            toast.error("Something went wrong.");
        } finally {
            setActioningDutyId(null);
        }
    };


    if (isLoading) {
        return <Spinner />;
    }



    const filtered =
        filter === "All"
            ? duties
            : duties.filter((duty) => duty.status === filter);


    const counts = {
        all: duties.length,

        pending: duties.filter(
            (duty) => duty.status === DutyStatus.Pending
        ).length,

        inProgress: duties.filter(
            (duty) => duty.status === DutyStatus.InProgress
        ).length,

        completed: duties.filter(
            (duty) => duty.status === DutyStatus.Completed
        ).length,

        cancelled: duties.filter(
            (duty) => duty.status === DutyStatus.Cancelled
        ).length,

        approved: duties.filter(
            (duty) => duty.status === DutyStatus.Approved
        ).length,
    };



    const filterButtons = [
        {
            label: "All",
            value: "All",
            count: counts.all,
            color: "bg-slate-600",
        },
        {
            label: "Pending",
            value: DutyStatus.Pending,
            count: counts.pending,
            color: "bg-yellow-500",
        },
        {
            label: "In Progress",
            value: DutyStatus.InProgress,
            count: counts.inProgress,
            color: "bg-blue-500",
        },
        {
            label: "Completed",
            value: DutyStatus.Completed,
            count: counts.completed,
            color: "bg-lime-500",
        },
        {
            label: "Approved",
            value: DutyStatus.Approved,
            count: counts.approved,
            color: "bg-lime-200",
        },
        {
            label: "Cancelled",
            value: DutyStatus.Cancelled,
            count: counts.cancelled,
            color: "bg-red-500",
        },
    ];



    const selectedDuty = duties.find(
        (duty) => duty.dutyId === selectedDutyId
    );



    return (
        <div className="min-h-screen w-full bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 px-4 py-7 rounded-t-2xl bg-linear-to-r from-red-400 to-red-900">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">

                        <div>
                            <h1 className="text-3xl text-white font-extrabold">
                                Duty Logs
                            </h1>

                            <p className="mt-2 text-white text-lg">
                                Manage and track all driver duties
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">
                                    Total Duties
                                </p>

                                <h2 className="text-3xl font-bold text-white">
                                    {duties.length}
                                </h2>
                            </div>

                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">
                                    Active Now
                                </p>

                                <h2 className="text-3xl font-bold text-white">
                                    {counts.inProgress}
                                </h2>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

                    <div className="flex flex-wrap gap-2">

                        {filterButtons.map((btn) => (
                            <button
                                key={btn.value}
                                onClick={() =>
                                    setFilter(
                                        btn.value as DutyStatus | "All"
                                    )
                                }
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

                {filtered.length > 0 && (
                    <div className="flex flex-col gap-4">

                        {filtered.map((duty) => {

                            const dateOut = duty.dateOut
                                ? new Date(duty.dateOut).toLocaleString()
                                : "-";

                            const dateIn = duty.dateIn
                                ? new Date(duty.dateIn).toLocaleString()
                                : null;

                            const isActioning =
                                actioningDutyId === duty.dutyId;
                            const cancelledAt = duty.cancelledAt
                                ? new Date(duty.cancelledAt).toLocaleString()
                                : null;
                            return (
                                <div
                                    key={duty.dutyId}
                                    className="group w-full relative p-4 overflow-hidden rounded-xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center mb-6">


                                        <div className="flex items-center min-w-0">
                                            <IoHomeOutline className="w-7 h-7 text-white bg-red-500 p-1.5 rounded-full shrink-0" />

                                            <div className="ml-3 min-w-0">
                                                <span className="text-xs text-slate-500 block">
                                                    From
                                                </span>

                                                <span className="text-sm font-semibold text-slate-700 break-words">
                                                    {duty.fromLocation}
                                                </span>
                                            </div>
                                        </div>

                                        <ArrowRight className="w-5 h-5 text-red-400 shrink-0 hidden md:block" />


                                        <div className="flex items-center min-w-0">
                                            <SlLocationPin className="w-7 h-7 text-white bg-red-500 p-1.5 rounded-full shrink-0" />

                                            <div className="ml-3 min-w-0">
                                                <span className="text-xs text-slate-500 block">
                                                    To
                                                </span>

                                                <span className="text-sm font-semibold text-slate-700 break-words">
                                                    {duty.toLocation}
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-center gap-6">


                                        <div className="flex items-center min-w-0">
                                            <Calendar className="w-7 h-7 text-white bg-red-500 p-1.5 rounded-full shrink-0" />

                                            <div className="ml-3 min-w-0">
                                                <span className="text-xs text-slate-500 block">
                                                    Date Out
                                                </span>

                                                <span className="text-sm font-semibold text-slate-700">
                                                    {dateOut}
                                                </span>
                                            </div>
                                        </div>


                                        <div className="flex items-center min-w-0">
                                            <Calendar className="w-7 h-7 text-white bg-red-500 p-1.5 rounded-full shrink-0" />

                                            <div className="ml-3 min-w-0">
                                                <span className="text-xs text-slate-500 block">
                                                    Date In
                                                </span>

                                                <span className="text-sm font-semibold text-slate-700">
                                                    {dateIn || "-"}
                                                </span>
                                            </div>
                                        </div>


                                        <div className="flex items-center min-w-0">
                                            <User className="w-7 h-7 text-white bg-red-500 p-1.5 rounded-full shrink-0" />

                                            <div className="ml-3 min-w-0">
                                                <span className="text-xs text-slate-500 block">
                                                    Officer
                                                </span>

                                                <span className="text-sm font-semibold text-slate-700 break-words">
                                                    {duty.officerName}
                                                </span>
                                            </div>
                                        </div>


                                        <div className="flex items-center min-w-0">
                                            <GoShield className="w-7 h-7 text-white bg-red-500 p-1.5 rounded-full shrink-0" />

                                            <div className="ml-3 min-w-0">
                                                <span className="text-xs text-slate-500 block">
                                                    Purpose
                                                </span>

                                                <span className="text-sm font-semibold text-slate-700 break-words">
                                                    {duty.purpose}
                                                </span>
                                            </div>
                                        </div>


                                        <div className="flex items-center min-w-0">
                                            <BsBriefcaseFill className="w-7 h-7 text-white bg-red-500 p-1.5 rounded-full shrink-0" />

                                            <div className="ml-3 min-w-0">
                                                <span className="text-xs text-slate-500 block">
                                                    Type
                                                </span>

                                                <span className="text-sm font-semibold text-slate-700">
                                                    {duty.dutyType}
                                                </span>
                                            </div>
                                        </div>


                                        <div className="mt-5 flex items-center gap-3">
                                            <CiPaperplane className="w-7 h-7 text-white bg-red-500 p-1.5 rounded-full" />
                                            <div>
                                                <span className="text-xs text-slate-500 block">
                                                    Status
                                                </span>

                                                <span className="text-sm font-semibold text-slate-700">
                                                    {duty.status}
                                                </span>
                                            </div>
                                        </div>

                                        {duty.remarks && (
                                            <div className="mt-5 flex items-center gap-3">
                                                <FaCommentDots className="w-7 h-7 text-white bg-red-500 p-1.5 rounded-full" />
                                                <div>
                                                    <span className="text-xs text-slate-500 block">
                                                        Remarks
                                                    </span>

                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {duty.remarks}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {duty.cancellationReason && (
                                            <div className="mt-5 flex items-center gap-3">
                                                <ImCancelCircle className="w-7 h-7 text-white bg-red-500 p-1.5 rounded-full" />
                                                <div>
                                                    <span className="text-xs text-slate-500 block">
                                                        Cancellation Reason
                                                    </span>

                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {duty.cancellationReason}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {duty.cancellationReason && (
                                            <div className="mt-5 flex items-center gap-3">
                                                <Clock1 className="w-7 h-7 text-white bg-red-500 p-1.5 rounded-full" />
                                                <div>
                                                    <span className="text-xs text-slate-500 block">
                                                        Cancellation Time
                                                    </span>

                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {cancelledAt}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b my-5 border-gray-300" />

                                    <div className="flex flex-col lg:flex-row gap-5 justify-between items-center lg:items-center">

                                        <div className="flex gap-8">
                                            {duty.totalHours != null && (
                                                <div>
                                                    <p className="text-xs text-slate-500">
                                                        Total Hours
                                                    </p>

                                                    <p className="text-lg font-bold text-red-600">
                                                        {duty.totalHours.toFixed(2)} hrs
                                                    </p>
                                                </div>
                                            )}

                                            {duty.totalKm != null && (
                                                <span>
                                                    <p className="text-xs text-slate-500">
                                                        Total Km
                                                    </p>

                                                    <p className="text-lg font-bold text-green-600">
                                                        {duty.totalKm} km
                                                    </p>
                                                </span>
                                            )}
                                            {duty.approvedBy != null && (
                                                <span>
                                                    <p className="text-xs text-slate-500">
                                                        Approved By
                                                    </p>

                                                    <p className="text-lg font-bold text-blue-700">
                                                        {duty.approvedBy}
                                                    </p>
                                                </span>
                                            )}

                                        </div>


                                        <div className="flex flex-wrap gap-3 p-3 ">


                                            {duty.status === DutyStatus.Pending && (
                                                <button
                                                    onClick={() =>
                                                        handleStart(
                                                            duty.dutyId
                                                        )
                                                    }
                                                    disabled={isActioning}
                                                    className="flex items-center gap-2 text-white px-3 py-2 bg-red-400 rounded-md hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <PlayCircle className="w-5 h-5" />

                                                    {isActioning
                                                        ? "Starting..."
                                                        : "Start Duty"}
                                                </button>
                                            )}


                                            {duty.status === DutyStatus.InProgress && (
                                                <button
                                                    onClick={() =>
                                                        openEndModal(
                                                            duty.dutyId
                                                        )
                                                    }
                                                    disabled={isActioning}
                                                    className="flex items-center gap-2 text-white px-3 py-2 bg-red-400 rounded-md hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <StopCircle className="w-5 h-5" />

                                                    End Duty
                                                </button>
                                            )}


                                            {duty.status === DutyStatus.Completed && (
                                                <button
                                                    onClick={() =>
                                                        openApproveModal(
                                                            duty.dutyId
                                                        )
                                                    }
                                                    disabled={isActioning}
                                                    className="flex items-center gap-2 text-white px-3 py-2 bg-lime-600 rounded-md hover:bg-lime-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <CheckCircle className="w-5 h-5" />

                                                    Approve Duty
                                                </button>
                                            )}


                                            {(duty.status === DutyStatus.Pending ||
                                                duty.status ===
                                                DutyStatus.InProgress) && (
                                                    <button
                                                        onClick={() =>
                                                            openCancelModal(
                                                                duty.dutyId
                                                            )
                                                        }
                                                        disabled={isActioning}
                                                        className="flex items-center gap-2 text-white px-3 py-2 bg-orange-500 rounded-md hover:bg-orange-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <XCircle className="w-5 h-5" />

                                                        Cancel Duty
                                                    </button>
                                                )}

                                            <button
                                                onClick={() =>
                                                    openDeleteModal(
                                                        duty.dutyId
                                                    )
                                                }
                                                disabled={isActioning}
                                                className="flex items-center gap-2 text-white px-3 py-2 bg-red-500 rounded-md hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Trash className="w-5 h-5" />

                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleGeneratePdf(duty.dutyId)
                                                }
                                                disabled={isLoading}
                                                className="flex items-center gap-2 text-white px-3 py-2 bg-red-500 rounded-md hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <FaFilePdf className="w-5 h-5" />

                                            </button>
                                        </div>

                                        <Link
                                            href={`/duty/get-single-duty/${duty.dutyId}`}
                                            className="group/button flex items-center gap-2 bg-linear-to-r from-red-400 to-red-900 hover:from-red-600 hover:to-red-900 text-white px-4 py-2 font-medium rounded-md shadow-lg transition-all duration-300"
                                        >
                                            View Details

                                            <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                                        </Link>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

                {modalType === "delete" && selectedDutyId && (
                    <MidModal
                        isOpen={true}
                        title="Delete Duty"
                        description="Are you sure you want to delete this duty? This action cannot be undone."
                        itemName={
                            selectedDuty
                                ? `${selectedDuty.fromLocation} → ${selectedDuty.toLocation}`
                                : ""
                        }
                        isDeleting={isDeleting}
                        onConfirm={() =>
                            handleDelete(selectedDutyId)
                        }
                        onClose={closeModal}
                    />
                )}


                {modalType === "end" && selectedDutyId && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={closeModal}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8"
                        >
                            <h2 className="text-xl font-bold text-slate-800 mb-5">
                                End Duty
                            </h2>

                            <div className="space-y-4">

                                <CustomInput
                                    label="Date In *"
                                    Icon={Calendar}
                                    type="date"
                                    className="custom-input w-full"
                                    value={
                                        endDutyData.dateIn
                                            ? new Date(
                                                endDutyData.dateIn
                                            )
                                                .toISOString()
                                                .split("T")[0]
                                            : ""
                                    }
                                    onChange={(v) =>
                                        setEndDutyData((prev) => ({
                                            ...prev,
                                            dateIn: new Date(v as Date),
                                        }))
                                    }
                                />

                                <CustomInput
                                    label="Odometer In (km) *"
                                    Icon={Gauge}
                                    type="number"
                                    className="custom-input w-full"
                                    placeholder="e.g 47500"
                                    value={
                                        endDutyData.killometerIn
                                    }
                                    onChange={(v) =>
                                        setEndDutyData((prev) => ({
                                            ...prev,
                                            killometerIn: Number(v),
                                        }))
                                    }
                                />

                                <CustomInput
                                    label="Remarks (optional)"
                                    Icon={FileText}
                                    type="text"
                                    className="custom-input w-full"
                                    value={
                                        endDutyData.remarks ?? ""
                                    }
                                    onChange={(v) =>
                                        setEndDutyData((prev) => ({
                                            ...prev,
                                            remarks: v,
                                        }))
                                    }
                                />
                            </div>

                            <div className="flex gap-3 mt-6">

                                <CustomButton
                                    buttonText="Cancel"
                                    buttonColor="bg-slate-200"
                                    buttonHoverColor="bg-slate-300"
                                    className="flex-1 text-slate-700 py-2.5 rounded-full"
                                    onClickFunction={closeModal}
                                />

                                <CustomButton
                                    buttonText={
                                        actioningDutyId ===
                                            selectedDutyId
                                            ? "Ending..."
                                            : "End Duty"
                                    }
                                    buttonColor="bg-green-600"
                                    buttonHoverColor="bg-green-700"
                                    className="flex-1 text-white py-2.5 rounded-full"
                                    onClickFunction={() =>
                                        handleEnd(
                                            selectedDutyId
                                        )
                                    }
                                    disabled={
                                        actioningDutyId ===
                                        selectedDutyId
                                    }
                                />

                            </div>
                        </div>
                    </div>
                )}


                {modalType === "approve" && selectedDutyId && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={closeModal}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8"
                        >
                            <h2 className="text-xl font-bold text-slate-800 mb-5">
                                Approve Duty
                            </h2>

                            <CustomInput
                                label="Approved By *"
                                Icon={User}
                                type="text"
                                className="custom-input w-full"
                                placeholder="Enter your name"
                                value={approvedBy}
                                onChange={(v) =>
                                    setApprovedBy(v)
                                }
                            />

                            <div className="flex gap-3 mt-6">

                                <CustomButton
                                    buttonText="Cancel"
                                    buttonColor="bg-slate-200"
                                    buttonHoverColor="bg-slate-300"
                                    className="flex-1 text-slate-700 py-2.5 rounded-full"
                                    onClickFunction={closeModal}
                                />

                                <CustomButton
                                    buttonText={
                                        actioningDutyId ===
                                            selectedDutyId
                                            ? "Approving..."
                                            : "Approve"
                                    }
                                    buttonColor="bg-purple-600"
                                    buttonHoverColor="bg-purple-700"
                                    className="flex-1 text-white py-2.5 rounded-full"
                                    onClickFunction={() =>
                                        handleApprove(
                                            selectedDutyId
                                        )
                                    }
                                    disabled={
                                        actioningDutyId ===
                                        selectedDutyId
                                    }
                                />

                            </div>
                        </div>
                    </div>
                )}


                {modalType === "cancel" && selectedDutyId && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={closeModal}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8"
                        >
                            <h2 className="text-xl font-bold text-slate-800 mb-5">
                                Cancel Duty
                            </h2>

                            <CustomInput
                                label="Cancellation Reason *"
                                Icon={FileText}
                                type="text"
                                className="custom-input w-full"
                                placeholder="Why is this duty being cancelled?"
                                value={cancelReason}
                                onChange={(v) =>
                                    setCancelReason(v)
                                }
                            />

                            <div className="flex gap-3 mt-6">

                                <CustomButton
                                    buttonText="Keep Duty"
                                    buttonColor="bg-slate-200"
                                    buttonHoverColor="bg-slate-300"
                                    className="flex-1 text-slate-700 py-2.5 rounded-full"
                                    onClickFunction={closeModal}
                                />

                                <CustomButton
                                    buttonText={
                                        actioningDutyId ===
                                            selectedDutyId
                                            ? "Cancelling..."
                                            : "Cancel Duty"
                                    }
                                    buttonColor="bg-orange-500"
                                    buttonHoverColor="bg-orange-600"
                                    className="flex-1 text-white py-2.5 rounded-full"
                                    onClickFunction={() =>
                                        handleCancel(
                                            selectedDutyId
                                        )
                                    }
                                    disabled={
                                        actioningDutyId ===
                                        selectedDutyId
                                    }
                                />

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default DutyList;
