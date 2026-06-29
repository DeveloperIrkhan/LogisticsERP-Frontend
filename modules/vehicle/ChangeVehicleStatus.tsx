"use client"
import React, { useEffect, useState } from "react";
import { IVehicleResponse, VehicleStatus } from "./types";
import { changeVehicleStatusAsync, getVehiclesAsync } from "./api";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ChangeVehicleStatus = () => {
  const [vehicles, setVehicles] = useState<IVehicleResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [updatingId, setUpdatingId] = useState<string>("");




  const statusOptions = Object.keys(VehicleStatus)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: VehicleStatus[key as keyof typeof VehicleStatus],
    }));



  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        const response = await getVehiclesAsync();
        if (response.success) {
          setVehicles(response.data);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => { console.log("vehicles", vehicles) }, [vehicles])

  const handleStatusChange = async (vehicleId: string, newStatus: string) => {
    setIsLoading(true);
    const Status = newStatus as VehicleStatus;
    const previousVehicles = vehicles;
    console.log("sendingstatus", Status)
    // optimistic update
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.vehicleId === vehicleId ? { ...vehicle, status: Status } : vehicle)
    );

    try {
      setUpdatingId(vehicleId);
      const response = await changeVehicleStatusAsync(vehicleId, Status);
      if (response.success) {
        toast.success(response.message);
      } else {
        setVehicles(previousVehicles);
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error updating vehicle status:", error);
      setVehicles(previousVehicles); // revert
      toast.error("Failed to update vehicle status");
    } finally {
      setUpdatingId("");
      setIsLoading(false)
    }
  };



  if (isLoading) return <Spinner />
  return (
    <div className="flex flex-col gap-3 w-full">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.vehicleId}
          className={`flex flex-row items-center justify-between gap-4 rounded-lg border px-4 py-3 shadow-md 
            ${vehicle.status === VehicleStatus.Active ? "bg-green-100 border border-green-300" :
              vehicle.status === VehicleStatus.InActive ? "bg-red-100 border border-red-300" :
                vehicle.status === VehicleStatus.Maintenance ? "bg-yellow-100 border border-yellow-300"
                  : "bg-gray-100 border border-gray-300"}`}
        >
          <div className="flex flex-row items-center gap-6 flex-1 min-w-0 overflow-hidden">
            <div className="flex flex-col min-w-30">
              <span className="text-xs text-gray-500">Name</span>
              <span className="font-semibold text-gray-900 truncate uppercase text-sm">
                {vehicle.modelName}
              </span>
            </div>

            <div className="flex flex-col min-w-30">
              <span className="text-xs text-gray-500">Company</span>
              <span className="font-medium text-gray-900 truncate text-sm uppercase">
                {vehicle.company}
              </span>
            </div>

            <div className="flex flex-col min-w-30">
              <span className="text-xs text-gray-500">Engin Number</span>
              <span className="font-medium text-gray-900 truncate text-sm uppercase">
                {vehicle.engineNumber}
              </span>
            </div>

            <div className="flex flex-col min-w-30">
              <span className="text-xs text-gray-500">Type</span>
              <span className="font-medium text-gray-900 truncate text-sm uppercase">
                {vehicle.vehicleType}
              </span>
            </div>

            <div className="flex flex-col min-w-30">
              <span className="text-xs text-gray-500">Donner</span>
              <span className="font-medium text-gray-900 truncate text-sm uppercase">
                {vehicle.doner}
              </span>
            </div>
          </div>

          <div className="w-48 shrink-0">
            <Select
              value={vehicle.status.toString()  }
              onValueChange={(value) => handleStatusChange(vehicle.vehicleId, value)}
              disabled={updatingId === vehicle.vehicleId}
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
      ))}
    </div>
  )
};

export default ChangeVehicleStatus;
