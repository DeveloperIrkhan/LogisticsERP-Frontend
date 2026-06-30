"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Fuel as FuelIcon,
  Calendar,
  Gauge,
  Banknote,
  Building2,
  MapPin,
  Receipt,
  Heart,
  FileText,
  Truck,
  User,
  Edit,
  Trash,
  Droplet,
  CreditCard,
} from "lucide-react";

import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import Link from "next/link";
import { toast } from "react-toastify";
import MidModal from "@/components/Modals/MidModal";
import { deleteFuelAsync, getFuelByIdAsync } from "@/modules/Fuel/api";
import { IFuelResponseDto } from "@/modules/Fuel/types";

const GetFuelById = () => {
  const params = useParams();
  const router = useRouter();
  const fuelId = params?.fuelId as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fuel, setFuel] = useState<IFuelResponseDto | null>(null);

  const customStyle =
    "absolute -top-12 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition";

  useEffect(() => {
    if (!fuelId) return;

    const fetchFuel = async () => {
      try {
        setIsLoading(true);
        const response = await getFuelByIdAsync(fuelId);
        if (response.success) {
          setFuel(response.data);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching fuel record:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFuel();
  }, [fuelId]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteFuelAsync(fuelId);

      if (response.success) {
        toast.success(response.message || "Fuel record deleted successfully!");
        router.push("/fuel/full-record");
      } else {
        toast.error(response.message || "Failed to delete fuel record.");
      }
    } catch (error) {
      console.error("Error deleting fuel record:", error);
      toast.error("Something went wrong while deleting the fuel record.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return <Spinner />
  }

  if (!fuel) {
    return (
      <Container className="flex justify-center items-center min-h-[70vh]">
        <p className="text-xl text-red-500 font-semibold">
          Fuel record not found
        </p>
      </Container>
    );
  }

  const details = [
    {
      label: "Vehicle ID",
      value: fuel.vehicle?.modelName,
      icon: Truck,
    },
    {
      label: "Driver ID",
      value: fuel.driver?.fullName,
      icon: User,
    },
    {
      label: "Fueling Date",
      value: new Date(fuel.fuelingDate).toDateString(),
      icon: Calendar,
    },
    {
      label: "Odometer Reading",
      value: `${fuel.odoMeterReading} km`,
      icon: Gauge,
    },
    {
      label: "Liters",
      value: `${fuel.liters} L`,
      icon: FuelIcon,
    },
    {
      label: "Cost Per Liter",
      value: `PKR ${fuel.costPerLiter}`,
      icon: Banknote,
    },
    {
      label: "Total Cost",
      value: `PKR ${fuel.totalCost.toLocaleString()}`,
      icon: Banknote,
    },
    {
      label: "Mileage",
      value: fuel.mileage ? `${fuel.mileage} km/Lt` : "-",
      icon: Gauge,
    },
    {
      label: "Station Name",
      value: fuel.stationName,
      icon: Building2,
    },
    {
      label: "Station Location",
      value: fuel.stationLocation,
      icon: MapPin,
    },
    {
      label: "Province",
      value: fuel.province,
      icon: MapPin,
    },
    {
      label: "Receipt Number",
      value: fuel.receiptNumber,
      icon: Receipt,
    },
    {
      label: "Fuel Type",
      value: fuel.fuelType,
      icon: Droplet,
    },
    {
      label: "Payment Method",
      value: fuel.paymentMethod,
      icon: CreditCard,
    },
    {
      label: "Donor",
      value: fuel.donor,
      icon: Heart,
    },
    {
      label: "Notes",
      value: fuel.notes,
      icon: FileText,
    },
  ];

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          <div className="bg-linear-to-r from-red-600 via-red-700 to-red-900 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                <FuelIcon className="w-12 h-12 text-white" />
              </div>

              <div>
                <h1 className="text-4xl font-extrabold text-white tracking-wide">
                  Fuel Entry Details
                </h1>

                <p className="text-red-100 mt-2 text-sm break-all">
                  {fuel.fuelId}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {details.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="group uppercase relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-gray-color to-slate-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-color rounded-full blur-3xl opacity-40"></div>

                    <div className="relative flex gap-4">
                      <div className="bg-red-100 text-red-600 p-4 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm text-slate-500 font-medium">
                          {item.label}
                        </p>

                        <h3 className="text-lg font-bold text-slate-800 mt-1 wrap-break-word">
                          {item.value || "-"}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Action Buttons Card */}
              <div className="uppercase rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-center gap-4">
                  <div className="relative flex group">
                    <Link
                      href={`/fuel/update-fuel-record/${fuel.fuelId}`}
                      className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <Edit className="w-6 h-6" />
                    </Link>
                    <span className={customStyle}>Edit Fuel Entry</span>
                  </div>
                  <div className="flex group relative">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <Trash className="w-6 h-6" />
                    </button>
                    <span className={customStyle}>Delete Fuel Entry</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Banner */}
            <div className="mt-10 rounded-3xl bg-linear-to-r from-red-600 to-red-900 p-8 shadow-xl">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div>
                  <h2 className="text-3xl uppercase font-bold text-white">
                    {fuel.stationName}
                  </h2>

                  <p className="text-red-100 mt-2 text-lg">
                    Fuel Entry #: {fuel.fuelId}
                  </p>
                </div>

                <div className="bg-white/20 backdrop-blur-lg px-8 py-5 rounded-2xl border border-white/20">
                  <p className="text-red-100 text-sm">Total Cost</p>

                  <h3 className="text-2xl font-bold text-white">
                    PKR {fuel.totalCost.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MidModal
        isOpen={isModalOpen}
        title="Delete Fuel Entry"
        description="Are you sure you want to delete this fuel record? This action cannot be undone."
        itemName={`${fuel.stationName} — ${fuel.liters}L`}
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default GetFuelById;