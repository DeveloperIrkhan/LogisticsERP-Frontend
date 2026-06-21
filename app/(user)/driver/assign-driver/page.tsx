"use client";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import Spinner from "@/components/Spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assignDriverToVehicle, getDrivers } from "@/modules/drivers/api";
import { IDriverResponseDto } from "@/modules/drivers/types";
import { getVehicles } from "@/modules/vehicle/api";
import { IVehicleResponse } from "@/modules/vehicle/types";
import { Car, Save, Truck, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [vehicles, setVehicles] = useState<IVehicleResponse[]>([]);
  const [drivers, setDrivers] = useState<IDriverResponseDto[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        const response = await getVehicles();
        setVehicles(response as any);
        console.log(response);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDrivers = async () => {
      try {
        setIsLoading(true);
        const response = await getDrivers();
        setDrivers(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicles();
    fetchDrivers();
  }, []);

  const isFormInvalid = () => {
    return !selectedVehicleId || !selectedDriverId;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await assignDriverToVehicle(
      selectedDriverId,
      selectedVehicleId,
    );
    console.log(response);
    if (response.data.success) {
      toast.success(
        response.data.message || "Driver assigned to vehicle successfully!",
      );
    } else {
      toast.error(
        response.message ||
          "Failed to assign driver to vehicle. Please try again.",
      );
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          {/* Header */}
          <div className="bg-linear-to-r from-red-500 via-dark-color to-red-900 p-8 md:p-10">
            <div className="flex flex-row items-center gap-5">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                <User className="w-12 h-12 text-white" />
              </div>

              <div>
                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                  Assign Driver to Vehicle
                </h1>

                <p className="text-red-100 mt-2 text-sm break-all">
                  Select a driver and assign them to a specific vehicle in your
                  fleet.
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="p-6 md:p-10">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex items-center gap-6 px-4 py-4 bg-gray-200 hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  {<Truck className="w-5 h-5" />}
                </div>
                <div className="flex w-full gap-3">
                  <Select
                    value={selectedVehicleId}
                    onValueChange={(value) => setSelectedVehicleId(value)}
                  >
                    <SelectTrigger className="w-full bg-white mt-1">
                      <SelectValue placeholder="Select Vehicle" />
                    </SelectTrigger>

                    <SelectContent>
                      {vehicles?.map((vehicle: IVehicleResponse) => (
                        <SelectItem
                          key={vehicle.vehicleId}
                          value={String(vehicle.vehicleId)}
                        >
                          {vehicle.number ||
                            vehicle.modelName ||
                            `Vehicle ${vehicle.vehicleId}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-6 px-4 py-4 bg-gray-200 hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  {<User className="w-5 h-5" />}
                </div>

                <div className="flex w-full gap-3">
                  <Select
                    value={selectedDriverId}
                    onValueChange={(value) => setSelectedDriverId(value)}
                  >
                    <SelectTrigger className="w-full bg-white mt-1">
                      <SelectValue placeholder="Select Driver" />
                    </SelectTrigger>

                    <SelectContent>
                      {drivers?.map((driver: IDriverResponseDto) => (
                        <SelectItem
                          key={driver.driverId}
                          value={String(driver.driverId)}
                        >
                          {driver.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex border justify-end">
                <CustomButton
                  buttonColor="bg-red-500"
                  buttonHoverColor="bg-red-900"
                  type="submit"
                  disabled={isFormInvalid()}
                  icon={<Save />}
                  className="w-1/2 text-white py-2 rounded-full transition"
                  buttonText="Assign Driver"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
