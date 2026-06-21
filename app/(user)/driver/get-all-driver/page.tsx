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
import { getDrivers } from "@/modules/drivers/api";
import Image from "next/image";
import { images } from "@/public/images";
const GetAllDrivers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [drivers, setDrivers] = useState<IDriverResponseDto[]>([]);
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setIsLoading(true);
        const response = await getDrivers();
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
    <div className="min-h-screen bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 px-4 py-7  rounded-t-2xl bg-linear-to-r from-red-400 to-red-900 ">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
            <div>
              <h1 className="text-3xl text-white font-extrabold">
                Drivers List
              </h1>

              <p className="mt-2 text-white text-lg">
                Manage and monitor all registered Drivers
              </p>
            </div>

            <div className="bg-white/20 shadow-lg border border-white/20 rounded-2xl px-6 py-4">
              <p className="text-white text-sm">Total Vehicles</p>
              <h2 className="text-3xl font-bold text-white">
                {drivers.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {drivers.map((driver: IDriverResponseDto) => {
            const dateOfJoining = new Date(driver.dateOfJoining).toDateString();

            const licenseExpiry = new Date(driver.licenseExpiry).toDateString();
            return (
              <div
                key={driver.driverId}
                className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="bg-linear-to-r p-2 from-red-400 to-red-900 group-hover:bg-linear-to-r group-hover:from-red-900 group-hover:to-red-400 duration-400 transition-colors">
                  <div className="flex w-full items-center justify-between px-4">
                    <p className="text-white/90 font-normal text-sm">
                      Driver Status
                    </p>
                    <span className="bg-white/20 lowercase px-2.5 py-1 text-white text-sm rounded-md">
                      {DriverStatus[driver.status]}
                    </span>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-40"></div>

                <div className="relative">
                  <div className="flex justify-center items-center rounded-lg">
                    <Image
                      src={driver.photoUrl ?? images.profile}
                      className="w-full h-70"
                      height={200}
                      width={200}
                      alt=""
                    />
                  </div>
                  <div className="p-6 flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">
                        {driver.fullName}
                      </h2>

                      <p className="text-sm text-black uppercase tracking-wider mt-1">
                        {driver.cnic}
                      </p>
                    </div>

                    <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                      {driver.typeOfLicence === "LTV" ? (
                        <Car className="w-7 h-7" />
                      ) : (
                        <Truck className="w-7 h-7" />
                      )}
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="mt-1 px-3 py-1 flex justify-between">
                    <span className="bg-red-100 text-dark-coloto-gray-color text-sm font-semibold px-4 py-2 uppercase rounded-full">
                      {driver.typeOfLicence}
                    </span>
                    <span className="bg-red-100 text-dark-coloto-gray-color text-sm font-semibold px-4 py-2 uppercase rounded-full">
                      {driver.licenseNumber}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="mt-1 px-3 py-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-dark-color" />
                      <div>
                        <p className="text-xs text-slate-500">
                          Date of Joining
                        </p>

                        <p className="font-medium text-sm text-slate-800">
                          {dateOfJoining}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-dark-color" />
                      <div>
                        <p className="text-xs text-slate-500">Licence Expiry</p>

                        <p className="font-medium text-sm text-slate-800">
                          {licenseExpiry}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-dark-color" />
                        <div>
                          <p className="text-xs text-slate-500">Contact #</p>

                          <p className="font-bold text-slate-800">
                            {driver.mobileNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 px-3 py-3 flex justify-between items-center">
                    <Link
                      href={`/driver/get-driver-by-id/${driver.driverId}`}
                      className="group/button flex items-center gap-2 bg-linear-to-r 
                        from-red-400 to-red-900
                         hover:from-red-600 hover:to-red-900
                          text-white px-3 py-1 font-medium rounded-md 
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
