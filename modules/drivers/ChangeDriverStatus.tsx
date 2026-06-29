

"use client"
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DriverStatus, IDriverResponseDto } from "./types";
import { changeStatusAsync, getDriversAsync } from "./api";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

const ChangeDriverStatus = () => {
    const [drivers, setDrivers] = useState<IDriverResponseDto[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [updatingId, setUpdatingId] = useState<string>("");




    const statusOptions = Object.keys(DriverStatus)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
            label: key,
            value: DriverStatus[key as keyof typeof DriverStatus],
        }));



    useEffect(() => {
        const fetchDriversAsync = async () => {
            try {
                setIsLoading(true);
                const response = await getDriversAsync();
                if (response.success) {
                    setDrivers(response.data);
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching drivers:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDriversAsync();
    }, []);


    const handleStatusChange = async (driverId: string, newStatus: string) => {
        setIsLoading(true);
        const Status = newStatus as DriverStatus;
        const previousVehicles = drivers;
        console.log("sendingstatus", Status)
        // optimistic update
        setDrivers((prev) =>
            prev.map((driver) =>
                driver.driverId === driverId ? { ...driver, status: Status } : driver)
        );

        try {
            setUpdatingId(driverId);
            const response = await changeStatusAsync(driverId, Status);
            if (response.success) {
                toast.success(response.message);
            } else {
                setDrivers(previousVehicles);
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Error updating driver status:", error);
            setDrivers(previousVehicles); // revert
            toast.error("Failed to update driver status");
        } finally {
            setUpdatingId("");
            setIsLoading(false)
        }
    };



    if (isLoading) return <Spinner />
    return (
        <div className="flex flex-col gap-3 w-full">
            {drivers.map((driver) => (
                <div
                    key={driver.driverId}
                    className={`flex flex-row items-center justify-between gap-4 rounded-lg border px-4 py-3 shadow-md 
            ${driver.status === DriverStatus.Active ?
                            "bg-green-100 border border-green-300"
                            : "bg-red-100 border border-red-300"}`}
                >
                    <div className="flex flex-row items-center gap-6 flex-1 min-w-0 overflow-hidden">
                        <div className="flex flex-col min-w-30">
                            <span className="text-xs text-gray-500">Driver's Name</span>
                            <span className="font-semibold text-gray-900 truncate uppercase text-sm">
                                {driver.fullName}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-30">
                            <span className="text-xs text-gray-500">Date Of Joining</span>
                            <span className="font-medium text-gray-900 truncate text-sm uppercase">
                                {driver.dateOfJoining}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-30">
                            <span className="text-xs text-gray-500">Licence Type</span>
                            <span className="font-medium text-gray-900 truncate text-sm uppercase">
                                {driver.typeOfLicence}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-30">
                            <span className="text-xs text-gray-500">Licnence Number</span>
                            <span className="font-medium text-gray-900 truncate text-sm uppercase">
                                {driver.licenseNumber}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-30">
                            <span className="text-xs text-gray-500">Contact</span>
                            <span className="font-medium text-gray-900 truncate text-sm uppercase">
                                {driver.mobileNumber}
                            </span>
                        </div>
                    </div>

                    <div className="w-48 shrink-0">
                        <Select
                            value={driver.status.toString()}
                            onValueChange={(value) => handleStatusChange(driver.driverId, value)}
                            disabled={updatingId === driver.driverId}
                        >
                            <SelectTrigger className="w-full bg-white border">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((option) => (
                                    <SelectItem key={option.label} value={String(option.value)}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            ))
            }
        </div >
    )
};

export default ChangeDriverStatus




