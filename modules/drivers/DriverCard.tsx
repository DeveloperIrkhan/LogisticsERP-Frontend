import React from 'react'
import { IDriverResponseDto } from './types';
import Image from 'next/image';
import { images } from '@/public/images';
import { ArrowRight, Calendar, Car, Phone, Truck } from 'lucide-react';
import Link from 'next/link';

interface DriverCardProps {
    drivers: IDriverResponseDto[];
}
const DriverCard = ({ drivers }: DriverCardProps) => {

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {drivers.map((driver: IDriverResponseDto) => {
                    const dateOfJoining = new Date(driver.dateOfJoining).toDateString();
                    const licenseExpiry = new Date(driver.licenseExpiry).toDateString();
                    const licenseExpired = new Date(driver.licenseExpiry) < new Date();

                    return (
                        <div
                            key={driver.driverId}
                            className="shadow-xl rounded-2xl bg-red-100 border-stone-200 border p-5 transition-shadow hover:shadow-md"
                        >
                            {/* Header: photo, name, status */}
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
                                    href={`/driver/get-driver-by-id/${driver.driverId}`}
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
        </div>
    )
}

export default DriverCard
