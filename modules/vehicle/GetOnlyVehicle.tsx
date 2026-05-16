"use client";

import { useEffect, useState } from "react";
import {
  Car,
  Building2,
  Calendar,
  ShieldCheck,
  DollarSign,
  Hash,
  BadgeInfo,
  Toolbox,
  Van,
  Activity,
  Icon,
  HdIcon,
  Edit,
  Trash,
} from "lucide-react";

import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import { getVehicleById } from "./api";
import Link from "next/link";
import { VehicleStatus } from "./types";

interface PageProps {
  params: {
    vehicleId: string;
  };
}

const GetOnlyVehicle = ({ params }: PageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState<any>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setIsLoading(true);

        const response = await getVehicleById(params.vehicleId);

        setVehicle(response);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicle();
  }, [params.vehicleId]);

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center min-h-[70vh]">
        <Spinner />
      </Container>
    );
  }

  if (!vehicle) {
    return (
      <Container className="flex justify-center items-center min-h-[70vh]">
        <p className="text-xl text-red-500 font-semibold">Vehicle not found</p>
      </Container>
    );
  }

  const details = [
    {
      label: "Vehicle Number",
      value: vehicle.number,
      icon: Car,
    },
    {
      label: "Model Name",
      value: vehicle.modelName,
      icon: BadgeInfo,
    },
    {
      label: "Company",
      value: vehicle.company,
      icon: Building2,
    },
    {
      label: "Engine Number",
      value: vehicle.engineNumber,
      icon: Toolbox,
    },
    {
      label: "Chassis Number",
      value: vehicle.chassisNumber,
      icon: Hash,
    },
    {
      label: "Vehicle Type",
      value: vehicle.vehicleType,
      icon: Van,
    },
    {
      label: "Doner",
      value: vehicle.doner,
      icon: Building2,
    },
    {
      label: "Purchased Cost",
      value: `PRK-${vehicle.purchsedCast}`,
      icon: DollarSign,
    },
    {
      label: "Depreciation",
      value: `PRK-${vehicle.depreciation}`,
      icon: DollarSign,
    },
    {
      label: "Registration Date",
      value: new Date(vehicle.registrationDate).toDateString(),
      icon: Calendar,
    },
    {
      label: "Registration Expiry",
      value: new Date(vehicle.registrationExpiry).toDateString(),
      icon: Calendar,
    },
    {
      label: "Fitness Expiry",
      value: new Date(vehicle.fitnessExpiry).toDateString(),
      icon: Activity,
    },
    {
      label: "Insured By",
      value: vehicle.insuredBy,
      icon: ShieldCheck,
    },
    {
      label: "Insurance Type",
      value: vehicle.typeOfInsurance,
      icon: ShieldCheck,
    },
    {
      label: "Insurance From",
      value: new Date(vehicle.insuranceFrom).toDateString(),
      icon: Calendar,
    },
    {
      label: "Insurance To",
      value: new Date(vehicle.insuranceTo).toDateString(),
      icon: Calendar,
    },
    {
      label: "Insurance Expiry",
      value: new Date(vehicle.insuranceExpiry).toDateString(),
      icon: ShieldCheck,
    },
  ];

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          <div className="bg-linear-to-r from-red-600 via-red-700 to-red-900 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                <Car className="w-12 h-12 text-white" />
              </div>

              <div>
                <h1 className="text-4xl font-extrabold text-white tracking-wide">
                  Vehicle Information
                </h1>

                <p className="text-red-100 mt-2 text-sm break-all">
                  {vehicle.vehicleId}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {details.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="group uppercase relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-gray-color to-slate-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-color rounded-full blur-3xl opacity-40"></div>

                    <div className="relative flex gap-4">
                      <div className="bg-red-100 text-red-600 p-4 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm text-slate-500 font-medium">
                          {item.label}
                        </p>

                        <h3 className="text-lg font-bold text-slate-800 mt-1 wrap-break-word">
                          {item.value || "-"}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="uppercase rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-center gap-4">
                  <Link
                    href={"/vehicle/update-vehicle/" + vehicle.vehicleId}
                    className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    <Edit className="w-6 h-6" />
                  </Link>
                  <div className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300">
                    <Trash className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Banner */}
            <div className="mt-10 rounded-3xl bg-linear-to-r from-red-600 to-red-900 p-8 shadow-xl">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div>
                  <h2 className="text-3xl uppercase font-bold text-white">
                    {vehicle.company} {vehicle.modelName}
                  </h2>

                  <p className="text-red-100 mt-2 text-lg">
                    Registration #: {vehicle.vehicleId}
                  </p>
                </div>

                <div className="bg-white/20 backdrop-blur-lg px-8 py-5 rounded-2xl border border-white/20">
                  <p className="text-red-100 text-sm">Vehicle Status</p>

                  <h3 className="text-2xl font-bold text-white">{VehicleStatus[vehicle.status]}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GetOnlyVehicle;
