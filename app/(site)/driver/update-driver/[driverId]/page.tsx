"use client";
import UpdateDriver from "@/modules/drivers/UpdateDriver";
import UpdateVehicle from "@/modules/vehicle/UpdateVehivle";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const driverId = params?.driverId as string;
  return <UpdateDriver driverId={driverId} />;
};

export default page;
