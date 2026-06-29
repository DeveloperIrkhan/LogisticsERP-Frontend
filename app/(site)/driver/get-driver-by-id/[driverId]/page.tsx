"use client";

import Container from "@/components/Container";
import MidModal from "@/components/Modals/MidModal";
import Spinner from "@/components/Spinner";
import { deleteDriverAsync, getDriverByIdAsync } from "@/modules/drivers/api";
import { DriverStatus, IDriverResponseDto } from "@/modules/drivers/types";
import { images } from "@/public/images";
import {
  Calendar,
  Currency,
  Edit,
  Home,
  PhoneIcon,
  Timeline,
  Trash,
  TypeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCard } from "react-icons/bi";
import { GoNumber } from "react-icons/go";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import { SiNamemc, SiRemark } from "react-icons/si";
import { toast } from "react-toastify";

const page = () => {
  const params = useParams();
  const id = params?.driverId as string;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [driver, setDriver] = useState<IDriverResponseDto>();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteDriverAsync(driver?.driverId as string)
      if (response.success) {
        toast.success(response.message)
        router.push("/driver/get-all-driver")
      }
      else { toast.error(response.message) }
      setIsDeleteOpen(false);

    } catch (error) {
      toast.error("Failed to delete driver");
    } finally {
      setIsDeleting(false);
    }
  };
  useEffect(() => {
    const fetchDriverAsync = async () => {
      try {
        setIsLoading(true);
        const response = await getDriverByIdAsync(id);
        if (response.success) {
          setDriver(response.data);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDriverAsync();
  }, [id]);

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center min-h-[70vh]">
        <Spinner />
      </Container>
    );
  }

  if (!driver) {
    return (
      <Container className="flex justify-center items-center min-h-[70vh]">
        <p className="text-xl text-red-500 font-semibold">no driver found</p>
      </Container>
    );
  }

  const driverDetails = [
    {
      label: "Driver Id",
      value: driver.driverId,
      icon: GoNumber,
    },
    {
      label: "Name",
      value: driver.fullName,
      icon: SiNamemc,
    },
    {
      label: "CNIC",
      value: driver.cnic,
      icon: BiCard,
    },
    {
      label: "Mobile Number",
      value: driver.mobileNumber,
      icon: PhoneIcon,
    },
    {
      label: "Email Adress",
      value: driver.email,
      icon: MdOutlineEmail,
    },
    {
      label: "Address",
      value: driver.address,
      icon: Home,
    },
    {
      label: "license Number",
      value: driver.licenseNumber,
      icon: BiCard,
    },
    {
      label: "license Expiry",
      value: driver.licenseExpiry,
      icon: Timeline,
    },
    {
      label: "Type of License",
      value: driver.typeOfLicence,
      icon: TypeIcon,
    },
    {
      label: "Date of Joining",
      value: driver.dateOfJoining,
      icon: Calendar,
    },
    {
      label: "Driver Remarks",
      value: driver.description,
      icon: SiRemark,
    },
  ];
  // status , licenseUrl photoUrl
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
                  Driver Information
                </h1>

                <p className="text-red-100 mt-2 text-sm break-all">
                  {driver.driverId}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl shadow-md">
              {/* Driver Photo */}
              <div className="flex flex-col items-center bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
                <p className="text-sm font-semibold text-gray-600 mb-6">
                  Driver Photo
                </p>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <Image
                    height={220}
                    width={220}
                    alt="driver photo"
                    src={driver.photoUrl?.trim() ? driver.photoUrl : images.profile}
                    className="object-cover h-72 w-72 hover:scale-105 transition duration-300"
                  />
                </div>
              </div>

              {/* License Image */}
              <div className="flex flex-col items-center bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
                <p className="text-sm font-semibold text-gray-600 mb-6">
                  License Image
                </p>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <Image
                    height={220}
                    width={220}
                    alt="driver license"
                    src={driver.licenseUrl?.trim() ? driver.licenseUrl : images.profile}
                    className="object-cover h-72 w-full hover:scale-105 transition duration-300"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {driverDetails.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="group capitalize relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-gray-color to-slate-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-color rounded-full blur-3xl opacity-40"></div>

                    <div className="relative flex gap-4">
                      <div className="bg-red-100 text-red-600 p-4 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm text-black font-medium uppercase">
                          {item.label}
                        </p>

                        <h3
                          className="text-sm font-normal overflow-hidden
                         text-slate-800 mt-1 wrap-break-word"
                        >
                          {(item.value as string) || "-"}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="uppercase rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-center gap-4">
                  <Link
                    href={"/driver/update-driver/" + driver.driverId}
                    className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    <Edit className="w-6 h-6" />
                  </Link>
                  <div onClick={() => setIsDeleteOpen(true)}
                    className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300">
                    <Trash className="w-6 h-6" />
                  </div>
                  <div className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300">
                    <GrUserWorker className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Banner */}
            <div className="mt-10 rounded-3xl bg-linear-to-r from-red-600 to-red-900 p-8 shadow-xl">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div>
                  <h2 className="text-3xl uppercase font-bold text-white">
                    {driver.fullName}
                  </h2>

                  <p className="text-red-100 mt-2 text-lg">
                    Registration #: {driver.driverId}
                  </p>
                </div>

                <div className="bg-white/20 backdrop-blur-lg px-8 py-5 rounded-2xl border border-white/20">
                  <p className="text-red-100 text-sm">Driver Status</p>

                  <h3 className="text-2xl font-bold text-white">
                    {driver.status}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MidModal
        isOpen={isDeleteOpen}
        title="Delete Driver"
        description="Are you sure you want to delete this driver? 
        This action cannot be undone."
        itemName={driver?.fullName}
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setIsDeleteOpen(false)}
      />
    </Container>
  );
};

export default page;
