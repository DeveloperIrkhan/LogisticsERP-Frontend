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
        <div className="min-h-screen bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Banner */}
                <div className="mb-10 px-4 py-7 rounded-t-2xl bg-linear-to-r from-red-400 to-red-900">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
                        <div>
                            <h1 className="text-3xl text-white font-extrabold">
                                Fuel Records
                            </h1>
                            <p className="mt-2 text-white text-lg">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {fuelRecords.map((fuel) => {
                            const fuelingDate = new Date(fuel.fuelingDate).toDateString();

                            return (
                                <div
                                    key={fuel.fuelId}
                                    className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                                >
                                    <div className="bg-linear-to-r p-2 from-red-400 to-red-900 group-hover:bg-linear-to-r group-hover:from-red-900 group-hover:to-red-400 duration-400 transition-colors">
                                        <div className="flex w-full items-center justify-between px-4">
                                            <p className="text-white/90 font-normal text-sm">
                                                {fuel.fuelType || "Fuel Entry"}
                                            </p>
                                            <span className="bg-white/20 px-2.5 py-1 text-white text-sm rounded-md">
                                                {fuel.isFullTank ? "Full Tank" : "Partial"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute top-0 right-0 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-40"></div>

                                    <div className="relative p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-800">
                                                    {fuel.stationName}
                                                </h2>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    {fuel.stationLocation || "Location not specified"}
                                                </p>
                                            </div>

                                            <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                                                <Droplet className="w-7 h-7" />
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-4">
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-3">
                                                    <User className="w-5 h-5 text-dark-color" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">
                                                            Driver Name
                                                        </p>
                                                        <p className="font-bold text-sm text-slate-800">
                                                            {fuel.driver?.fullName}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Car className="w-5 h-5 text-dark-color" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">
                                                            Vehicle
                                                        </p>
                                                        <p className="font-bold text-sm text-slate-800">
                                                            {fuel.vehicle?.modelName} 
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="w-5 h-5 text-dark-color" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">
                                                            Fueling Date
                                                        </p>
                                                        <p className="font-bold text-sm text-slate-800">
                                                            {fuelingDate}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Gauge className="w-5 h-5 text-dark-color" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">
                                                            Odometer
                                                        </p>
                                                        <p className="font-bold text-sm text-slate-800">
                                                            {fuel.odoMeterReading} km
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-3">
                                                    <FuelIcon className="w-5 h-5 text-dark-color" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">Liters</p>
                                                        <p className="font-bold text-sm text-slate-800">
                                                            {fuel.liters} L
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Banknote className="w-5 h-5 text-dark-color" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">
                                                            Cost / Liter
                                                        </p>
                                                        <p className="font-bold text-sm text-slate-800">
                                                            PKR {fuel.costPerLiter}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs text-slate-500">Total Cost</p>
                                                <p className="text-lg font-bold text-red-600">
                                                    PKR {fuel.totalCost.toLocaleString()}
                                                </p>
                                            </div>

                                            <Link
                                                href={`/fuel/get-fuel-by-id/${fuel.fuelId}`}
                                                className="group/button flex items-center gap-2 bg-linear-to-r 
                                                from-red-400 to-red-900
                                                hover:from-red-600 hover:to-red-900
                                                text-white px-4 py-2 font-medium rounded-md 
                                                shadow-lg transition-color duration-600"
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

export default FuelRecord;