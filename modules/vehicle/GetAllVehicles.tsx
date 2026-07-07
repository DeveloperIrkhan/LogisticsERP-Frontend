"use client";
import Spinner from "@/components/Spinner";
import { getVehiclesAsync } from "@/modules/vehicle/api";
import { useEffect, useState } from "react";
import {
  Car,
  Calendar,
  ShieldCheck,
  DollarSign,
  ArrowRight,
  Building,
  HeartPulse,
  User,
  FileText,
} from "lucide-react";

import Link from "next/link";
import { toast } from "react-toastify";
import PageTitlelCard from "@/components/Badge/PageTitlelCard";
import { IVehicleResponse } from "./types";
import VehicleType from "@/components/VehicleType";
import VehicleCard from "./VehicleCard";

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
          {vehicles.map((vehicle: IVehicleResponse) => {
            return <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} />;
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
