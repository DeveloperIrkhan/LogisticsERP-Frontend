"use client";
import UpdateVehicle from "@/modules/vehicle/UpdateVehivle";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const vehicleId = params?.vehicleId as string;
  return <UpdateVehicle vehicleId={vehicleId} />;
};

export default page;
