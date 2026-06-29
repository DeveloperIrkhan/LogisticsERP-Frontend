"use client";
import { Calendar, Car, CardSim, Save, User } from "lucide-react";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import { toast } from "react-toastify";
import { useState } from "react";
import { DriverStatus, IDriverCreateDto } from "./types";
import { createDriverAsync } from "./api";
import Spinner from "@/components/Spinner";
import CustomInput from "@/components/CustomInput";
import ImageUpload from "@/components/ImageUpload";
import { MdEmail } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
const CreateDriver = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [driver, setDriver] = useState<IDriverCreateDto>({
    fullName: "",
    cnic: "",
    mobileNumber: "",
    email: "",
    address: "",
    licenseNumber: "",
    licenseExpiry: new Date(),
    typeOfLicence: "",
    dateOfJoining: new Date(),
    status: DriverStatus.Active,
    description: "",
    Photo: undefined,
    License: undefined,
    vehicleId: "",
  });
  const isFormInvalid = () => {
    return (
      driver.fullName === "" ||
      driver.cnic === "" ||
      driver.mobileNumber === "" ||
      driver.email === "" ||
      driver.address === "" ||
      driver.licenseNumber === "" ||
      driver.typeOfLicence === "" ||
      driver.description === ""
    );
  };

  const dateFields: (keyof IDriverCreateDto)[] = [
    "licenseExpiry",
    "dateOfJoining",
  ];

  const fileFields: (keyof IDriverCreateDto)[] = ["Photo", "License"];

  const handleChange = <K extends keyof IDriverCreateDto>(
    name: K,
    value: any,
  ) => {
    setDriver((prev) => {
      if (dateFields.includes(name)) {
        return {
          ...prev,
          [name]: value ? new Date(value) : new Date(),
        };
      }
      if (fileFields.includes(name)) {
        return {
          ...prev,
          [name]: value,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
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
      const formData = new FormData();

      formData.append("fullName", driver.fullName);
      formData.append("cnic", driver.cnic);
      formData.append("mobileNumber", driver.mobileNumber);
      formData.append("email", driver.email);
      formData.append("address", driver.address);
      formData.append("licenseNumber", driver.licenseNumber);
      formData.append("typeOfLicence", driver.typeOfLicence);
      formData.append("description", driver.description);
      formData.append("dateOfJoining", driver.dateOfJoining.toISOString());
      formData.append("licenseExpiry", driver.licenseExpiry.toISOString());

      if (driver.Photo) {
        formData.append("Photo", driver.Photo);
      }
      if (driver.License) {
        formData.append("License", driver.License);
      }

      const response = await createDriverAsync(formData);
      toast.success("driver created successfully:");
      console.log("driver created successfully:", response);
      setDriver({
        fullName: "",
        cnic: "",
        mobileNumber: "",
        email: "",
        address: "",
        licenseNumber: "",
        licenseExpiry: new Date(),
        typeOfLicence: "",
        dateOfJoining: new Date(),
        status: DriverStatus.Active,
        description: "",
        Photo: undefined,
        License: undefined,
        vehicleId: "",
      });
    } catch (error) {
      console.error("Error saving driver:", error);
    } finally {
      setIsLoading(false);

      console.log("dirver's Data:", driver);
    }
  };
  if (isLoading) {
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
                <Car className="w-12 h-12 text-white" />
              </div>

              <div>
                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                  Enter New Driver Information
                </h1>

                <p className="text-red-100 mt-2 text-sm break-all">
                  Please Enter the Correct Details of Driver.
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUpload
                  label="Upload Driver Avator"
                  value={driver.Photo}
                  onChange={(file) => {
                    handleChange("Photo", file);
                  }}
                />
                <ImageUpload
                  label="Upload Driver Licence"
                  value={driver.License}
                  onChange={(file) => {
                    handleChange("License", file);
                  }}
                />
                <CustomInput
                  label="Enter Driver Full Name"
                  Icon={User}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Irfan Shah"
                  value={driver.fullName}
                  onChange={(value) => handleChange("fullName", value)}
                />

                <CustomInput
                  label="Enter Driver cnic"
                  Icon={CardSim}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Irfan Shah"
                  value={driver.cnic}
                  onChange={(value) => handleChange("cnic", value)}
                />

                <CustomInput
                  label="Enter Mobile Number"
                  Icon={Calendar}
                  type="text"
                  className="custom-input w-full"
                  value={driver.mobileNumber}
                  onChange={(value) => handleChange("mobileNumber", value)}
                />
                <CustomInput
                  label="Enter email"
                  Icon={MdEmail}
                  type="text"
                  className="custom-input w-full"
                  value={driver.email}
                  onChange={(value) => handleChange("email", value)}
                />
                <CustomInput
                  label="Enter address"
                  Icon={FaAddressBook}
                  type="text"
                  className="custom-input w-full"
                  value={driver.address}
                  onChange={(value) => handleChange("address", value)}
                />
                <CustomInput
                  label="Enter license Number"
                  Icon={GoNumber}
                  type="text"
                  className="custom-input w-full"
                  value={driver.licenseNumber}
                  onChange={(value) => handleChange("licenseNumber", value)}
                />

                <CustomInput
                  label="Select Date Of Joining"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(driver.dateOfJoining)}
                  onChange={(value) => handleChange("dateOfJoining", value)}
                />
                <CustomInput
                  label="License Expiry"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(driver.licenseExpiry)}
                  onChange={(value) => handleChange("licenseExpiry", value)}
                />

                <CustomInput
                  label="Enter Enter Licence Type"
                  Icon={GoNumber}
                  type="text"
                  className="custom-input w-full"
                  value={driver.typeOfLicence}
                  onChange={(value) => handleChange("typeOfLicence", value)}
                />

                <CustomInput
                  label="Good Words for Driver Remarks"
                  Icon={GoNumber}
                  type="text"
                  className="custom-input w-full"
                  value={driver.description}
                  onChange={(value) => handleChange("description", value)}
                />
              </div>

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
    </Container>
  );
};

export default CreateDriver;
