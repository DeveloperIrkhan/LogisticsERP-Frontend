"use client";
import {
  Calendar,
  MapPin,
  User,
  Truck,
  FileText,
  Save,
  Clock,
  Gauge,
  Heart,
} from "lucide-react";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IDutyCreateDto, DutyType } from "./dutyTypes";
import { createDutyAsync } from "./api";
import { getVehiclesAsync } from "@/modules/vehicle/api";
import { getDriversAsync } from "@/modules/drivers/api";
import { IVehicleResponse } from "@/modules/vehicle/types";
import { IDriverResponseDto } from "@/modules/drivers/types";

const emptyDuty = (): IDutyCreateDto => ({
  vehicleId: "",
  driverId: "",
  fromLocation: "",
  toLocation: "",
  purpose: "",
  officerName: "",
  dateOut: new Date(),
  dutyType: DutyType.Routine,
  killometerOut: undefined,
  donor: "",
  remarks: "",
});

const CreateDuty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [vehicles, setVehicles] = useState<IVehicleResponse[]>([]);
  const [drivers, setDrivers] = useState<IDriverResponseDto[]>([]);
  const [duty, setDuty] = useState<IDutyCreateDto>(emptyDuty());

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        setIsFetching(true);
        const [vehicleRes, driverRes] = await Promise.all([
          getVehiclesAsync(),
          getDriversAsync(),
        ]);
        if (vehicleRes.success) setVehicles(vehicleRes.data);
        if (driverRes.success) setDrivers(driverRes.data);
      } catch {
        toast.error("Failed to load vehicles/drivers.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchDropdownData();
  }, []);

  const isFormInvalid = () =>
    duty.vehicleId === "" ||
    duty.driverId === "" ||
    duty.fromLocation === "" ||
    duty.toLocation === "" ||
    duty.purpose === "" ||
    duty.officerName === "";

  const handleChange = <K extends keyof IDutyCreateDto>(
    name: K,
    value: any,
  ) => {
    setDuty((prev) => {
      if (name === "dateOut") {
        return { ...prev, [name]: value ? new Date(value) : new Date() };
      }
      if (name === "killometerOut") {
        return { ...prev, [name]: value === "" ? undefined : Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const formatDate = (date: Date) =>
    new Date(date).toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await createDutyAsync(duty);
      if (response.success) {
        toast.success(response.message || "Duty created successfully!");
        setDuty(emptyDuty());
      } else {
        toast.error(response.message || "Failed to create duty.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || isFetching) return <Spinner />;

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          {/* Header */}
          <div className="bg-linear-to-r from-red-500 via-dark-color to-red-900 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                <Clock className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                  Assign New Duty
                </h1>
                <p className="text-red-100 mt-2 text-sm">
                  Schedule a duty for a driver and vehicle.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Vehicle */}
                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                      Select Vehicle *
                    </label>
                    <Select
                      value={duty.vehicleId}
                      onValueChange={(v) => handleChange("vehicleId", v)}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((v) => (
                          <SelectItem key={v.vehicleId} value={v.vehicleId}>
                            {v.number} — {v.company} {v.modelName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Driver */}
                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                      Select Driver *
                    </label>
                    <Select
                      value={duty.driverId}
                      onValueChange={(v) => handleChange("driverId", v)}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Driver" />
                      </SelectTrigger>
                      <SelectContent>
                        {drivers.map((d) => (
                          <SelectItem key={d.driverId} value={d.driverId!}>
                            {d.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Duty Type */}
                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                      Duty Type *
                    </label>
                    <Select
                      value={duty.dutyType}
                      onValueChange={(v) =>
                        handleChange("dutyType", v as DutyType)
                      }
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Duty Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(DutyType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <CustomInput
                  label="Date Out *"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(duty.dateOut)}
                  onChange={(v) => handleChange("dateOut", v)}
                />

                <CustomInput
                  label="From Location *"
                  Icon={MapPin}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Islamabad HQ"
                  value={duty.fromLocation}
                  onChange={(v) => handleChange("fromLocation", v)}
                />

                <CustomInput
                  label="To Location *"
                  Icon={MapPin}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Lahore Office"
                  value={duty.toLocation}
                  onChange={(v) => handleChange("toLocation", v)}
                />

                <CustomInput
                  label="Purpose *"
                  Icon={FileText}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Supply delivery"
                  value={duty.purpose}
                  onChange={(v) => handleChange("purpose", v)}
                />

                <CustomInput
                  label="Officer Name *"
                  Icon={User}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Maj. Ali Hassan"
                  value={duty.officerName}
                  onChange={(v) => handleChange("officerName", v)}
                />

                <CustomInput
                  label="Starting Odometer (km)"
                  Icon={Gauge}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 45000"
                  value={duty.killometerOut ?? ""}
                  onChange={(v) => handleChange("killometerOut", v)}
                />

                <CustomInput
                  label="Donor (optional)"
                  Icon={Heart}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g PRCS"
                  value={duty.donor ?? ""}
                  onChange={(v) => handleChange("donor", v)}
                />

                <CustomInput
                  label="Remarks (optional)"
                  Icon={FileText}
                  type="text"
                  className="custom-input w-full"
                  placeholder="Any additional notes..."
                  value={duty.remarks ?? ""}
                  onChange={(v) => handleChange("remarks", v)}
                />
              </div>

              <div className="flex justify-end">
                <CustomButton
                  buttonColor="bg-red-500"
                  buttonHoverColor="bg-red-900"
                  type="submit"
                  disabled={isFormInvalid()}
                  icon={<Save />}
                  className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                  buttonText="Assign Duty"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateDuty;