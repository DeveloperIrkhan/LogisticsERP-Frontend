"use client"
import Spinner from '@/components/Spinner';
import React, { useEffect, useState } from 'react'
import { DriverStatus, IDriverUpdateDto } from './types';
import { getDriverByIdAsync, updateDriverAsync } from './api';
import { toast } from 'react-toastify';
import Container from '@/components/Container';
import { RxDividerVertical } from 'react-icons/rx';
import CustomButton from '@/components/CustomButton';
import ImageUpload from '@/components/ImageUpload';
import CustomInput from '@/components/CustomInput';
import { Calendar, CardSim, Save, User } from 'lucide-react';
import { MdEmail } from 'react-icons/md';
import { FaAddressBook } from 'react-icons/fa';
import { GoNumber } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GrStatusCritical } from 'react-icons/gr';

interface params {
    driverId: string;
}

// Maps backend status (string like "ACTIVE", or number) -> numeric DriverStatus enum
const mapStatusFromApi = (status: string | number | undefined | null): DriverStatus => {
    if (typeof status === "string") {
        const matchedKey = Object.keys(DriverStatus).find(
            (key) => isNaN(Number(key)) && key.toUpperCase() === status.toUpperCase()
        );
        if (matchedKey !== undefined) {
            return DriverStatus[matchedKey as keyof typeof DriverStatus];
        }
    }
    return DriverStatus.Inactive; // fallback default
};

