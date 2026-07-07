"use client";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import {
    Fuel as FuelIcon,
    Calendar,
    Gauge,
    Banknote,
    ArrowRight,
    Plus,
    Droplet,
    User,
    Car,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import { getAllFuelAsync } from "./api";
import { IFuelResponseDto } from "./types";
import FuelCard from "./FuelCard";

const FuelRecord = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [fuelRecords, setFuelRecords] = useState<IFuelResponseDto[]>([]);

    useEffect(() => {
        const fetchFuel = async () => {
            try {
                setIsLoading(true);
                const response = await getAllFuelAsync();
                if (response.success) {
                    setFuelRecords(response.data);
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching fuel records:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFuel();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    const totalLiters = fuelRecords.reduce((sum, f) => sum + f.liters, 0);
    const totalCost = fuelRecords.reduce((sum, f) => sum + f.totalCost, 0);

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <div className="flex bg-linear-to-r from-red-500 to-red-800 p-5 rounded-md flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
                        <div className="flex flex-col lg:flex-row justify-between w-full items-center gap-5">
                            <div className="">
                                <h1 className="text-2xl capitalize font-bold tracking-widest text-white">
                                    Fuel Records
                                </h1>
                                <p className="text-white/70 mt-2 text-lg">
                                    Track fuel consumption and costs across the fleet
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                    <p className="text-white text-sm">Total Records</p>
                                    <h2 className="text-3xl font-bold text-white">
                                        {fuelRecords.length}
                                    </h2>
                                </div>
                                <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                    <p className="text-white text-sm">Total Liters</p>
                                    <h2 className="text-3xl font-bold text-white">
                                        {totalLiters.toFixed(0)} L
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
                </div>
                {/* Add Fuel Button */}
                <div className="flex justify-end mb-6">
                    <Link
                        href="/fuel/add-fuel"
                        className="flex items-center gap-2 bg-linear-to-r from-red-500 to-red-800 hover:from-red-600 hover:to-red-900 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add Fuel Entry
                    </Link>
                </div>

                {/* Empty state */}
                {fuelRecords.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-slate-200">
                        <div className="bg-red-100 text-red-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <FuelIcon className="w-12 h-12" />
                        </div>

                        <h2 className="text-3xl font-bold text-slate-800 mt-6">
                            No Fuel Records Found
                        </h2>

                        <p className="text-slate-500 mt-3 text-lg">
                            There are currently no fuel entries recorded.
                        </p>
                    </div>
                )}

                {/* Fuel Grid */}
                {fuelRecords.length > 0 && (
                    <FuelCard fuel={fuelRecords} />
                )}
            </div>
        </div>
    );
};

export default FuelRecord;