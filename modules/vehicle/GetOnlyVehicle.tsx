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
  Edit,
  Trash,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";

import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import { getVehicleByIdAsync } from "./api";
import Link from "next/link";
import { GrUserWorker } from "react-icons/gr";
import { BiDetail } from "react-icons/bi";
import { toast } from "react-toastify";
import { IVehicleResponse, VehicleStatus } from "./types";

interface PageProps {
  params: {
    vehicleId: string;
  };
}

const GetOnlyVehicle = ({ params }: PageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState<IVehicleResponse>();
  const customStyle =
    "absolute -top-12 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition";
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setIsLoading(true);

        const response = await getVehicleByIdAsync(params.vehicleId);
        if (response.success) {
          setVehicle(response.data);
          toast.success(response.message);
          console.log(vehicle)
        } else {
          toast.error(response.message);
        }
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

  const drivers = vehicle.drivers ?? [];
  const documents = vehicle.documents ?? [];

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
                  <div className="relative flex group">
                    <Link
                      href={"/vehicle/update-vehicle/" + vehicle.vehicleId}
                      className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <Edit className="w-6 h-6" />
                    </Link>
                    <span className={customStyle}>Edit Driver</span>
                  </div>
                  <div className="flex group relative">
                    <div className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300">
                      <Trash className="w-6 h-6" />
                    </div>
                    <span className={customStyle}>Delete Vehicle</span>
                  </div>
                  <div className="flex group relative">
                    <Link
                      href={"/vehicle/get-full-record/" + vehicle.vehicleId}
                      className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <BiDetail className="w-6 h-6" />
                    </Link>
                    <span className={customStyle}>Driver Details</span>
                  </div>
                </div>
              </div>
            </div>
            {/* ── Assigned Drivers Section ────────────────── */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 text-red-600 p-3 rounded-2xl">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Assigned Drivers
                    </h2>
                    <p className="text-sm text-slate-500">
                      {drivers.length} driver{drivers.length !== 1 ? "s" : ""}{" "}
                      assigned to this vehicle
                    </p>
                  </div>
                </div>

                <Link
                  href={"/vehicle/assign-driver/" + vehicle.vehicleId}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-colors"
                >
                  <GrUserWorker className="w-4 h-4" />
                  Assign Driver
                </Link>
              </div>

              {drivers.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                  <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">
                    No drivers assigned to this vehicle yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {drivers.map((driver: any) => (
                    <div
                      key={driver.driverId}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
                          <User className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-800 truncate">
                            {driver.fullName}
                          </h3>
                          <span
                            className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                              driver.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {driver.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="w-4 h-4 text-slate-400" />
                          {driver.mobileNumber}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 truncate">
                          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="truncate">{driver.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <BadgeInfo className="w-4 h-4 text-slate-400" />
                          {driver.licenseNumber} ({driver.typeOfLicence})
                        </div>
                      </div>

                      <Link
                        href={`/driver/get-driver-by-id/${driver.driverId}`}
                        className="mt-4 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 text-sm font-semibold py-2 rounded-xl transition-colors"
                      >
                        View Driver
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Documents Section ────────────────────────── */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 text-red-600 p-3 rounded-2xl">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Vehicle Documents
                    </h2>
                    <p className="text-sm text-slate-500">
                      {documents.length} document
                      {documents.length !== 1 ? "s" : ""} uploaded
                    </p>
                  </div>
                </div>

                <Link
                  href={"/document/upload/" + vehicle.vehicleId}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Upload Document
                </Link>
              </div>

              {documents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">
                    No documents uploaded for this vehicle yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {documents.map((doc: any) => (
                    <a
                      key={doc.documentId}
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4"
                    >
                      <div className="bg-green-100 text-green-600 p-3 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 truncate">
                          {doc.documentType}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Uploaded:{" "}
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-600 flex-shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              )}
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

                  <h3 className="text-2xl font-bold text-white">
                    {vehicle.status}
                  </h3>
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
