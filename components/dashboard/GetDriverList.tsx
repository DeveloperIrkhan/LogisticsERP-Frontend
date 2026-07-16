
"use client";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import {
    Car,
    Calendar,
    ArrowRight,
    Truck,
    Phone,
} from "lucide-react";

import { toast } from "react-toastify";
import Link from "next/link";
import { IDriverResponseDto } from "@/modules/drivers/types";
import { getDriversAsync } from "@/modules/drivers/api";
import Image from "next/image";
import { images } from "@/public/images";
const GetDriverList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [drivers, setDrivers] = useState<IDriverResponseDto[]>([]);
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                setIsLoading(true);
                const response = await getDriversAsync();
                console.log(response.data);
                if (response.success) {
                    setDrivers(response.data);
                    toast.success(response.message);
                }
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDrivers();
    }, []);
    if (isLoading) {
        return <Spinner />;
    }

    if (!isLoading && drivers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <Car className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600">
                    No Vehicles Found
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br bg-white w-full p-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
                    {drivers.map((driver: IDriverResponseDto) => {
                        const dateOfJoining = new Date(driver.dateOfJoining).toDateString();
                        const licenseExpiry = new Date(driver.licenseExpiry).toDateString();
                        const licenseExpired = new Date(driver.licenseExpiry) < new Date();

                        return (
                            <div
                                key={driver.driverId}
                                className="shadow-xl rounded-2xl bg-gray-100 border-stone-200 border p-5 transition-shadow hover:shadow-md"
                            >
                                <div className="flex items-start gap-4">
                                    <Image
                                        src={driver.photoUrl?.trim() ? driver.photoUrl
                                            : images.profile}
                                        className="w-16 h-16 rounded-full object-cover border border-stone-200"
                                        height={64}
                                        width={64}
                                        alt=""
                                    />
                                    <div className="flex-1 flex items-start justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-800">
                                                {driver.fullName}
                                            </h2>
                                            <p className="font-mono text-xs text-slate-500 mt-0.5">
                                                {driver.cnic}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap ${licenseExpired
                                                ? "bg-red-50 text-red-700"
                                                : driver.status === "Active"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-slate-100 text-slate-500"
                                                }`}
                                        >
                                            {licenseExpired ? "License expired" : driver.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Meta row: license type + number, plain text, no pills */}
                                <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                                    <span className="flex items-center gap-1.5">
                                        {driver.typeOfLicence === "LTV" ? (
                                            <Car className="w-3.5 h-3.5" />
                                        ) : (
                                            <Truck className="w-3.5 h-3.5" />
                                        )}
                                        {driver.typeOfLicence}
                                    </span>
                                    <span className="font-mono">{driver.licenseNumber}</span>
                                </div>

                                {/* Details — stacked rows, label left / value right */}
                                <div className="mt-3 pt-3 border-t border-stone-200 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-xs text-slate-400">
                                            <Calendar className="w-3.5 h-3.5" />
                                            Date of Joining
                                        </span>
                                        <span className="text-sm font-medium text-slate-700">
                                            {dateOfJoining}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`flex items-center gap-2 text-xs ${licenseExpired ? "text-red-600" : "text-slate-400"
                                                }`}
                                        >
                                            <Calendar className="w-3.5 h-3.5" />
                                            Licence Expiry
                                        </span>
                                        <span
                                            className={`font-mono text-sm font-medium ${licenseExpired ? "text-red-600 font-semibold" : "text-slate-700"
                                                }`}
                                        >
                                            {licenseExpiry}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-xs text-slate-400">
                                            <Phone className="w-3.5 h-3.5" />
                                            Contact #
                                        </span>
                                        <span className="font-mono text-sm font-semibold text-slate-800">
                                            {driver.mobileNumber}
                                        </span>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-3 pt-3 border-t border-stone-200 flex justify-end">
                                    <Link
                                        href={`/dashboard/drivers/get-driver-info/${driver.driverId}`}
                                        className="group/button flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-800"
                                    >
                                        get full deails
                                        <ArrowRight className="w-3.5 h-3.5 group-hover/button:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {drivers.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-slate-200">
                        <div className="bg-red-100 text-red-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <Car className="w-12 h-12" />
                        </div>

                        <h2 className="text-3xl font-bold text-slate-800 mt-6">
                            No Vehicles Found
                        </h2>

                        <p className="text-slate-500 mt-3 text-lg">
                            There are currently no vehicles available.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetDriverList;

