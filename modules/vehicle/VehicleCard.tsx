import { ArrowRight, Building, Calendar, DollarSign, FileText, HeartPulse, ShieldCheck, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { IVehicleResponse } from './types'
import VehicleType from '@/components/VehicleType'

interface VehicleCardProps {
    vehicle: IVehicleResponse
}
const VehicleCard = ({ vehicle }: VehicleCardProps) => {

    const RegistrationExpiry = new Date(vehicle.registrationExpiry).toDateString();
    const InsuranceExpiry = new Date(vehicle.insuranceExpiry).toDateString();
    const fitnessExpiry = new Date(vehicle.fitnessExpiry).toDateString();

    const driverCount = vehicle.drivers?.length ?? 0;
    const documentCount = vehicle.documents?.length ?? 0;
    return (
        <div
            key={vehicle.vehicleId}
            className="shadow-xl rounded-2xl bg-red-100 border border-stone-200 p-5 transition-shadow hover:shadow-md"
        >
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="font-mono text-lg font-semibold text-slate-800">
                        {vehicle.number}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {vehicle.company} {vehicle.modelName}
                    </p>
                </div>
                <VehicleType vehicleType={vehicle.vehicleType} />
            </div>

            {/* Type badge + driver/document counts — plain, not colored pills */}
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                <span className="bg-stone-100 text-slate-600 font-medium px-2.5 py-1 uppercase rounded-md">
                    {vehicle.vehicleType}
                </span>

                <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {driverCount} Driver{driverCount !== 1 ? "s" : ""}
                </span>

                <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    {documentCount} Doc{documentCount !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Details — stacked rows, label left / mono value right */}
            <div className="mt-4 pt-4 border-t border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-400">
                        <DollarSign className="w-3.5 h-3.5" />
                        Purchased Cost
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-800">
                        PRK-{vehicle.purchsedCast}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-400">
                        <Building className="w-3.5 h-3.5" />
                        Insured By
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-800">
                        {vehicle.insuredBy}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Insurance Expiry
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-800">
                        {InsuranceExpiry}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        Registration Expiry
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-800">
                        {RegistrationExpiry}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-400">
                        <HeartPulse className="w-3.5 h-3.5" />
                        Fitness Expiry
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-800">
                        {fitnessExpiry}
                    </span>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-stone-200 flex justify-between items-center">
                <div>
                    <p className="text-xs text-slate-400">Depreciation</p>
                    <p className="font-mono text-sm font-semibold text-red-700">
                        PRK-{vehicle.depreciation}
                    </p>
                </div>

                <Link
                    href={`/vehicle/get-vehicle-by-id/${vehicle.vehicleId}`}
                    className="group/button flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-800"
                >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover/button:translate-x-0.5 transition-transform" />
                </Link>
            </div>
        </div>
    )
}

export default VehicleCard
