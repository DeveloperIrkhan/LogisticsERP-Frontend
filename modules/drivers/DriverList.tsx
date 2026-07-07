"use client";
import Spinner from "@/components/Spinner";
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
  Phone,
} from "lucide-react";

import { toast } from "react-toastify";
import Link from "next/link";
import { DriverStatus, IDriverResponseDto } from "@/modules/drivers/types";
import { getDriversAsync } from "@/modules/drivers/api";
import Image from "next/image";
import { images } from "@/public/images";
import PageTitlelCard from "@/components/Badge/PageTitlelCard";
import DriverCard from "./DriverCard";
const GetAllDrivers = () => {
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
    <div className="min-h-screen bg-linear-to-br bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <PageTitlelCard
            h2="Driver Management"
            p="Total Number of Registerd Drivers in Pakistan Red Crecent Socity Fleet"
            boxTitle="Total Drivers"
            Total={drivers.length}
          />

        </div>

        {/* Vehicle Grid */}
        <DriverCard drivers={drivers} />

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

export default GetAllDrivers;