const UpdateDriver = ({ driverId }: params) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [notFound, setNotFound] = useState(false);
    const [driver, setDriver] = useState<IDriverUpdateDto>({
        driverId: "",
        fullName: "",
        cnic: "",
        mobileNumber: "",
        email: "",
        address: "",
        licenseNumber: "",
        licenseExpiry: new Date(),
        typeOfLicence: "",
        dateOfJoining: new Date(),
        status: DriverStatus.Inactive,
        description: "",
        Photo: undefined,
        License: undefined,
        vehicleId: "",
    });
    const [isFetching, setIsFetching] = useState(false);
    const [existingPhotoUrl, setExistingPhotoUrl] = useState<string>("");
    const [existingLicenseUrl, setExistingLicenseUrl] = useState<string>("");

    useEffect(() => {
        const fetchDriverAsync = async () => {
            try {
                setIsFetching(true);
                const response = await getDriverByIdAsync(driverId);

                if (response.success) {
                    const d = response.data;
                    toast.success(response.message);

                    setDriver({
                        driverId: d.driverId,
                        fullName: d.fullName,
                        cnic: d.cnic,
                        mobileNumber: d.mobileNumber,
                        email: d.email,
                        address: d.address,
                        licenseNumber: d.licenseNumber,
                        licenseExpiry: new Date(d.licenseExpiry),
                        typeOfLicence: d.typeOfLicence,
                        dateOfJoining: new Date(d.dateOfJoining),
                        status: mapStatusFromApi(d.status),
                        description: d.description,
                        Photo: undefined,
                        License: undefined,
                        vehicleId: d.vehicleId ?? "",
                    });
                    setExistingPhotoUrl(d.photoUrl ?? "");
                    setExistingLicenseUrl(d.licenseUrl ?? "");
                    setNotFound(false);
                } else {
                    toast.error(response.message);
                    setNotFound(true);
                }
            } catch (error) {
                console.error("Error fetching driver:", error);
                setNotFound(true);
            } finally {
                setIsFetching(false);
            }
        };
        fetchDriverAsync();
    }, [driverId]);

    const isFormInvalid = () => {
        return (
            driver.fullName === "" ||
            driver.cnic === "" ||
            driver.mobileNumber === "" ||
            driver.email === "" ||
            driver.address === "" ||
            driver.licenseNumber === "" ||
            driver.typeOfLicence === "" ||
            driver.description === "" ||
            driver.status === undefined ||
            driver.status === null
        );
    };

    const dateFields: (keyof IDriverUpdateDto)[] = ["licenseExpiry", "dateOfJoining"];
    const fileFields: (keyof IDriverUpdateDto)[] = ["Photo", "License"];

    const handleChange = <K extends keyof IDriverUpdateDto>(name: K, value: any) => {
        setDriver((prev) => {
            if (dateFields.includes(name)) {
                return { ...prev, [name]: value ? new Date(value) : new Date() };
            }
            if (fileFields.includes(name)) {
                return { ...prev, [name]: value };
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
            const formData = new FormData();

            formData.append("driverId", driver.driverId ?? driverId);
            formData.append("fullName", driver.fullName ?? "");
            formData.append("cnic", driver.cnic ?? "");
            formData.append("mobileNumber", driver.mobileNumber ?? "");
            formData.append("email", driver.email ?? "");
            formData.append("address", driver.address ?? "");
            formData.append("licenseNumber", driver.licenseNumber ?? "");
            formData.append("typeOfLicence", driver.typeOfLicence ?? "");
            formData.append("description", driver.description ?? "");
            formData.append("status", String(driver.status));

            if (driver.dateOfJoining) {
                formData.append("dateOfJoining", new Date(driver.dateOfJoining).toISOString());
            }
            if (driver.licenseExpiry) {
                formData.append("licenseExpiry", new Date(driver.licenseExpiry).toISOString());
            }
            if (driver.Photo) {
                formData.append("Photo", driver.Photo);
            }
            if (driver.License) {
                formData.append("License", driver.License);
            }

            const response = await updateDriverAsync(formData);

            if (response.success) {
                toast.success(response.message || "Driver updated successfully!");
                router.push(`/driver/get-driver-by-id/${driverId}`);
            } else {
                toast.error(response.message || "Failed to update driver.");
            }
        } catch (error) {
            console.error("Error updating driver:", error);
            toast.error("Something went wrong while updating the driver.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <Spinner />;
    }

    if (notFound) {
        return (
            <Container className="flex justify-center items-center min-h-[70vh]">
                <p className="text-xl text-red-500 font-semibold">
                    no driver found!
                </p>
            </Container>
        );
    }

    return (
        <Container className="py-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                    <div className="bg-linear-to-r from-red-600 via-red-700 to-red-900 p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                            <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                                <RxDividerVertical className="w-12 h-12 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-extrabold text-white tracking-wide">
                                    Existing Driver Information
                                </h1>
                                <p className="text-red-100 mt-2 text-sm break-all">
                                    {driver.driverId}
                                </p>
                                <p className="text-red-100 mt-2 text-sm break-all">
                                    Please Enter the Correct Details of Driver.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageUpload
                            label="Upload Driver Avatar"
                            value={driver.Photo}
                            existingUrl={existingPhotoUrl}
                            onChange={(file) => handleChange("Photo", file)}
                        />
                        <ImageUpload
                            label="Upload Driver Licence"
                            value={driver.License}
                            existingUrl={existingLicenseUrl}
                            onChange={(file) => handleChange("License", file)}
                        />
                        <CustomInput
                            label="Enter Driver Full Name"
                            Icon={User}
                            type="text"
                            className="custom-input w-full"
                            placeholder="e.g Irfan Shah"
                            value={driver.fullName ?? ""}
                            onChange={(value) => handleChange("fullName", value)}
                        />
                        <CustomInput
                            label="Enter Driver cnic"
                            Icon={CardSim}
                            type="text"
                            className="custom-input w-full"
                            placeholder="e.g 12345-6789012-3"
                            value={driver.cnic ?? ""}
                            onChange={(value) => handleChange("cnic", value)}
                        />
                        <CustomInput
                            label="Enter Mobile Number"
                            Icon={Calendar}
                            type="text"
                            className="custom-input w-full"
                            value={driver.mobileNumber ?? ""}
                            onChange={(value) => handleChange("mobileNumber", value)}
                        />
                        <CustomInput
                            label="Enter email"
                            Icon={MdEmail}
                            type="text"
                            className="custom-input w-full"
                            value={driver.email ?? ""}
                            onChange={(value) => handleChange("email", value)}
                        />
                        <CustomInput
                            label="Enter address"
                            Icon={FaAddressBook}
                            type="text"
                            className="custom-input w-full"
                            value={driver.address ?? ""}
                            onChange={(value) => handleChange("address", value)}
                        />
                        <CustomInput
                            label="Enter license Number"
                            Icon={GoNumber}
                            type="text"
                            className="custom-input w-full"
                            value={driver.licenseNumber ?? ""}
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
                            label="Enter Licence Type"
                            Icon={GoNumber}
                            type="text"
                            className="custom-input w-full"
                            value={driver.typeOfLicence ?? ""}
                            onChange={(value) => handleChange("typeOfLicence", value)}
                        />
                        <CustomInput
                            label="Good Words for Driver Remarks"
                            Icon={GoNumber}
                            type="text"
                            className="custom-input w-full"
                            value={driver.description ?? ""}
                            onChange={(value) => handleChange("description", value)}
                        />

                        <div className="flex items-center gap-6 px-4 py-4 bg-gray-200 hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                            <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                <GrStatusCritical className="w-5 h-5" />
                            </div>
                            <div className="flex w-full flex-col gap-1">
                                <label className="text-sm font-medium text-slate-700">
                                    Driver Status
                                </label>
                                <Select
                                    value={
                                        driver.status !== undefined && driver.status !== null
                                            ? String(driver.status)
                                            : undefined
                                    }
                                    onValueChange={(value) => handleChange("status", value as DriverStatus)}
                                >
                                    <SelectTrigger className="w-full bg-white mt-1">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(DriverStatus)
                                            .filter((key) => isNaN(Number(key)))
                                            .map((key) => {
                                                const enumValue = DriverStatus[key as keyof typeof DriverStatus];
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
                    </div>

                    <div className="flex border justify-end gap-3">
                        <CustomButton
                            buttonColor="bg-slate-400"
                            buttonHoverColor="bg-slate-600"
                            type="button"
                            onClickFunction={() => router.back()}
                            className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                            buttonText="Cancel"
                        />
                        <CustomButton
                            buttonColor="bg-red-500"
                            buttonHoverColor="bg-red-900"
                            type="submit"
                            disabled={isFormInvalid() || isLoading}
                            icon={<Save />}
                            className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                            buttonText={isLoading ? "Updating..." : "Update Driver"}
                        />
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default UpdateDriver;