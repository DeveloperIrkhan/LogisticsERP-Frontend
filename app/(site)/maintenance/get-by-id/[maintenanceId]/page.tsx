"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Wrench,
  Calendar,
  Gauge,
  Banknote,
  Building2,
  FileText,
  Receipt,
  Truck,
  User,
  Edit,
  Trash,
  Hash,
  AlertTriangle,
} from "lucide-react";
import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import Link from "next/link";
import { toast } from "react-toastify";
import MidModal from "@/components/Modals/MidModal";
import { IMaintenanceResponseDto } from "@/modules/maintenance/types";
import { deleteMaintenanceAsync, getMaintenanceByIdAsync } from "@/modules/maintenance/api";

const GetMaintenanceById = () => {
  const params = useParams();
  const router = useRouter();
  const maintenanceId = params?.maintenanceId as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState<IMaintenanceResponseDto | null>(null);

  const customStyle =
    "absolute -top-12 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition";

  useEffect(() => {
    if (!maintenanceId) return;
    const fetchRecord = async () => {
      try {
        setIsLoading(true);
        const response = await getMaintenanceByIdAsync(maintenanceId);
        if (response.success) {
          setRecord(response.data);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching maintenance record:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecord();
  }, [maintenanceId]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteMaintenanceAsync(maintenanceId);
      if (response.success) {
        toast.success("Maintenance record deleted successfully!");
        router.push("/maintenance/get-maintenance");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center min-h-[70vh]">
        <Spinner />
      </Container>
    );
  }

  if (!record) {
    return (
      <Container className="flex justify-center items-center min-h-[70vh]">
        <p className="text-xl text-red-500 font-semibold">
          Maintenance record not found
        </p>
      </Container>
    );
  }

  const isOverdue =
    record.nextMaintenanceDate &&
    new Date(record.nextMaintenanceDate) < new Date();

  const details = [
    {
      label: "Vehicle ID",
      value: record.vehicleId,
      icon: Truck,
    },
    {
      label: "Driver ID",
      value: record.driverId,
      icon: User,
    },
    {
      label: "Maintenance Date",
      value: new Date(record.maintenanceDate).toDateString(),
      icon: Calendar,
    },
    {
      label: "Maintenance Type",
      value: record.maintenanceType,
      icon: Wrench,
    },
    {
      label: "Current Km",
      value: `${record.currentKm} km`,
      icon: Gauge,
    },
    {
      label: "Cost",
      value: `PKR ${record.cost.toLocaleString()}`,
      icon: Banknote,
    },
    {
      label: "Workshop Name",
      value: record.workshopName,
      icon: Building2,
    },
    {
      label: "Invoice Number",
      value: record.invoiceNumber,
      icon: Receipt,
    },
    {
      label: "Changed Parts",
      value: record.changedParts,
      icon: Hash,
    },
    {
      label: "Description",
      value: record.description,
      icon: FileText,
    },
    {
      label: "Next Maintenance Km",
      value: record.nextMaintenanceKm
        ? `${record.nextMaintenanceKm} km`
        : undefined,
      icon: Gauge,
    },
    {
      label: "Next Maintenance Date",
      value: record.nextMaintenanceDate
        ? new Date(record.nextMaintenanceDate).toDateString()
        : undefined,
      icon: Calendar,
    },
    {
      label: "Added By",
      value: record.addedBy,
      icon: User,
    },
  ];

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          {/* Header */}
          <div className="bg-linear-to-r from-red-600 via-red-700 to-red-900 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                <Wrench className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-white tracking-wide">
                  Maintenance Record
                </h1>
                <p className="text-red-100 mt-2 text-sm break-all">
                  {record.maintenanceRecordId}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            {/* Overdue Alert */}
            {isOverdue && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl mb-6">
                <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                <p className="font-semibold">
                  Next maintenance is overdue! Scheduled:{" "}
                  {new Date(record.nextMaintenanceDate!).toDateString()}
                </p>
              </div>
            )}

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

              {/* Action Buttons */}
              <div className="uppercase rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-center gap-4">
                  <div className="relative flex group">
                    <Link
                      href={`/maintenance/update-maintenance/${record.maintenanceRecordId}`}
                      className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <Edit className="w-6 h-6" />
                    </Link>
                    <span className={customStyle}>Edit Record</span>
                  </div>
                  <div className="flex group relative">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-red-100 text-red-600 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <Trash className="w-6 h-6" />
                    </button>
                    <span className={customStyle}>Delete Record</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Banner */}
            <div className="mt-10 rounded-3xl bg-linear-to-r from-red-600 to-red-900 p-8 shadow-xl">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div>
                  <h2 className="text-3xl uppercase font-bold text-white">
                    {record.workshopName || "Workshop"}
                  </h2>
                  <p className="text-red-100 mt-2 text-lg">
                    {record.maintenanceType || "Maintenance Record"}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-lg px-8 py-5 rounded-2xl border border-white/20">
                  <p className="text-red-100 text-sm">Total Cost</p>
                  <h3 className="text-2xl font-bold text-white">
                    PKR {record.cost.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MidModal
        isOpen={isModalOpen}
        title="Delete Maintenance Record"
        description="Are you sure you want to delete this maintenance record? This action cannot be undone."
        itemName={`${record.workshopName || "Workshop"} — PKR ${record.cost.toLocaleString()}`}
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default GetMaintenanceById;