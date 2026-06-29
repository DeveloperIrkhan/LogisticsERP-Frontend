import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import { IVehicleCreateRequest, VehicleStatus, vehicleTypes } from "./types";
import Spinner from "@/components/Spinner";
import { createVehicleAsync } from "./api";
import {
  BadgeInfo,
  Building,
  Building2Icon,
  Calendar,
  Car,
  DollarSign,
  Hash,
  HashIcon,
  Save,
  ShieldCheck,
} from "lucide-react";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const AddNewVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState<IVehicleCreateRequest>({
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
    status: VehicleStatus.InActive,
  });
  const isFormInvalid = () => {
    return (
      vehicle.number === "" ||
      vehicle.modelName === "" ||
      vehicle.company === "" ||
      vehicle.engineNumber === "" ||
      vehicle.chassisNumber === "" ||
      vehicle.vehicleType === "" ||
      vehicle.doner === "" ||
      vehicle.purchsedCast <= 0 ||
      vehicle.depreciation < 0 ||
      vehicle.insuredBy === "" ||
      vehicle.typeOfInsurance === ""
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
    setVehicle((prev) => {
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
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await createVehicleAsync(vehicle);
      if (response.success) {
        toast.success(response.message);
      } else toast.error(response.message);
      console.log("Vehicle created successfully:", response);
      setVehicle({
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
        status: VehicleStatus.InActive,
      });
    } catch (error) {
      console.error("Error saving vehicle:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          {/* Header */}
          <div className="bg-linear-to-r from-red-500 via-dark-color to-red-900 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                <Car className="w-12 h-12 text-white" />
              </div>

              <div>
                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                  Enter New Vehicle Information
                </h1>

                <p className="text-red-100 mt-2 text-sm break-all">
                  Pleae enter the details of the new vehicle you want to add to
                  the system. Make sure to fill in all the required fields
                  accurately to ensure proper record-keeping and management of
                  your fleet.
                </p>
              </div>
            </div>
          </div>{" "}
          {isLoading && <Spinner />}
          <div className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  label="Enter Vehicle Number"
                  Icon={Car}
                  className="custom-input w-full"
                  placeholder="e.g ABC-1234"
                  value={vehicle.number}
                  onChange={(value) => handleChange("number", value as string)}
                />
                <CustomInput
                  label="Enter Model Name"
                  Icon={Hash}
                  className="custom-input w-full"
                  value={vehicle.modelName}
                  placeholder="e.g GLI, Revo, Prado"
                  onChange={(value) => handleChange("modelName", value as string)}
                />
                <CustomInput
                  label="Enter Company Name"
                  Icon={Building2Icon}
                  placeholder="e.g Toyota, Honda"
                  className="custom-input w-full"
                  value={vehicle.company}
                  onChange={(value) => handleChange("company", value as string)}
                />
                <CustomInput
                  label="Enter Engine Number"
                  Icon={HashIcon}
                  placeholder="e.g 12312323213"
                  className="custom-input w-full"
                  value={vehicle.engineNumber}
                  onChange={(value) => handleChange("engineNumber", value as string)}
                />

                <CustomInput
                  label="Enter Chassis Number"
                  Icon={ShieldCheck}
                  className="custom-input w-full"
                  placeholder="e.g 12312323213"
                  value={vehicle.chassisNumber}
                  onChange={(value) => handleChange("chassisNumber", value as string)}
                />
                <div className="flex group items-center  justify-between px-4 bg-gray-200 gap-3 custom-input w-full hover:bg-gray-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Car className="h-5 w-5 group" />
                  </div>
                  <Select
                    value={vehicle.vehicleType}
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
                  value={vehicle.doner}
                  onChange={(value) => handleChange("doner", value as string)}
                />

                <CustomInput
                  label="Enter Purchase Cost"
                  Icon={DollarSign}
                  placeholder="e.g 7000000"
                  className="custom-input w-full"
                  value={vehicle.purchsedCast}
                  onChange={(value) => handleChange("purchsedCast", value as string)}
                />
                <CustomInput
                  label="Enter Depreciation Cost"
                  placeholder="e.g 40000"
                  Icon={DollarSign}
                  className="custom-input w-full"
                  value={vehicle.depreciation}
                  onChange={(value) => handleChange("depreciation", value as string)}
                />

                <CustomInput
                  label="Enter Registration Date"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(vehicle.registrationDate)}
                  onChange={(value) => handleChange("registrationDate", value as Date)}
                />

                <CustomInput
                  label="Enter Registration Expiry Date"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(vehicle.registrationExpiry)}
                  onChange={(value) =>
                    handleChange("registrationExpiry", value as Date)
                  }
                />

                <CustomInput
                  label="Fitness Expiry Date"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(vehicle.fitnessExpiry)}
                  onChange={(value) => handleChange("fitnessExpiry", value as Date)}
                />

                <CustomInput
                  label="Insurance Company"
                  Icon={Building}
                  type="text"
                  placeholder="e.g Jublee IJI etc"
                  className="custom-input w-full"
                  value={vehicle.insuredBy}
                  onChange={(value) => handleChange("insuredBy", value as string)}
                />
                <CustomInput
                  label="Insurance Type"
                  Icon={Building}
                  type="text"
                  placeholder="e.g Full, Third Party etc"
                  className="custom-input w-full"
                  value={vehicle.typeOfInsurance}
                  onChange={(value) => handleChange("typeOfInsurance", value as string)}
                />
                <CustomInput
                  label="Insurance From"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(vehicle.insuranceFrom)}
                  onChange={(value) => handleChange("insuranceFrom", value as Date)}
                />
                <CustomInput
                  label="Insurance To"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(vehicle.insuranceTo)}
                  onChange={(value) => handleChange("insuranceTo", value as Date)}
                />

                <CustomInput
                  label="Insurance expiry"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(vehicle.insuranceExpiry)}
                  onChange={(value) => handleChange("insuranceExpiry", value as Date)}
                />
              </div>

              {/* Submit */}
              <div className="flex border justify-end">
                {/* <button type="submit" className="bg-red-600">
                  Save Vehicle
                </button> */}
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
    </Container>
  );
};

export default AddNewVehicle;
