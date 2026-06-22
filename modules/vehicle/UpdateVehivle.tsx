"use client";
import { useEffect, useState } from "react";
import {
  Car,
  Calendar,
  ShieldCheck,
  DollarSign,
  Hash,
  BadgeInfo,
  Save,
  Building2Icon,
  HashIcon,
  TruckElectric,
  Building,
  Trash,
} from "lucide-react";
import { getVehicleByIdAsync, updateVehicleAsync } from "./api";
import { toast } from "react-toastify";
import Container from "@/components/Container";
import Spinner from "@/components/Spinner";
import CustomButton from "@/components/CustomButton";
import {
  IVehicleCreateRequest,
  IVehicleResponse,
  VehicleStatus,
  vehicleTypes,
} from "./types";
import CustomInput from "@/components/CustomInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface params {
  vehicleId: string;
}

const UpdateVehicle = ({ vehicleId }: params) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState<IVehicleResponse>();
  const router = useRouter();


  const [updatedVehicle, setUpdatedVehicle] = useState<any>({
    vehicleId: "",
    number: "",
    modelName: "",
    company: "",
    engineNumber: "",
    chassisNumber: "",
    vehicleType: "",
    doner: "",
    purchsedCast: 0,
    depreciation: 0,
    registrationDate: new Date(),
    registrationExpiry: new Date(),
    fitnessExpiry: new Date(),
    insuredBy: "",
    insuranceFrom: new Date(),
    insuranceExpiry: new Date(),
    insuranceTo: new Date(),
    typeOfInsurance: "",
    status: VehicleStatus.Decommissioned,
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setIsLoading(true);
        const response = await getVehicleByIdAsync(vehicleId);
        if (response.success) {
          setVehicle(response.data);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }

        console.log("vehicle data", response);
      } catch (error) {
        toast.error("Failed to fetch vehicle details. Please try again.");
        console.error("Error fetching vehicle:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicle();
  }, []);

  useEffect(() => {
    if (!vehicle) return;
    const mapped = {
      vehicleId: vehicle.vehicleId ?? "",
      number: vehicle.number ?? "",
      modelName: vehicle.modelName ?? "",
      company: vehicle.company ?? "",
      engineNumber: vehicle.engineNumber ?? "",
      chassisNumber: vehicle.chassisNumber ?? "",
      vehicleType: vehicle.vehicleType ?? "",
      doner: vehicle.doner ?? "",
      purchsedCast: vehicle.purchsedCast ?? 0,
      depreciation: vehicle.depreciation ?? 0,
      registrationDate: vehicle.registrationDate
        ? new Date(vehicle.registrationDate)
        : new Date(),
      registrationExpiry: vehicle.registrationExpiry
        ? new Date(vehicle.registrationExpiry)
        : new Date(),
      fitnessExpiry: vehicle.fitnessExpiry
        ? new Date(vehicle.fitnessExpiry)
        : new Date(),
      insuredBy: vehicle.insuredBy ?? "",
      insuranceFrom: vehicle.insuranceFrom
        ? new Date(vehicle.insuranceFrom)
        : new Date(),
      insuranceExpiry: vehicle.insuranceExpiry
        ? new Date(vehicle.insuranceExpiry)
        : new Date(),
      insuranceTo: vehicle.insuranceTo
        ? new Date(vehicle.insuranceTo)
        : new Date(),
      typeOfInsurance: vehicle.typeOfInsurance ?? "",
      status: Number(vehicle.status),
    };

    setUpdatedVehicle(mapped);
  }, [vehicle]);

  useEffect(() => {
    console.log("updatedVehicle changed:", updatedVehicle);
  }, [updatedVehicle]);

  const isFormInvalid = () => {
    return (
      updatedVehicle.number === "" ||
      updatedVehicle.modelName === "" ||
      updatedVehicle.company === "" ||
      updatedVehicle.engineNumber === "" ||
      updatedVehicle.chassisNumber === "" ||
      updatedVehicle.vehicleType === "" ||
      updatedVehicle.doner === "" ||
      updatedVehicle.purchsedCast <= 0 ||
      updatedVehicle.depreciation < 0 ||
      updatedVehicle.insuredBy === "" ||
      updatedVehicle.typeOfInsurance === ""
    );
  };

  const dateFields: (keyof IVehicleCreateRequest)[] = [
    "registrationDate",
    "registrationExpiry",
    "fitnessExpiry",
    "insuranceFrom",
    "insuranceExpiry",
    "insuranceTo",
  ];
  const handleChange = (
    name: keyof IVehicleCreateRequest,
    value: string | number | Date,
  ) => {
    setUpdatedVehicle((prev: any) => {
      if (name === "purchsedCast" || name === "depreciation") {
        return {
          ...prev,
          [name]: Number(value),
        };
      }

      if (dateFields.includes(name)) {
        return {
          ...prev,
          [name]: value ? new Date(value) : null,
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const formatDate = (date: Date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await updateVehicleAsync(updatedVehicle);

      if (response.success) {
        toast.success(response.message);
        router.push(`/vehicle/get-vehicle-by-id/${vehicleId}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error saving vehicle:", error);
      toast.error("Something went wrong while updating the vehicle.");
    } finally {
      setIsLoading(false)
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
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          <div className="bg-linear-to-r from-red-600 via-red-700 to-red-900 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex justify-center items-center gap-5">
                <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                  <Car className="w-12 h-12 text-white" />
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
                    Update Vehicle Details
                  </h2>

                  <p className="text-red-100 uppercase font-semibold text-xl mt-2 break-all">
                    {vehicle.number} - {vehicle.modelName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="bg-white/20 backdrop-blur-lg px-8 py-5 rounded-2xl border border-white/20">
                  <p className="text-red-100 text-sm">Vehicle Status</p>
                  <h3 className="text-2xl font-bold text-white">
                    {VehicleStatus[updatedVehicle.status]}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"></div>
            <div className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomInput
                    label="Enter Vehicle Number"
                    Icon={Car}
                    className="custom-input w-full"
                    placeholder="e.g ABC-1234"
                    value={updatedVehicle.number}
                    onChange={(value) => handleChange("number", value)}
                  />
                  <CustomInput
                    label="Enter Model Name"
                    Icon={Hash}
                    className="custom-input w-full"
                    value={updatedVehicle.modelName}
                    placeholder="e.g GLI, Revo, Prado"
                    onChange={(value) => handleChange("modelName", value)}
                  />
                  <CustomInput
                    label="Enter Company Name"
                    Icon={Building2Icon}
                    placeholder="e.g Toyota, Honda"
                    className="custom-input w-full"
                    value={updatedVehicle.company}
                    onChange={(value) => handleChange("company", value)}
                  />
                  <CustomInput
                    label="Enter Engine Number"
                    Icon={HashIcon}
                    placeholder="e.g 12312323213"
                    className="custom-input w-full"
                    value={updatedVehicle.engineNumber}
                    onChange={(value) => handleChange("engineNumber", value)}
                  />

                  <CustomInput
                    label="Enter Chassis Number"
                    Icon={ShieldCheck}
                    className="custom-input w-full"
                    placeholder="e.g 12312323213"
                    value={updatedVehicle.chassisNumber}
                    onChange={(value) => handleChange("chassisNumber", value)}
                  />
                  <div className="flex group items-center  justify-between px-4 bg-gray-200 gap-3 custom-input w-full hover:bg-gray-300">
                    <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <Car className="h-5 w-5 group" />
                    </div>
                    <Select
                      value={updatedVehicle.vehicleType}
                      onValueChange={(value: string) =>
                        handleChange("vehicleType", value)
                      }
                    >
                      <SelectTrigger className="w-full bg-white mt-1">
                        <SelectValue placeholder="Select Vehicle Type" />
                      </SelectTrigger>

                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <CustomInput
                    label="Enter Donner Name"
                    Icon={BadgeInfo}
                    placeholder="e.g Turk Kizilay, GRC, Red Cross"
                    className="custom-input w-full"
                    value={updatedVehicle.doner}
                    onChange={(value) => handleChange("doner", value)}
                  />

                  <CustomInput
                    label="Enter Purchase Cost"
                    Icon={DollarSign}
                    placeholder="e.g 7000000"
                    className="custom-input w-full"
                    value={updatedVehicle.purchsedCast}
                    onChange={(value) => handleChange("purchsedCast", value)}
                  />
                  <CustomInput
                    label="Enter Depreciation Cost"
                    placeholder="e.g 40000"
                    Icon={DollarSign}
                    className="custom-input w-full"
                    value={updatedVehicle.depreciation}
                    onChange={(value) => handleChange("depreciation", value)}
                  />

                  <CustomInput
                    label="Enter Registration Date"
                    Icon={Calendar}
                    type="date"
                    className="custom-input w-full"
                    value={formatDate(updatedVehicle.registrationDate)}
                    onChange={(value) =>
                      handleChange("registrationDate", value)
                    }
                  />

                  <CustomInput
                    label="Enter Registration Expiry Date"
                    Icon={Calendar}
                    type="date"
                    className="custom-input w-full"
                    value={formatDate(updatedVehicle.registrationExpiry)}
                    onChange={(value) =>
                      handleChange("registrationExpiry", value)
                    }
                  />

                  <CustomInput
                    label="Fitness Expiry Date"
                    Icon={Calendar}
                    type="date"
                    className="custom-input w-full"
                    value={formatDate(updatedVehicle.fitnessExpiry)}
                    onChange={(value) => handleChange("fitnessExpiry", value)}
                  />

                  <CustomInput
                    label="Insurance Company"
                    Icon={Building}
                    type="text"
                    placeholder="e.g Jublee IJI etc"
                    className="custom-input w-full"
                    value={updatedVehicle.insuredBy}
                    onChange={(value) => handleChange("insuredBy", value)}
                  />
                  <CustomInput
                    label="Insurance Type"
                    Icon={Building}
                    type="text"
                    placeholder="e.g Full, Third Party etc"
                    className="custom-input w-full"
                    value={updatedVehicle.typeOfInsurance}
                    onChange={(value) => handleChange("typeOfInsurance", value)}
                  />
                  <CustomInput
                    label="Insurance From"
                    Icon={Calendar}
                    type="date"
                    className="custom-input w-full"
                    value={formatDate(updatedVehicle.insuranceFrom)}
                    onChange={(value) => handleChange("insuranceFrom", value)}
                  />
                  <CustomInput
                    label="Insurance To"
                    Icon={Calendar}
                    type="date"
                    className="custom-input w-full"
                    value={formatDate(updatedVehicle.insuranceTo)}
                    onChange={(value) => handleChange("insuranceTo", value)}
                  />
                </div>

                <div className="flex items-center gap-6 px-4 py-4 bg-gray-200 hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    {<Trash className="w-5 h-5" />}
                  </div>
                  <div className="flex gap-3">
                    <Select
                      value={updatedVehicle.status.toString()}
                      onValueChange={(value) =>
                        handleChange("status", Number(value))
                      }
                    >
                      <SelectTrigger className="w-full bg-white mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.keys(VehicleStatus)
                          .filter((key) => isNaN(Number(key)))
                          .map((key) => {
                            const enumValue =
                              VehicleStatus[key as keyof typeof VehicleStatus];

                            return (
                              <SelectItem key={key} value={String(enumValue)}>
                                {key}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex border justify-end">
                  <CustomButton
                    buttonColor="bg-red-500"
                    buttonHoverColor="bg-red-900"
                    type="submit"
                    disabled={isFormInvalid()}
                    icon={<Save />}
                    className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                    buttonText="Save Vehicle"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UpdateVehicle;
