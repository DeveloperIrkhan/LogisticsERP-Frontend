"use client";
import {
  Calendar,
  Fuel as FuelIcon,
  Gauge,
  Banknote,
  Building2,
  MapPin,
  Receipt,
  Heart,
  FileText,
  Truck,
  User,
  Save,
} from "lucide-react";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IFuelCreateDto, FUEL_TYPES, PAYMENT_METHODS } from "./types";
import { createFuelAsync } from "./api";
import { getVehiclesAsync } from "@/modules/vehicle/api";
import { getDriversAsync } from "@/modules/drivers/api";
import { IVehicleResponse } from "@/modules/vehicle/types";
import { IDriverResponseDto } from "@/modules/drivers/types";

const emptyFuel = (): IFuelCreateDto => ({
  vehicleId: "",
  driverId: "",
  addedBy: "",
  fuelingDate: new Date(),
  odoMeterReading: 0,
  liters: 0,
  costPerLiter: 0,
  totalCost: 0,
  isFullTank: true,
  mileage: undefined,
  stationName: "",
  stationLocation: "",
  province: "",
  receiptNumber: "",
  fuelType: "",
  paymentMethod: "",
  donor: "",
  notes: "",
});

const CreateFuel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [vehicles, setVehicles] = useState<IVehicleResponse[]>([]);
  const [drivers, setDrivers] = useState<IDriverResponseDto[]>([]);

  const [fuel, setFuel] = useState<IFuelCreateDto>(emptyFuel());

  // ── Fetch vehicles + drivers for dropdowns ──────────────
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
        console.error("Error fetching dropdown data:", error);
        toast.error("Failed to load vehicles/drivers.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchDropdownData();
  }, []);

  // ── Auto calculate total cost ───────────────────────────
  const computedTotal = useMemo(() => {
    const liters = Number(fuel.liters) || 0;
    const costPerLiter = Number(fuel.costPerLiter) || 0;
    return Math.round(liters * costPerLiter * 100) / 100;
  }, [fuel.liters, fuel.costPerLiter]);

  useEffect(() => {
    setFuel((prev) => ({ ...prev, totalCost: computedTotal }));
  }, [computedTotal]);

  const isFormInvalid = () => {
    return (
      fuel.vehicleId === "" ||
      fuel.driverId === "" ||
      fuel.stationName === "" ||
      fuel.liters <= 0 ||
      fuel.costPerLiter <= 0 ||
      fuel.odoMeterReading < 0
    );
  };

  const dateFields: (keyof IFuelCreateDto)[] = ["fuelingDate"];
  const numberFields: (keyof IFuelCreateDto)[] = [
    "odoMeterReading",
    "liters",
    "costPerLiter",
    "mileage",
  ];

  const handleChange = <K extends keyof IFuelCreateDto>(
    name: K,
    value: any,
  ) => {
    setFuel((prev) => {
      if (dateFields.includes(name)) {
        return { ...prev, [name]: value ? new Date(value) : new Date() };
      }
      if (numberFields.includes(name)) {
        return { ...prev, [name]: value === "" ? undefined : Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const formatDate = (date: Date) => {
    if (!date) return new Date();
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const payload: IFuelCreateDto = {
        ...fuel,
        totalCost: computedTotal,
      };

      const response = await createFuelAsync(payload);

      if (response.success) {
        toast.success(response.message || "Fuel record created successfully!");
        setFuel(emptyFuel());
      } else {
        toast.error(response.message || "Failed to create fuel record.");
      }
    } catch (error) {
      console.error("Error saving fuel record:", error);
      toast.error("Something went wrong while saving the fuel record.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          {/* Header */}
          <div className="bg-linear-to-r from-red-500 via-dark-color to-red-900 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                <FuelIcon className="w-12 h-12 text-white" />
              </div>

              <div>
                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                  Add New Fuel Entry
                </h1>

                <p className="text-red-100 mt-2 text-sm break-all">
                  Record fuel consumption for a vehicle.
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
                      Select Vehicle
                    </label>
                    <Select
                      value={fuel.vehicleId}
                      onValueChange={(value) =>
                        handleChange("vehicleId", value)
                      }
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((v) => (
                          <SelectItem className="uppercase" key={v.vehicleId} value={v.vehicleId}>
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
                      Select Driver
                    </label>
                    <Select
                      value={fuel.driverId}
                      onValueChange={(value) =>
                        handleChange("driverId", value)
                      }
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Driver" />
                      </SelectTrigger>
                      <SelectContent>
                        {drivers.map((d) => (
                          <SelectItem className="uppercase" key={d.driverId} value={d.driverId}>
                            {d.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <CustomInput
                  label="Fueling Date"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(fuel.fuelingDate)}
                  onChange={(value) => handleChange("fuelingDate", value)}
                />

                <CustomInput
                  label="Odometer Reading (km)"
                  Icon={Gauge}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 45230"
                  value={fuel.odoMeterReading}
                  onChange={(value) =>
                    handleChange("odoMeterReading", value)
                  }
                />

                <CustomInput
                  label="Liters"
                  Icon={FuelIcon}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 40"
                  value={fuel.liters}
                  onChange={(value) => handleChange("liters", value)}
                />

                <CustomInput
                  label="Cost Per Liter (PKR)"
                  Icon={Banknote}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 280"
                  value={fuel.costPerLiter}
                  onChange={(value) => handleChange("costPerLiter", value)}
                />

                {/* Total cost — read only, auto calculated */}
                <div className="flex items-center gap-6 px-4 py-4 bg-green-50 border border-green-200 rounded-2xl">
                  <div className="bg-green-100 text-green-600 p-4 rounded-full">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-md font-medium text-green-700">
                      Total Cost (auto-calculated)
                    </p>
                    <p className="text-2xl font-bold text-green-800 mt-1">
                      PKR {computedTotal.toLocaleString()}
                    </p>
                  </div>
                </div>

                <CustomInput
                  label="Mileage (km/L) — optional"
                  Icon={Gauge}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 12"
                  value={fuel.mileage ?? ""}
                  onChange={(value) => handleChange("mileage", value)}
                />

                <CustomInput
                  label="Station Name"
                  Icon={Building2}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Shell Pump Islamabad"
                  value={fuel.stationName}
                  onChange={(value) => handleChange("stationName", value)}
                />

                <CustomInput
                  label="Station Location"
                  Icon={MapPin}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Blue Area, Islamabad"
                  value={fuel.stationLocation ?? ""}
                  onChange={(value) =>
                    handleChange("stationLocation", value)
                  }
                />

                <CustomInput
                  label="Province"
                  Icon={MapPin}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Punjab"
                  value={fuel.province ?? ""}
                  onChange={(value) => handleChange("province", value)}
                />

                <CustomInput
                  label="Receipt Number"
                  Icon={Receipt}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g RC-00231"
                  value={fuel.receiptNumber ?? ""}
                  onChange={(value) => handleChange("receiptNumber", value)}
                />

                {/* Fuel Type Dropdown */}
                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <FuelIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="text-md font-medium text-slate-500 group-hover:text-red-500 duration-400 block mb-1">
                      Fuel Type
                    </label>
                    <Select
                      value={fuel.fuelType}
                      onValueChange={(value) =>
                        handleChange("fuelType", value)
                      }
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Fuel Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {FUEL_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Payment Method Dropdown */}
                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="text-md font-medium text-slate-500 group-hover:text-red-500 duration-400 block mb-1">
                      Payment Method
                    </label>
                    <Select
                      value={fuel.paymentMethod}
                      onValueChange={(value) =>
                        handleChange("paymentMethod", value)
                      }
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_METHODS.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <CustomInput
                  label="Donor (optional)"
                  Icon={Heart}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g PRCS"
                  value={fuel.donor ?? ""}
                  onChange={(value) => handleChange("donor", value)}
                />

                <CustomInput
                  label="Notes (optional)"
                  Icon={FileText}
                  type="text"
                  className="custom-input w-full"
                  placeholder="Any extra notes..."
                  value={fuel.notes ?? ""}
                  onChange={(value) => handleChange("notes", value)}
                />

                {/* Full Tank Toggle */}
                <div className="flex items-center justify-between gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <FuelIcon className="w-5 h-5" />
                    </div>
                    <label className="text-md font-medium text-slate-600">
                      Full Tank Fill?
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleChange("isFullTank", !fuel.isFullTank)
                    }
                    className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${fuel.isFullTank ? "bg-red-600" : "bg-slate-300"
                      }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${fuel.isFullTank ? "translate-x-7" : "translate-x-0"
                        }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex border justify-end">
                <CustomButton
                  buttonColor="bg-red-500"
                  buttonHoverColor="bg-red-900"
                  type="submit"
                  disabled={isFormInvalid()}
                  icon={<Save />}
                  className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                  buttonText="Save Fuel Entry"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateFuel;