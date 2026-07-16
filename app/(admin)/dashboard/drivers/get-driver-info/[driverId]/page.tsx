"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    User, Phone, Mail, MapPin, Calendar, BadgeInfo, Car, Activity, DollarSign, Edit, Trash, CheckCircle, XCircle, Clock, Gauge, ArrowRight, Shield,
} from "lucide-react";
import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import { images } from "@/public/images";
import MidModal from "@/components/Modals/MidModal";
import {
    getDriverByIdAsync,
    deleteDriverAsync,
    changeStatusAsync,
    getDutyStatsAsync,
    isDriverAvailableAsync,
} from "@/modules/drivers/api";
import { IDriverResponseDto, IDriverDutyStatsDto, DriverStatus } from "@/modules/drivers/types";

const DriverInfoPage = () => {
    const params = useParams();
    const router = useRouter();
    const driverId = params?.driverId as string;

    const [isLoading, setIsLoading] = useState(false);
    const [driver, setDriver] = useState<IDriverResponseDto | null>(null);
    const [dutyStats, setDutyStats] = useState<IDriverDutyStatsDto | null>(null);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

    // Modal / action states
    const [deleteModal, setDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isChangingStatus, setIsChangingStatus] = useState(false);

    const fetchAll = async () => {
        try {
            setIsLoading(true);
            const [driverRes, statsRes, availRes] = await Promise.all([
                getDriverByIdAsync(driverId),
                getDutyStatsAsync(driverId),
                isDriverAvailableAsync(driverId),
            ]);

            if (driverRes.success) setDriver(driverRes.data);
            else toast.error(driverRes.message);

            if (statsRes.success) setDutyStats(statsRes.data);
            if (availRes.success) setIsAvailable(availRes.data);
        } catch {
            toast.error("Failed to load driver information.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!driverId) return;
        fetchAll();
    }, [driverId]);

    // ── Delete ────────────────────────────────────────────────
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const res = await deleteDriverAsync(driverId);
            if (res.success) {
                toast.success("Driver deleted successfully!");
                router.push("/dashboard/drivers");
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

    // ── Change Status ─────────────────────────────────────────
    const handleStatusChange = async (status: DriverStatus) => {
        try {
            setIsChangingStatus(true);
            const res = await changeStatusAsync(driverId, status);
            if (res.success) {
                toast.success(`Driver status changed to ${status}!`);
                setDriver((prev) => prev ? { ...prev, status } : prev);
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsChangingStatus(false);
        }
    };

    if (isLoading) {
        return (
            <Container className="flex justify-center items-center min-h-[70vh]">
                <Spinner />
            </Container>
        );
    }

    if (!driver) {
        return (
            <Container className="flex justify-center items-center min-h-[70vh]">
                <p className="text-xl text-red-500 font-semibold">Driver not found</p>
            </Container>
        );
    }

    const licenseExpiry = new Date(driver.licenseExpiry).toDateString();
    const dateOfJoining = new Date(driver.dateOfJoining).toDateString();
    const isActive = driver.status === DriverStatus.Active;

    const infoCards = [
        { label: "CNIC", value: driver.cnic, icon: Shield },
        { label: "Mobile Number", value: driver.mobileNumber, icon: Phone },
        { label: "Email", value: driver.email, icon: Mail },
        { label: "Address", value: driver.address, icon: MapPin },
        { label: "License Number", value: driver.licenseNumber, icon: BadgeInfo },
        { label: "License Type", value: driver.typeOfLicence, icon: Car },
        { label: "License Expiry", value: licenseExpiry, icon: Calendar },
        { label: "Date of Joining", value: dateOfJoining, icon: Calendar },
        { label: "Description", value: driver.description, icon: BadgeInfo },
        {
            label: "Vehicle Assigned",
            value: driver.vehicleId || "Not Assigned",
            icon: Car,
        },
    ];

    return (
        <div className="w-full h-full p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                    <div className="bg-linear-to-r from-red-600 via-red-700 to-red-900 p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <Image
                                    src={driver.photoUrl ?? images.NoProfile}
                                    alt={driver.fullName}
                                    width={100}
                                    height={100}
                                    className="rounded-2xl border-4 border-white/30 object-cover w-24 h-24"
                                />
                                <span
                                    className={`absolute -bottom-2 -right-2 text-xs font-bold px-2 py-1 rounded-full border-2 border-white ${isActive
                                        ? "bg-lime-600 text-white"
                                        : "bg-red-400 text-white"
                                        }`}
                                >
                                    {driver.status}
                                </span>
                            </div>

                            <div className="flex-1">
                                <h1 className="text-4xl font-extrabold text-white tracking-wide">
                                    {driver.fullName}
                                </h1>
                                <p className="text-red-100 mt-1 text-sm break-all">
                                    {driver.driverId}
                                </p>
                                <div className="flex items-center gap-4 mt-3 flex-wrap">
                                    <span className="flex items-center gap-1.5 bg-white/20 text-white text-sm px-3 py-1.5 rounded-full">
                                        <BadgeInfo className="w-4 h-4" />
                                        {driver.typeOfLicence}
                                    </span>
                                    <span
                                        className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-semibold ${isAvailable === true
                                            ? "bg-green-100 text-green-700"
                                            : isAvailable === false
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-slate-100 text-slate-500"
                                            }`}
                                    >
                                        <Clock className="w-4 h-4" />
                                        {isAvailable === true
                                            ? "Available"
                                            : isAvailable === false
                                                ? "On Duty"
                                                : "Checking..."}
                                    </span>
                                </div>
                            </div>

                            {/* License image */}
                            {driver.licenseUrl && (
                                <div className="shrink-0">
                                    <p className="text-red-100 text-xs mb-1">License</p>
                                    <Image
                                        src={driver.licenseUrl}
                                        alt="License"
                                        width={120}
                                        height={80}
                                        className="rounded-xl border-2 border-white/30 object-cover w-32 h-20"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Action Buttons ─────────────────────────────── */}
                    <div className="p-5 border-b border-slate-100">
                        <div className="flex flex-wrap gap-3">
                            {/* Activate / Deactivate */}
                            {isActive ? (
                                <button
                                    onClick={() => handleStatusChange(DriverStatus.Inactive)}
                                    disabled={isChangingStatus}
                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md disabled:opacity-50 transition-colors"
                                >
                                    <XCircle className="w-5 h-5" />
                                    Deactivate Driver
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleStatusChange(DriverStatus.Active)}
                                    disabled={isChangingStatus}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md disabled:opacity-50 transition-colors"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    Activate Driver
                                </button>
                            )}

                            {/* Assign Vehicle */}
                            <Link
                                href={`/driver/assign-driver/${driverId}`}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-colors"
                            >
                                <Car className="w-5 h-5" />
                                Assign Vehicle
                            </Link>

                            {/* Edit */}
                            <Link
                                href={`/driver/update-driver/${driverId}`}
                                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-600 text-slate-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all"
                            >
                                <Edit className="w-5 h-5" />
                                Edit Driver
                            </Link>

                            {/* Delete */}
                            <button
                                onClick={() => setDeleteModal(true)}
                                className="flex items-center gap-2 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all"
                            >
                                <Trash className="w-5 h-5" />
                                Delete Driver
                            </button>
                        </div>
                    </div>

                    {/* ── Info Grid ──────────────────────────────────── */}
                    <div className="p-6 md:p-10">
                        <h2 className="text-lg font-bold text-slate-700 mb-5">
                            Driver Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
                            {infoCards.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-2xl border border-red-200 
                                        bg-linear-to-br from-red-50 to-rose-100 p-5 
                                         hover:bg-linear-to-bl hover:from-rose-50 hover:to-rose-100
                                        shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="flex gap-4">
                                            {/* <div className="bg-red-100 text-red-600 p-3 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                                                <Icon className="w-5 h-5" />
                                            </div> */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                                                    {item.label}
                                                </p>
                                                <p className="text-sm font-normal text-gray-800 mt-0.5 truncate">
                                                    {item.value || "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Duty Stats Card ──────────────────────────────── */}
                {dutyStats && (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-100 text-red-600 p-3 rounded-2xl">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">
                                        Duty Statistics
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Lifetime duty performance
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={`/dashboard/duty/get-duties?driverId=${driverId}`}
                                className="flex items-center gap-2 text-sm text-red-600 font-semibold hover:text-red-800 transition-colors"
                            >
                                View All Duties
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                                <p className="text-xs text-slate-500 uppercase tracking-wide">
                                    Total Duties
                                </p>
                                <p className="text-3xl font-bold text-slate-800 mt-1">
                                    {dutyStats.totalDuties}
                                </p>
                            </div>
                            <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-100">
                                <p className="text-xs text-green-600 uppercase tracking-wide">
                                    Completed
                                </p>
                                <p className="text-3xl font-bold text-green-700 mt-1">
                                    {dutyStats.completedDuties}
                                </p>
                            </div>
                            <div className="bg-red-50 rounded-2xl p-4 text-center border border-red-100">
                                <p className="text-xs text-red-500 uppercase tracking-wide">
                                    Missed
                                </p>
                                <p className="text-3xl font-bold text-red-600 mt-1">
                                    {dutyStats.missedDuties}
                                </p>
                            </div>
                            <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
                                <p className="text-xs text-blue-600 uppercase tracking-wide">
                                    Currently On Duty
                                </p>
                                <p className="text-3xl font-bold text-blue-700 mt-1">
                                    {dutyStats.currentlyOnDuty}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                                    <Gauge className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Total Km Driven</p>
                                    <p className="text-lg font-bold text-slate-800">
                                        {dutyStats.totalKmDriven.toLocaleString()} km
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Total Hours</p>
                                    <p className="text-lg font-bold text-slate-800">
                                        {dutyStats.totalHours.toFixed(2)} hrs
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Last Duty</p>
                                    <p className="text-lg font-bold text-slate-800">
                                        {dutyStats.lastDutyDate
                                            ? new Date(dutyStats.lastDutyDate).toDateString()
                                            : "No duties yet"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Completion rate bar */}
                        {dutyStats.totalDuties > 0 && (
                            <div className="mt-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-500 font-medium">
                                        Completion Rate
                                    </span>
                                    <span className="font-bold text-slate-700">
                                        {Math.round(
                                            (dutyStats.completedDuties / dutyStats.totalDuties) * 100,
                                        )}
                                        %
                                    </span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-3">
                                    <div
                                        className="bg-linear-to-r from-red-500 to-red-700 h-3 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.round((dutyStats.completedDuties / dutyStats.totalDuties) * 100)}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Quick Links Card ─────────────────────────────── */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
                    <h2 className="text-lg font-bold text-slate-800 mb-5">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            {
                                label: "View Assigned Duties",
                                href: `/dashboard/duty/get-duties?driverId=${driverId}`,
                                icon: Clock,
                                color: "bg-blue-50 text-blue-600 hover:bg-blue-600",
                            },
                            {
                                label: "View Fuel Records",
                                href: `/dashboard/fuel/get-fuel?driverId=${driverId}`,
                                icon: Activity,
                                color: "bg-green-50 text-green-600 hover:bg-green-600",
                            },
                            {
                                label: "Assign New Duty",
                                href: `/dashboard/duty/create-duty`,
                                icon: Calendar,
                                color: "bg-purple-50 text-purple-600 hover:bg-purple-600",
                            },
                            {
                                label: "Assign Vehicle",
                                href: `/driver/assign-driver/${driverId}`,
                                icon: Car,
                                color: "bg-orange-50 text-orange-600 hover:bg-orange-600",
                            },
                            {
                                label: "Edit Driver Info",
                                href: `/driver/update-driver/${driverId}`,
                                icon: Edit,
                                color: "bg-slate-50 text-slate-600 hover:bg-slate-600",
                            },
                            {
                                label: "View All Drivers",
                                href: `/driver/get-all-driver`,
                                icon: User,
                                color: "bg-red-50 text-red-600 hover:bg-red-600",
                            },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className={`group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 ${item.color} hover:text-white transition-all duration-300 shadow-sm hover:shadow-md`}
                                >
                                    <div className="p-2.5 rounded-xl bg-white/60 group-hover:bg-white/20 transition-colors">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-sm">{item.label}</span>
                                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Delete Modal ──────────────────────────────────── */}
            <MidModal
                isOpen={deleteModal}
                title="Delete Driver"
                description="Are you sure you want to delete this driver? All duty records and assignments will be affected. This action cannot be undone."
                itemName={driver.fullName}
                isDeleting={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setDeleteModal(false)}
            />
        </div>
    );
};

export default DriverInfoPage;