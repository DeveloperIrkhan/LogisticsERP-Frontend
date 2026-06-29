"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Car,
  User,
  Phone,
  BadgeInfo,
  CheckCircle2,
  ChevronDown,
  Search,
  ArrowRight,
} from "lucide-react";

import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import {
  getAvailableDriversAsync,
  assignDriverToVehicleAsync,
} from "@/modules/drivers/api";
import { getVehicleByIdAsync } from "@/modules/vehicle/api";
import { IDriverResponseDto } from "@/modules/drivers/types";
import { IVehicleResponse } from "@/modules/vehicle/types";


const AssignDriver = () => {
  const router = useRouter();
  const params = useParams();

  const vehicleId = params.vehicleId as string;
  const [vehicle, setVehicle] = useState<IVehicleResponse | null>(null);
  const [drivers, setDrivers] = useState<IDriverResponseDto[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [vehicleRes, driversRes] = await Promise.all([
          getVehicleByIdAsync(vehicleId),
          getAvailableDriversAsync(),
        ]);
        if (vehicleRes.success) {
          setVehicle(vehicleRes.data);
        } else {
          toast.error(vehicleRes.message);
        }
        console.log(vehicleId)


        if (driversRes.success) {
          setDrivers(driversRes.data);
        } else {
          toast.error(driversRes.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vehicleId]);

  const selectedDriver = drivers.find((d) => d.driverId === selectedDriverId);

  const filteredDrivers = drivers.filter(
    (d) =>
      d.fullName.toLowerCase().includes(search.toLowerCase()) ||
      d.licenseNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.mobileNumber.toLowerCase().includes(search.toLowerCase()),
  );

  // ── Submit assignment ────────────────────────────────────
  const handleAssign = async () => {
    if (!selectedDriverId) {
      toast.error("Please select a driver first.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await assignDriverToVehicleAsync(
        selectedDriverId,
        vehicleId,
      );

      if (response.success) {
        toast.success(response.message || "Driver assigned successfully!");
        router.push(`/vehicle/get-vehicle-by-id/${vehicleId}`);
      } else {
        toast.error(response.message || "Failed to assign driver.");
      }
    } catch (error: any) {
      console.error("Error assigning driver:", error);
      toast.error(
        error?.response?.data?.message ||
        "Something went wrong while assigning the driver.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          {/* Header */}
          <div className="bg-linear-to-r from-red-600 via-red-700 to-red-900 p-8 md:p-10">
            <div className="flex items-center gap-5">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-wide">
                  Assign Driver
                </h1>
                <p className="text-red-100 mt-1 text-sm">
                  Select an available driver for this vehicle
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 h-125">
            {/* Vehicle Summary Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex items-center gap-4">
              <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                <Car className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Vehicle
                </p>
                <h2 className="text-xl font-bold text-slate-800">
                  {vehicle.number}
                </h2>
                <p className="text-sm text-slate-500">
                  {vehicle.company} {vehicle.modelName}
                </p>
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {vehicle.status}
              </span>
            </div>

            {/* Driver Dropdown */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Available Drivers
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between gap-3 border border-slate-300 rounded-xl px-4 py-3.5 bg-white hover:border-red-400 transition-colors"
                >
                  {selectedDriver ? (
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-slate-800">
                          {selectedDriver.fullName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {selectedDriver.licenseNumber} ·{" "}
                          {selectedDriver.typeOfLicence}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-400">
                      -- Select a driver --
                    </span>
                  )}
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-20 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-96 overflow-hidden">
                    {/* Search box */}
                    <div className="p-3 border-b border-slate-100 sticky top-0 bg-white">
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          autoFocus
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search by name, license or phone..."
                          className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400"
                        />
                      </div>
                    </div>

                    {/* Driver list */}
                    <div className="overflow-y-auto max-h-72">
                      {filteredDrivers.length === 0 ? (
                        <div className="p-6 text-center text-sm text-slate-400">
                          No available drivers found.
                        </div>
                      ) : (
                        filteredDrivers.map((driver) => (
                          <button
                            key={driver.driverId}
                            type="button"
                            onClick={() => {
                              setSelectedDriverId(driver.driverId!);
                              setIsDropdownOpen(false);
                              setSearch("");
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left ${selectedDriverId === driver.driverId
                              ? "bg-red-50"
                              : ""
                              }`}
                          >
                            <div className="bg-blue-100 text-blue-600 p-2 rounded-full flex-shrink-0">
                              <User className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-800 text-sm truncate">
                                {driver.fullName}
                              </p>
                              <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {driver.mobileNumber}
                                </span>
                                <span className="flex items-center gap-1">
                                  <BadgeInfo className="w-3 h-3" />
                                  {driver.typeOfLicence}
                                </span>
                              </div>
                            </div>
                            {selectedDriverId === driver.driverId && (
                              <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0" />
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {drivers.length === 0 && (
                <p className="text-sm text-amber-600 mt-2">
                  No available drivers found. All drivers may currently be
                  assigned or on duty.
                </p>
              )}
            </div>

            {/* Selected driver preview */}
            {selectedDriver && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-5 flex items-center gap-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-2xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-green-700">
                    You are about to assign{" "}
                    <span className="font-bold">{selectedDriver.fullName}</span>{" "}
                    to vehicle{" "}
                    <span className="font-bold">{vehicle.number}</span>.
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAssign}
                disabled={!selectedDriverId || isSubmitting}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-red-500 to-red-800 hover:from-red-600 hover:to-red-900 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? "Assigning..." : "Assign Driver"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AssignDriver;
