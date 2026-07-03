"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

const MaintenanceList = () => {

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Banner */}
                <div className="mb-10 px-4 py-7 rounded-t-2xl bg-linear-to-r from-red-400 to-red-900">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
                        <div>
                            <h1 className="text-3xl text-white font-extrabold">
                                Maintenance Records
                            </h1>
                            <p className="mt-2 text-white text-lg">
                                Track all vehicle maintenance and service history
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Total Records</p>
                                <h2 className="text-3xl font-bold text-white">
                                </h2>
                            </div>
                            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
                                <p className="text-white text-sm">Total Cost</p>
                                <h2 className="text-3xl font-bold text-white">
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Button */}
                <div className="flex justify-end mb-6">
                    <Link
                        href="/dashboard/maintenance/create-maintenance"
                        className="flex items-center gap-2 bg-linear-to-r from-red-500 to-red-800 hover:from-red-600 hover:to-red-900 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add Maintenance Record
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default MaintenanceList;