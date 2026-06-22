"use client";
import GetVehicleFullRecord from "@/modules/vehicle/GetVehicleFullRecord";
import { useParams } from "next/navigation";
const page = () => {
  const params = useParams();
  const id = params?.vehicleId as string;

  return <GetVehicleFullRecord id={id} />;
};

export default page;
