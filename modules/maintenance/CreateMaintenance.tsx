"use client";
import {
  Calendar,
  Wrench,
  Gauge,
  Banknote,
  Building2,
  FileText,
  Receipt,
  Truck,
  User,
  Save,
  Hash,
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

import { IMaintenanceCreateDto, MAINTENANCE_TYPES } from "./types";
import { createMaintenanceAsync } from "./api";
import { getVehiclesAsync } from "@/modules/vehicle/api";
import { getDriversAsync } from "@/modules/drivers/api";
import { IVehicleResponse } from "@/modules/vehicle/types";
import { IDriverResponseDto } from "@/modules/drivers/types";

const emptyMaintenance = (): IMaintenanceCreateDto => ({
  vehicleId: "",
  driverId: "",
  addedBy: "",
  maintenanceDate: new Date(),
  currentKm: 0,
  cost: 0,
  description: "",
  maintenanceType: "",
  workshopName: "",
  changedParts: "",
  invoiceNumber: "",
  nextMaintenanceKm: undefined,
  nextMaintenanceDate: nextMaintenanceDate,
});
const nextMaintenanceDate = new Date();
nextMaintenanceDate.setMonth(nextMaintenanceDate.getMonth() + 1);



const CreateMaintenance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [vehicles, setVehicles] = useState<IVehicleResponse[]>([]);
  const [drivers, setDrivers] = useState<IDriverResponseDto[]>([]);
  const [maintenance, setMaintenance] = useState<IMaintenanceCreateDto>(
    emptyMaintenance(),
  );

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
      } catch (error) {
        toast.error("Failed to load vehicles/drivers.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchDropdownData();
  }, []);

  const isFormInvalid = () =>
    maintenance.vehicleId === "" ||
    maintenance.description === "" ||
    maintenance.currentKm <= 0 ||
    maintenance.cost <= 0;

  const dateFields: (keyof IMaintenanceCreateDto)[] = [
    "maintenanceDate",
    "nextMaintenanceDate",
  ];
  const numberFields: (keyof IMaintenanceCreateDto)[] = [
    "currentKm",
    "cost",
    "nextMaintenanceKm",
  ];

  const handleChange = <K extends keyof IMaintenanceCreateDto>(
    name: K,
    value: any,
  ) => {
    setMaintenance((prev) => {
      if (dateFields.includes(name)) {
        return { ...prev, [name]: value ? new Date(value) : undefined };
      }
      if (numberFields.includes(name)) {
        return { ...prev, [name]: value === "" ? undefined : Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await createMaintenanceAsync(maintenance);
      if (response.success) {
        toast.success(response.message || "Maintenance record created!");
        setMaintenance(emptyMaintenance());
      } else {
        toast.error(response.message || "Failed to create maintenance record.");
      }
    } catch (error) {
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
                <Wrench className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                  Add Maintenance Record
                </h1>
                <p className="text-red-100 mt-2 text-sm">
                  Record vehicle maintenance and service details.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Vehicle Dropdown */}
                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="text-md font-medium text-slate-500 group-hover:text-red-500 duration-400 block mb-1">
                      Select Vehicle *
                    </label>
                    <Select
                      value={maintenance.vehicleId}
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

                {/* Driver Dropdown */}
                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="text-md font-medium text-slate-500 group-hover:text-red-500 duration-400 block mb-1">
                      Driver Who Took Vehicle (optional)
                    </label>
                    <Select
                      value={maintenance.driverId}
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

                {/* Maintenance Type Dropdown */}
                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="text-md font-medium text-slate-500 group-hover:text-red-500 duration-400 block mb-1">
                      Maintenance Type
                    </label>
                    <Select
                      value={maintenance.maintenanceType}
                      onValueChange={(v) => handleChange("maintenanceType", v)}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {MAINTENANCE_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <CustomInput
                  label="Maintenance Date *"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(maintenance.maintenanceDate)}
                  onChange={(v) => handleChange("maintenanceDate", v)}
                />

                <CustomInput
                  label="Current Km *"
                  Icon={Gauge}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 45000"
                  value={maintenance.currentKm}
                  onChange={(v) => handleChange("currentKm", v)}
                />

                <CustomInput
                  label="Cost (PKR) *"
                  Icon={Banknote}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 15000"
                  value={maintenance.cost}
                  onChange={(v) => handleChange("cost", v)}
                />

                <CustomInput
                  label="Workshop Name"
                  Icon={Building2}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Ali Auto Workshop"
                  value={maintenance.workshopName ?? ""}
                  onChange={(v) => handleChange("workshopName", v)}
                />

                <CustomInput
                  label="Invoice Number"
                  Icon={Receipt}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g INV-00231"
                  value={maintenance.invoiceNumber ?? ""}
                  onChange={(v) => handleChange("invoiceNumber", v)}
                />

                <CustomInput
                  label="Changed Parts"
                  Icon={Hash}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Engine Oil, Oil Filter"
                  value={maintenance.changedParts ?? ""}
                  onChange={(v) => handleChange("changedParts", v)}
                />

                <CustomInput
                  label="Description *"
                  Icon={FileText}
                  type="text"
                  className="custom-input w-full"
                  placeholder="Brief description of work done"
                  value={maintenance.description}
                  onChange={(v) => handleChange("description", v)}
                />

                <CustomInput
                  label="Next Maintenance Km"
                  Icon={Gauge}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 50000"
                  value={maintenance.nextMaintenanceKm ?? ""}
                  onChange={(v) => handleChange("nextMaintenanceKm", v)}
                />

                <CustomInput
                  label="Next Maintenance Date"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(maintenance.nextMaintenanceDate)}
                  onChange={(v) => handleChange("nextMaintenanceDate", v)}
                />

                <CustomInput
                  label="Added By"
                  Icon={User}
                  type="text"
                  className="custom-input w-full"
                  placeholder="Your name"
                  value={maintenance.addedBy ?? ""}
                  onChange={(v) => handleChange("addedBy", v)}
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
                  buttonText="Save Record"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateMaintenance;