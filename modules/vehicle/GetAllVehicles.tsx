"use client";
import Spinner from "@/components/Spinner";
import { getVehicles } from "@/modules/vehicle/api";
import { useEffect, useState } from "react";
import {
  Car,
  Calendar,
  ShieldCheck,
  DollarSign,
  ArrowRight,
  Building,
  HeartPulse,
  Truck,
} from "lucide-react";

import Link from "next/link";

const GetAllVehicles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState<any>([]);
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        const response = await getVehicles();
        setVehicles(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);
  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading && vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Car className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600">
          No Vehicles Found
        </h2>
      </div>
    );
  }

  if (!isLoading && vehicles.length > 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-100 via-red-50 to-slate-200 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-800">
                  Vehicle Management
                </h1>

                <p className="text-slate-500 mt-2 text-lg">
                  Manage and monitor all registered vehicles
                </p>
              </div>

              <div className="bg-white shadow-lg border border-slate-200 rounded-2xl px-6 py-4">
                <p className="text-slate-500 text-sm">Total Vehicles</p>

                <h2 className="text-3xl font-bold text-dark-color">
                  {vehicles.length}
                </h2>
              </div>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {vehicles.map((vehicle: any) => {
              const RegistrationExpiry = new Date(
                vehicle.registrationExpiry,
              ).toDateString();
              const InsuranceExpiry = new Date(
                vehicle.insuranceExpiry,
              ).toDateString();
              const fitnessExpiry = new Date(
                vehicle.fitnessExpiry,
              ).toDateString();
              return (
                <div
                  key={vehicle.vehicleId}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Top Gradient */}
                  <div className="h-4 bg-linear-to-r from-red-400 to-red-900 group-hover:bg-linear-to-r group-hover:from-red-900 group-hover:to-red-400 duration-400 transition-colors"></div>

                  {/* Decorative Blur */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-40"></div>

                  <div className="relative p-6">
                    {/* Vehicle Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          {vehicle.number}
                        </h2>

                        <p className="text-slate-500 uppercase tracking-wider mt-1">
                          {vehicle.company} {vehicle.modelName}
                        </p>
                      </div>

                      <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                        {vehicle.type === "Car" ? (
                          <Car className="w-7 h-7" />
                        ) : (
                          <Truck className="w-7 h-7" />
                        )}
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="mt-5">
                      <span className="bg-red-100 text-dark-coloto-gray-color text-sm font-semibold px-4 py-2 uppercase rounded-full">
                        {vehicle.type}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-dark-color" />
                        <div>
                          <p className="text-xs text-slate-500">
                            Purchased Cost
                          </p>

                          <p className="font-bold text-slate-800">
                            PRK-{vehicle.purchsedCast}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-dark-color" />
                          <div>
                            <p className="text-xs text-slate-500">Insured By</p>

                            <p className="font-bold text-slate-800">
                              {vehicle.insuredBy}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-5 h-5 text-dark-color" />
                          <div>
                            <p className="text-xs text-slate-500">
                              Insurance Expiry
                            </p>
                            <p className="font-bold text-slate-800">
                              {InsuranceExpiry}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-dark-color" />

                          <div>
                            <p className="text-xs text-slate-500">
                              Registration Expiry
                            </p>

                            <p className="font-bold text-slate-800">
                              {RegistrationExpiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <HeartPulse className="w-5 h-5 text-dark-color" />
                          <div>
                            <p className="text-xs text-slate-500">
                              Fitness Expiry
                            </p>
                            <p className="font-bold text-slate-800">
                              {fitnessExpiry}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-slate-500">Depreciation</p>

                        <p className="text-lg font-bold text-red-600">
                          PRK-{vehicle.depreciation}
                        </p>
                      </div>

                      <Link
                        href={`/vehicle/get-vehicle-by-id/${vehicle.vehicleId}`}
                        className="group/button flex items-center gap-2 bg-linear-to-r from-dark-color to-dark-color
                         hover:from-red-600 hover:to-red-900
                          text-white px-5 py-3 rounded-xl font-semibold 
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

          {vehicles.length === 0 && (
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
  }
};

export default GetAllVehicles;
