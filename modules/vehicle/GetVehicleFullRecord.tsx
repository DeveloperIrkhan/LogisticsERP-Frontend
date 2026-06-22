"use client";

import { IVehicleResponse, VehicleStatus } from "./types";
import { useEffect, useState } from "react";
import { getVehicleFullRecordByIdAsync } from "./api";
import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import Image from "next/image";
import { format } from "date-fns";
import { Car, IdCard, Phone, Truck, User } from "lucide-react";
import { images } from "@/public/images";
import { DriverStatus } from "../drivers/types";
import { toast } from "react-toastify";
import { FaCarSide } from "react-icons/fa";
import { PiJeepBold } from "react-icons/pi";
import VehicleType from "@/components/VehicleType";

interface IVehicleFullRecordProps {
  id: string;
}

const GetVehicleFullRecord = ({ id }: IVehicleFullRecordProps) => {

  const [vehicle, setVehicle] = useState<IVehicleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);




  const formatDate = (date: string | Date) =>
    format(new Date(date), "dd MMM yyyy");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setIsLoading(true);
        const res = await getVehicleFullRecordByIdAsync(id);
        if (res.success) {
          setVehicle(res.data);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);
  useEffect(() => {
    console.log(vehicle)

  }, [vehicle])
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Spinner />
      </div>
    );

  if (!vehicle)
    return (
      <Container className="flex justify-center items-center min-h-[50vh] text-white">
        No vehicle found
      </Container>
    );

  return (
    <Container className="py-8 space-y-8 bg-black">
      {/* HERO */}
      <div className="relative rounded-3xl p-8 bg-linear-to-br from-red-600 via-red-700 to-red-900 shadow-xl overflow-hidden">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <VehicleType vehicleType={vehicle.vehicleType} />

            <div>
              <h1 className="text-3xl font-bold text-white">
                {vehicle.number}
              </h1>
              <p className="text-white/80">
                {vehicle.modelName} • {vehicle.company}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg font-bold bg-white/20 backdrop-blur text-white text-lg">
            {vehicle.status}
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard label="Engine No" value={vehicle.engineNumber} />
        <StatCard label="Chassis No" value={vehicle.chassisNumber} />
        <StatCard label="Purchase Cost" value={`Rs ${vehicle.purchsedCast}`} />
        <StatCard label="Depreciation" value={`Rs ${vehicle.depreciation}`} />
      </div>

      {/* INFO */}
      <Section title="Vehicle Information">
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <Info label="Donor" value={vehicle.doner} />
          <Info label="Insurance By" value={vehicle.insuredBy} />
          <Info label="Insurance Type" value={vehicle.typeOfInsurance} />
          <Info
            label="Registration Date"
            value={formatDate(vehicle.registrationDate)}
          />
          <Info
            label="Fitness Expiry"
            value={formatDate(vehicle.fitnessExpiry)}
          />
          <Info
            label="Insurance Expiry"
            value={formatDate(vehicle.insuranceExpiry)}
          />
        </div>
      </Section>

      {/* DATES */}
      <Section title="Important Dates">
        <div className="space-y-3">
          <DateRow
            label="Registration Expiry"
            value={formatDate(vehicle.registrationExpiry)}
          />
          <DateRow
            label="Insurance From"
            value={formatDate(vehicle.insuranceFrom)}
          />
          <DateRow
            label="Insurance To"
            value={formatDate(vehicle.insuranceTo)}
          />
        </div>
      </Section>

      {/* DRIVERS */}
      <Section title="Drivers">
        {vehicle.drivers?.length ? (
          <div className="flex flex-col w-full gap-6">
            {vehicle.drivers.map((driver) => (
              <div
                key={driver.driverId}
                className="bg-white/5 border-2 w-full border-white/10 backdrop-blur rounded-2xl p-5 flex gap-4 hover:shadow-lg transition"
              >
                <div className="flex-1 text-white text-sm gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-6 h-6" />
                    <p className="font-semibold text-lg">{driver.fullName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <p className="text-white/70">+92 {driver.mobileNumber}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-white/80">
                    <div className="flex flex-col mt-4 my-2 gap-3">
                      <span className="flex gap-2">
                        <IdCard className="w-4 h-4" />
                        <span className="font-medium tracking-wide">CNIC:</span>
                        {driver.cnic}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full
                           ${driver.status.toString() === "Active"
                            ? "bg-lime-500" : "bg-yellow-500"}`} />
                        <span className="font-medium tracking-wide">
                          Status:
                        </span>
                        {driver.status}
                      </span>
                    </div>
                    <div className="flex flex-col mt-4 my-2 gap-3">
                      <span>Joined: {formatDate(driver.dateOfJoining)}</span>
                      <span>Licence Type: {driver.typeOfLicence}</span>
                      <span>
                        Licence Exp: {formatDate(driver.licenseExpiry)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={driver.photoUrl ?? images.NoProfile}
                    alt={driver.fullName}
                    width={driver.photoUrl ? 190 : 100}
                    height={driver.photoUrl ? 200 : 100}
                    className="rounded-md border object-cover"
                  />
                  <p className="text-sm font-semibold text-gray-300">
                    Driver's Avator
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={driver.licenseUrl ?? images.NoDocument}
                    alt="license"
                    width={driver.licenseUrl ? 300 : 100}
                    height={driver.licenseUrl ? 100 : 70}
                    className="rounded-md object-cover border"
                  />
                  <p className="text-sm font-semibold text-gray-300">
                    Driving Licence
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/60">No drivers assigned</p>
        )}
      </Section>

      {/* DOCUMENTS */}
      <Section title="Related Documents">
        {vehicle.documents?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-5">
            {vehicle.documents.map((doc: any, i: number) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Image
                  src={doc.fileUrl ?? images.NoDocument}
                  alt="document"
                  width={200}
                  height={150}
                  className="rounded-xl object-cover border hover:scale-105 transition"
                />
                <p className="text-sm font-semibold text-gray-300">
                  {doc.documentType}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-white/60">No documents uploaded</p>
            <Image
              src={images.NoDocument}
              alt="document"
              width={200}
              height={150}
              className="rounded-xl object-cover border hover:scale-105 transition"
            />
          </div>
        )}
      </Section>
    </Container>
  );
};

export default GetVehicleFullRecord;

/* ---------- COMPONENTS ---------- */

const Section = ({ title, children }: any) => (
  <div className="bg-linear-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur text-white">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const Info = ({ label, value }: any) => (
  <div>
    <p className="text-white/50 text-xs uppercase">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const DateRow = ({ label, value }: any) => (
  <div className="flex justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3">
    <span className="text-white/70">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const StatCard = ({ label, value }: any) => (
  <div className="bg-linear-to-br from-red-600 to-red-800 p-5 rounded-xl shadow-lg text-white">
    <p className="text-xs text-white/70">{label}</p>
    <p className="text-lg font-semibold mt-1">{value}</p>
  </div>
);
