"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Clock,
    MapPin,
    User,
    Truck,
    FileText,
    Calendar,
    Gauge,
    Edit,
    Trash,
    PlayCircle,
    StopCircle,
    CheckCircle,
    XCircle,
    Heart,
} from "lucide-react";
import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { toast } from "react-toastify";
import {
    getDutyByIdAsync,
    deleteDutyAsync,
    startDutyAsync,
    endDutyAsync,
    approveDutyAsync,
    cancelDutyAsync,
} from "@/modules/duty/api";
import {
    IDutyResponseDto,
    IEndDutyDto,
    DutyStatus,
    getDutyStatusStyle,
    getDutyTypeStyle,
} from "@/modules/duty/dutyTypes";
import MidModal from "@/components/Modals/MidModal";
import CustomInput from "@/components/CustomInput";

const GetDutyById = () => {
    const params = useParams();
    const router = useRouter();
    const dutyId = params?.dutyId as string;

    const [isLoading, setIsLoading] = useState(false);
    const [duty, setDuty] = useState<IDutyResponseDto | null>(null);

    // Modal states
    const [deleteModal, setDeleteModal] = useState(false);
    const [endModal, setEndModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);
    const [approveModal, setApproveModal] = useState(false);

    // Action states
    const [isDeleting, setIsDeleting] = useState(false);
    const [isActioning, setIsActioning] = useState(false);

    // Input states
    const [endDutyData, setEndDutyData] = useState<IEndDutyDto>({
        dateIn: new Date(),
        killometerIn: 0,
        remarks: "",
    });
    const [cancelReason, setCancelReason] = useState("");
    const [approvedBy, setApprovedBy] = useState("");

    const fetchDuty = async () => {
        try {
            setIsLoading(true);
            const response = await getDutyByIdAsync(dutyId);
            if (response.success) {
                setDuty(response.data);
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error("Failed to load duty.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!dutyId) return;
        fetchDuty();
    }, [dutyId]);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const res = await deleteDutyAsync(dutyId);
            if (res.success) {
                toast.success("Duty deleted successfully!");
                router.push("/duty/get-duties");
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsDeleting(false);
            setDeleteModal(false);
        }
    };

    const handleStart = async () => {
        try {
            setIsActioning(true);
            const res = await startDutyAsync(dutyId);
            if (res.success) {
                toast.success(res.message || "Duty started!");
                setDuty(res.data);
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsActioning(false);
        }
    };

    const handleEnd = async () => {
        try {
            setIsActioning(true);
            const res = await endDutyAsync(dutyId, endDutyData);
            if (res.success) {
                toast.success(res.message || "Duty ended!");
                setDuty(res.data);
                setEndModal(false);
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsActioning(false);
        }
    };

    const handleApprove = async () => {
        if (!approvedBy.trim()) {
            toast.error("Please enter approver name.");
            return;
        }
        try {
            setIsActioning(true);
            const res = await approveDutyAsync(dutyId, approvedBy);
            if (res.success) {
                toast.success(res.message || "Duty approved!");
                setDuty(res.data);
                setApproveModal(false);
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsActioning(false);
        }
    };

    const handleCancel = async () => {
        if (!cancelReason.trim()) {
            toast.error("Please enter cancellation reason.");
            return;
        }
        try {
            setIsActioning(true);
            const res = await cancelDutyAsync(dutyId, cancelReason);
            if (res.success) {
                toast.success(res.message || "Duty cancelled!");
                setDuty(res.data);
                setCancelModal(false);
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsActioning(false);
        }
    };

    if (isLoading) {
        return (
            <Container className="flex justify-center items-center min-h-[70vh]">
                <Spinner />
            </Container>
        );
    }

    if (!duty) {
        return (
            <Container className="flex justify-center items-center min-h-[70vh]">
                <p className="text-xl text-red-500 font-semibold">Duty not found</p>
            </Container>
        );
    }

    const details = [
        { label: "Vehicle ID", value: duty.vehicleId, icon: Truck },
        { label: "Driver ID", value: duty.driverId, icon: User },
        { label: "From Location", value: duty.fromLocation, icon: MapPin },
        { label: "To Location", value: duty.toLocation, icon: MapPin },
        { label: "Purpose", value: duty.purpose, icon: FileText },
        { label: "Officer Name", value: duty.officerName, icon: User },
        { label: "Duty Type", value: duty.dutyType, icon: Clock },
        {
            label: "Date Out",
            value: new Date(duty.dateOut).toDateString(),
            icon: Calendar,
        },
        {
            label: "Date In",
            value: duty.dateIn ? new Date(duty.dateIn).toDateString() : "-",
            icon: Calendar,
        },
        {
            label: "Odometer Out",
            value: duty.killometerOut != null && duty.killometerOut != undefined ?
                `${duty.killometerOut} km` : "-",
            icon: Gauge,
        },
        {
            label: "Odometer In",
            value: duty.killometerIn != null && duty.killometerIn != undefined ?
                `${duty.killometerIn} km` : "-",
            icon: Gauge,
        },
        {
            label: "Total Km",
            value: duty.totalKm != null && duty.totalKm != undefined ? `${duty.totalKm} km` : "-",
            icon: Gauge,
        },
        {
            label: "Total Hours",
            value: duty.totalHours != null && duty.totalHours != undefined
                ? `${duty.totalHours.toFixed(2)} hrs` : "-",
            icon: Clock,
        },
        { label: "Donor", value: duty.donor, icon: Heart },
        { label: "Remarks", value: duty.remarks, icon: FileText },
        { label: "Approved By", value: duty.approvedBy, icon: User },
        {
            label: "Cancellation Reason",
            value: duty.cancellationReason,
            icon: XCircle,
        },
    ];

    const isPending = duty.status === DutyStatus.Pending;
    const isInProgress = duty.status === DutyStatus.InProgress;
    const isCompleted = duty.status === DutyStatus.Completed;


    return (
        <Container className="py-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">

                    {/* Header */}
                    <div className="bg-linear-to-r from-red-600 via-red-700 to-red-900 p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                            <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                                <Clock className="w-12 h-12 text-white" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-4xl font-extrabold text-white tracking-wide">
                                    Duty Details
                                </h1>
                                <p className="text-red-100 mt-2 text-sm break-all">
                                    {duty.dutyId}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <span className={`text-sm font-bold px-4 py-2 rounded-xl border ${getDutyTypeStyle(duty.dutyType)}`}>
                                    {duty.dutyType}
                                </span>
                                <span className={`text-sm font-bold px-4 py-2 rounded-xl border ${getDutyStatusStyle(duty.status)}`}>
                                    {duty.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-100 md:p-10">

                        {/* ── Action Buttons ──────────────────────────── */}
                        <div className="flex flex-wrap gap-3 p-4 mb-6 bg- rounded-3xl shadow-md border border-slate-200">

                            {isPending && (
                                <button
                                    onClick={handleStart}
                                    disabled={isActioning}
                                    className="flex item-center gap-2 text-white px-2 py-1 bg-red-400 rounded-md hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <PlayCircle className="w-5 h-5" />
                                    Start Duty
                                </button>
                            )}

                            {isInProgress && (
                                <button
                                    onClick={() => setEndModal(true)}
                                    className="flex item-center gap-2 text-white px-2 py-1 bg-red-400 rounded-md hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <StopCircle className="w-5 h-5" />
                                    End Duty
                                </button>
                            )}

                            {isCompleted && (
                                <button
                                    onClick={() => setApproveModal(true)}
                                    className="flex item-center gap-2 text-white px-2 py-1 bg-red-400 rounded-md hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    Approve Duty
                                </button>
                            )}

                            {(isPending || isInProgress) && (
                                <button
                                    onClick={() => setCancelModal(true)}
                                    className="flex item-center gap-2 text-white px-2 py-1 bg-red-400 rounded-md hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <XCircle className="w-5 h-5" />
                                    Cancel Duty
                                </button>
                            )}

                            {/* Edit */}
                            <Link
                                href={`/duty/update/${duty.dutyId}`}
                                className="flex item-center gap-2 text-white px-2 py-1 bg-red-400 rounded-md hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Edit className="w-5 h-5" />
                                Edit
                            </Link>

                            {/* Delete */}
                            <button
                                onClick={() => setDeleteModal(true)}
                                className="flex item-center gap-2 text-white px-2 py-1 bg-red-400 rounded-md hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Trash className="w-5 h-5" />
                                Delete
                            </button>
                        </div>

                        {/* ── Details Grid ─────────────────────────────── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {details.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.label}
                                        className="group uppercase relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-gray-color to-slate-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-colors duration-300 duration-300"
                                    >
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gray-color rounded-full blur-3xl opacity-40"></div>
                                        <div className="relative flex gap-4">
                                            <div className="bg-red-100 text-red-600 p-4 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-500 font-medium">
                                                    {item.label}
                                                </p>
                                                <h3 className="text-lg font-bold text-slate-800 mt-1 warp-break-words">
                                                    {item.value || "-"}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ── Footer Banner ─────────────────────────────── */}
                        <div className="mt-10 rounded-3xl bg-linear-to-r from-red-600 to-red-900 p-8 shadow-xl">
                            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                                <div>
                                    <h2 className="text-3xl uppercase font-bold text-white">
                                        {duty.fromLocation} → {duty.toLocation}
                                    </h2>
                                    <p className="text-red-100 mt-2 text-lg">{duty.purpose}</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-lg px-8 py-5 rounded-2xl border border-white/20">
                                    <p className="text-red-100 text-sm">Status</p>
                                    <h3 className="text-2xl font-bold text-white">
                                        {duty.status}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Delete Modal ──────────────────────────────────── */}
            <MidModal
                isOpen={deleteModal}
                title="Delete Duty"
                description="Are you sure you want to delete this duty? This action cannot be undone."
                itemName={`${duty.fromLocation} → ${duty.toLocation}`}
                isDeleting={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setDeleteModal(false)}
            />

            {/* ── End Duty Modal ────────────────────────────────── */}
            {endModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
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
                                        ? new Date(endDutyData.dateIn).toISOString().split("T")[0]
                                        : ""
                                }
                                onChange={(v) =>
                                    setEndDutyData((p) => ({ ...p, dateIn: new Date(v) }))
                                }
                            />
                            <CustomInput
                                label="Odometer In (km) *"
                                Icon={Gauge}
                                type="number"
                                className="custom-input w-full"
                                placeholder="e.g 47500"
                                value={endDutyData.killometerIn}
                                onChange={(v) =>
                                    setEndDutyData((p) => ({ ...p, killometerIn: Number(v) }))
                                }
                            />
                            <CustomInput
                                label="Remarks (optional)"
                                Icon={FileText}
                                type="text"
                                className="custom-input w-full"
                                value={endDutyData.remarks ?? ""}
                                onChange={(v) =>
                                    setEndDutyData((p) => ({ ...p, remarks: v }))
                                }
                            />
                        </div>
                        <div className="flex gap-3 mt-6">
                            <CustomButton
                                buttonText="Cancel"
                                buttonColor="bg-slate-200"
                                buttonHoverColor="bg-slate-300"
                                className="flex-1 text-slate-700 py-2.5 rounded-full"
                                onClickFunction={() => setEndModal(false)}
                            />
                            <CustomButton
                                buttonText={isActioning ? "Ending..." : "End Duty"}
                                buttonColor="bg-green-600"
                                buttonHoverColor="bg-green-700"
                                className="flex-1 text-white py-2.5 rounded-full"
                                onClickFunction={handleEnd}
                                disabled={isActioning}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ── Approve Modal ─────────────────────────────────── */}
            {approveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
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
                            onChange={(v) => setApprovedBy(v)}
                        />
                        <div className="flex gap-3 mt-6">
                            <CustomButton
                                buttonText="Cancel"
                                buttonColor="bg-slate-200"
                                buttonHoverColor="bg-slate-300"
                                className="flex-1 text-slate-700 py-2.5 rounded-full"
                                onClickFunction={() => setApproveModal(false)}
                            />
                            <CustomButton
                                buttonText={isActioning ? "Approving..." : "Approve"}
                                buttonColor="bg-purple-600"
                                buttonHoverColor="bg-purple-700"
                                className="flex-1 text-white py-2.5 rounded-full"
                                onClickFunction={handleApprove}
                                disabled={isActioning}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ── Cancel Modal ──────────────────────────────────── */}
            {cancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
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
                            onChange={(v) => setCancelReason(v)}
                        />
                        <div className="flex gap-3 mt-6">
                            <CustomButton
                                buttonText="Keep Duty"
                                buttonColor="bg-slate-200"
                                buttonHoverColor="bg-slate-300"
                                className="flex-1 text-slate-700 py-2.5 rounded-full"
                                onClickFunction={() => setCancelModal(false)}
                            />
                            <CustomButton
                                buttonText={isActioning ? "Cancelling..." : "Cancel Duty"}
                                buttonColor="bg-orange-500"
                                buttonHoverColor="bg-orange-600"
                                className="flex-1 text-white py-2.5 rounded-full"
                                onClickFunction={handleCancel}
                                disabled={isActioning}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default GetDutyById;