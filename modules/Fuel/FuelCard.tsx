import React from 'react'
import { IFuelResponseDto } from './types';
import { ArrowRight, Calendar, DollarSign, Droplet, FuelIcon, User } from 'lucide-react';
import { CiLocationOn } from 'react-icons/ci';
import Link from 'next/link';
import { FaCarSide } from 'react-icons/fa';

interface FuelCardProps {
    fuel: IFuelResponseDto[];
}
const FuelCard = ({ fuel }: FuelCardProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {fuel.map((fuelItem: IFuelResponseDto) => {

                return (
                    <div
                        key={fuelItem.fuelId}
                        className="shadow-xl rounded-2xl bg-red-100 border-stone-200 border p-5 transition-shadow hover:shadow-md"
                    >
                        {/* Header: photo, name, status */}
                        <div className="flex items-start gap-4">
                            <div className="flex-1 flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">
                                        {fuelItem.fuelType || "Fuel Entry"}
                                    </h2>
                                    <p className="font-mono text-xs text-slate-500 mt-0.5">
                                        {fuelItem.isFullTank ? "Full Tank" : "Partial"}
                                    </p>
                                </div>
                                <div className="flex gap-1.5 items-center">
                                    <CiLocationOn className="w-7 h-7" />

                                    <span
                                        className="text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap ${licenseExpired
                                                bg-red-50 text-red-700">
                                        {fuelItem.stationLocation || "Location not specified"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Meta row: license type + number, plain text, no pills */}
                        <div className="flex items-center justify-between gap-4 mt-4 text-xs text-slate-500">
                            <div className="flex flex-row items-center gap-4">
                                <span className="flex items-center gap-1.5">
                                    <User className="w-7 h-7" />
                                </span>
                                <span className="font-mono">{fuelItem.driver?.fullName}</span>
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <span className="flex items-center gap-1.5">
                                    <FaCarSide className="w-7 h-7" />
                                </span>
                                <span className="font-mono">{fuelItem.vehicle?.modelName}</span>
                            </div>
                        </div>

                        {/* Details — stacked rows, label left / value right */}
                        <div className="mt-3 pt-3 border-t border-stone-200 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-xs text-slate-400">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Fueling Date
                                </span>
                                <span className="text-sm font-medium text-slate-700">
                                    {fuelItem.fuelingDate ? new Date(fuelItem.fuelingDate).toDateString() : "N/A"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-xs text-slate-400">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Odometer Reading
                                </span>
                                <span className="text-sm font-medium text-slate-700">
                                    {fuelItem.odoMeterReading !== undefined ? fuelItem.odoMeterReading.toLocaleString() : "N/A"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-xs text-slate-400">
                                    <FuelIcon className="w-3.5 h-3.5" />
                                    Liters
                                </span>
                                <span className="text-sm font-medium text-slate-700">
                                    {fuelItem.liters !== undefined ? fuelItem.liters.toLocaleString() : "N/A"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-xs text-slate-400">
                                    <DollarSign className="w-3.5 h-3.5" />
                                    Cost/Litters
                                </span>
                                <span className="text-sm font-medium text-slate-700">
                                    {fuelItem.costPerLiter !== undefined ? fuelItem.costPerLiter.toLocaleString() : "N/A"}
                                </span>
                            </div>


                            <div>
                                <p className="text-xs text-slate-500">Total Cost</p>
                                <p className="text-lg font-bold text-red-600">
                                    PKR {fuelItem.totalCost.toLocaleString()}
                                </p>
                            </div>




                        </div>

                        {/* Footer */}
                        <div className="mt-3 pt-3 border-t border-stone-200 flex justify-end">
                            <Link
                                href={`/fuel/get-fuel-by-id/${fuelItem.fuelId}`}
                                className="group/button flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-800"
                            >
                                View Details
                                <ArrowRight className="w-3.5 h-3.5 group-hover/button:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default FuelCard
