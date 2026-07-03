"use client";
import {
  Calendar,
  Wrench,
  Gauge,
  Banknote,
  Building2,
  FileText,
  Receipt,
  User,
  Save,
  Hash,
} from "lucide-react";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMaintenanceUpdateDto, MAINTENANCE_TYPES } from "@/modules/maintenance/types";
import { getMaintenanceByIdAsync, updateMaintenanceAsync } from "@/modules/maintenance/api";


const UpdateMaintenance = () => {
  const params = useParams();
  const router = useRouter();
  const maintenanceId = params?.maintenanceId as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [maintenance, setMaintenance] = useState<IMaintenanceUpdateDto>({
    maintenanceRecordId: "",
    maintenanceDate: new Date(),
    currentKm: 0,
    cost: 0,
    description: "",
    maintenanceType: "",
    workshopName: "",
    changedParts: "",
    invoiceNumber: "",
    nextMaintenanceKm: undefined,
    nextMaintenanceDate: undefined,
  });

  useEffect(() => {
    if (!maintenanceId) return;
    const fetchRecord = async () => {
      try {
        setIsFetching(true);
        const response = await getMaintenanceByIdAsync(maintenanceId);
        if (response.success) {
          const r = response.data;
          setMaintenance({
            maintenanceRecordId: r.maintenanceRecordId,
            driverId: r.driverId ?? "",
            maintenanceDate: new Date(r.maintenanceDate),
            currentKm: r.currentKm,
            cost: r.cost,
            description: r.description,
            maintenanceType: r.maintenanceType ?? "",
            workshopName: r.workshopName ?? "",
            changedParts: r.changedParts ?? "",
            invoiceNumber: r.invoiceNumber ?? "",
            nextMaintenanceKm: r.nextMaintenanceKm,
            nextMaintenanceDate: r.nextMaintenanceDate
              ? new Date(r.nextMaintenanceDate)
              : undefined,
          });
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Failed to load maintenance record.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchRecord();
  }, [maintenanceId]);

  const isFormInvalid = () =>
    maintenance.description === "" ||
    (maintenance.currentKm ?? 0) <= 0 ||
    (maintenance.cost ?? 0) <= 0;

  const dateFields: (keyof IMaintenanceUpdateDto)[] = [
    "maintenanceDate",
    "nextMaintenanceDate",
  ];
  const numberFields: (keyof IMaintenanceUpdateDto)[] = [
    "currentKm",
    "cost",
    "nextMaintenanceKm",
  ];

  const handleChange = <K extends keyof IMaintenanceUpdateDto>(
    name: K,
    value: any,
  ) => {
    setMaintenance((prev) => {
      if (dateFields.includes(name)) {
        return { ...prev, [name]: value ? new Date(value) : undefined };
      }
      if (numberFields.includes(name)) {
        return { ...prev, [name]: value === "" ? undefined : Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await updateMaintenanceAsync(
        maintenanceId,
        maintenance,
      );
      if (response.success) {
        toast.success(response.message || "Maintenance record updated!");
        router.push(
          `/maintenance/get-by-id/${maintenanceId}`,
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <Spinner />;

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          {/* Header */}
          <div className="bg-linear-to-r from-red-500 via-dark-color to-red-900 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                <Wrench className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                  Update Maintenance Record
                </h1>
                <p className="text-red-100 mt-2 text-sm">
                  Update only the fields you want to change.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Maintenance Type Dropdown */}
                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="text-md font-medium text-slate-500 group-hover:text-red-500 duration-400 block mb-1">
                      Maintenance Type
                    </label>
                    <Select
                      value={maintenance.maintenanceType}
                      onValueChange={(v) => handleChange("maintenanceType", v)}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {MAINTENANCE_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <CustomInput
                  label="Maintenance Date"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(maintenance.maintenanceDate)}
                  onChange={(v) => handleChange("maintenanceDate", v)}
                />

                <CustomInput
                  label="Current Km *"
                  Icon={Gauge}
                  type="number"
                  className="custom-input w-full"
                  value={maintenance.currentKm ?? ""}
                  onChange={(v) => handleChange("currentKm", v)}
                />

                <CustomInput
                  label="Cost (PKR) *"
                  Icon={Banknote}
                  type="number"
                  className="custom-input w-full"
                  value={maintenance.cost ?? ""}
                  onChange={(v) => handleChange("cost", v)}
                />

                <CustomInput
                  label="Workshop Name"
                  Icon={Building2}
                  type="text"
                  className="custom-input w-full"
                  value={maintenance.workshopName ?? ""}
                  onChange={(v) => handleChange("workshopName", v)}
                />

                <CustomInput
                  label="Invoice Number"
                  Icon={Receipt}
                  type="text"
                  className="custom-input w-full"
                  value={maintenance.invoiceNumber ?? ""}
                  onChange={(v) => handleChange("invoiceNumber", v)}
                />

                <CustomInput
                  label="Changed Parts"
                  Icon={Hash}
                  type="text"
                  className="custom-input w-full"
                  value={maintenance.changedParts ?? ""}
                  onChange={(v) => handleChange("changedParts", v)}
                />

                <CustomInput
                  label="Description *"
                  Icon={FileText}
                  type="text"
                  className="custom-input w-full"
                  value={maintenance.description ?? ""}
                  onChange={(v) => handleChange("description", v)}
                />

                <CustomInput
                  label="Next Maintenance Km"
                  Icon={Gauge}
                  type="number"
                  className="custom-input w-full"
                  value={maintenance.nextMaintenanceKm ?? ""}
                  onChange={(v) => handleChange("nextMaintenanceKm", v)}
                />

                <CustomInput
                  label="Next Maintenance Date"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(maintenance.nextMaintenanceDate)}
                  onChange={(v) => handleChange("nextMaintenanceDate", v)}
                />
              </div>

              <div className="flex justify-end gap-3">
                <CustomButton
                  buttonColor="bg-slate-400"
                  buttonHoverColor="bg-slate-600"
                  type="button"
                  onClickFunction={() => router.back()}
                  className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                  buttonText="Cancel"
                />
                <CustomButton
                  buttonColor="bg-red-500"
                  buttonHoverColor="bg-red-900"
                  type="submit"
                  disabled={isFormInvalid() || isLoading}
                  icon={<Save />}
                  className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                  buttonText={isLoading ? "Updating..." : "Update Record"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UpdateMaintenance;