"use client";
import GetOnlyVehicle from "@/modules/vehicle/GetOnlyVehicle";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const vehicleId = params?.vehicleId as string;
  return (
    <div>
      <GetOnlyVehicle params={{ vehicleId }} />;
    </div>
  );
};

export default page;
