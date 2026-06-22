"use client";
import Spinner from "@/components/Spinner";
import { getVehiclesAsync } from "@/modules/vehicle/api";
import { useEffect, useState } from "react";
import { PiAmbulanceFill, PiJeepBold } from "react-icons/pi";
import {
  Car,
  Calendar,
  ShieldCheck,
  DollarSign,
  ArrowRight,
  Building,
  HeartPulse,
  Truck,
  User,
  FileText,
  Phone,
} from "lucide-react";

import Link from "next/link";
import { toast } from "react-toastify";
import PageTitlelCard from "@/components/Badge/PageTitlelCard";
import { FaMotorcycle, FaShuttleVan, FaTruckPickup } from "react-icons/fa";
import { BsBusFrontFill } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa";
import { IVehicleResponse } from "./types";

const GetAllVehicles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState<IVehicleResponse[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        const response = await getVehiclesAsync();
        if (response.success) {
          setVehicles(response.data);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
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
      <div className="flex h-screen flex-col items-center justify-center">
        <Car className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600">
          No Vehicles Found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <PageTitlelCard
            h2="Vehicle Management"
            p="Total Number of Registerd Vehicles in Pakistan Red Crecent Socity Fleet"
            boxTitle="Total Vehicles"
            Total={vehicles.length}
          />
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {vehicles.map((vehicle: any) => {
            const RegistrationExpiry = new Date(vehicle.registrationExpiry).toDateString();
            const InsuranceExpiry = new Date(vehicle.insuranceExpiry).toDateString();
            const fitnessExpiry = new Date(vehicle.fitnessExpiry).toDateString();

            const driverCount = vehicle.drivers?.length ?? 0;
            const documentCount = vehicle.documents?.length ?? 0;

            return (
              <div
                key={vehicle.vehicleId}
                className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Top Gradient */}
                <div className="bg-linear-to-r p-2 from-red-400 to-red-900 group-hover:bg-linear-to-r group-hover:from-red-900 group-hover:to-red-400 duration-400 transition-colors">
                  <div className="flex w-full items-center justify-between px-4">
                    <p className="text-white/90 font-medium text-lg">
                      Vehicle Status
                    </p>
                    <span className="bg-white/20 px-2.5 py-1 text-white rounded-md">
                      {vehicle.status}
                    </span>
                  </div>
                </div>

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
                      {vehicle.vehicleType === "Car" ? (
                        <FaCarSide className="w-7 h-7" />
                      ) : vehicle.vehicleType === "Jeep" ? (
                        <PiJeepBold className="w-7 h-7" />
                      ) : vehicle.vehicleType === "Ambulance" ? (
                        <PiAmbulanceFill className="w-7 h-7" />
                      ) : vehicle.vehicleType === "Pickup" ? (
                        <FaTruckPickup className="w-7 h-7" />
                      ) : vehicle.vehicleType === "Van" ? (
                        <FaShuttleVan className="w-7 h-7" />
                      ) : vehicle.vehicleType === "Bus" ? (
                        <BsBusFrontFill className="w-7 h-7" />
                      ) : vehicle.vehicleType === "Motorcycle" ? (
                        <FaMotorcycle className="w-7 h-7" />
                      ) : (
                        <Truck className="w-7 h-7" />
                      )}
                    </div>
                  </div>

                  {/* Type Badge + Driver/Document count badges */}
                  <div className="mt-5 flex items-center justify-around gap-2 flex-wrap">
                    <span className="bg-red-100 text-dark-coloto-gray-color text-sm font-semibold px-4 py-2 uppercase rounded-full">
                      {vehicle.vehicleType}
                    </span>

                    <div className="flex text-sm bg-lime-100 text-lima-400 p-2 gap-3 rounded-2xl">
                      <User className="w-5 h-5" />
                      {driverCount} Driver{driverCount !== 1 ? "s" : ""}
                    </div>

                    {/* <span className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-2 rounded-full border border-green-100"> */}
                    <div className="flex text-sm bg-blue-100 text-blue-400 p-2 gap-3 rounded-2xl">
                      <FileText className="w-5 h-5" />
                      {documentCount} Doc{documentCount !== 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-dark-color" />
                      <div>
                        <p className="text-xs text-slate-500">Purchased Cost</p>

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
                      className="group/button flex items-center gap-2 bg-linear-to-r 
                        from-red-400 to-red-900
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
};

export default GetAllVehicles;
