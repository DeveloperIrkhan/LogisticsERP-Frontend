"use client";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  FileText,
  Save,
  Gauge,
  Heart,
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

import { IDutyUpdateDto, DutyType, DutyStatus } from "./dutyTypes";
import { getDutyByIdAsync, updateDutyAsync } from "./api";

const UpdateDuty = () => {
  const params = useParams();
  const router = useRouter();
  const dutyId = params?.dutyId as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [duty, setDuty] = useState<IDutyUpdateDto>({
    fromLocation: "",
    toLocation: "",
    purpose: "",
    officerName: "",
    donor: "",
    remarks: "",
    dutyType: undefined,
    status: undefined,
    dateIn: undefined,
    killometerOut: undefined,
    killometerIn: undefined,
    totalKm: undefined,
    totalHours: undefined,
  });

  // ── Fetch existing duty ─────────────────────────────────
  useEffect(() => {
    if (!dutyId) return;

    const fetchDuty = async () => {
      try {
        setIsFetching(true);
        const response = await getDutyByIdAsync(dutyId);

        if (response.success) {
          const d = response.data;
          setDuty({
            fromLocation: d.fromLocation,
            toLocation: d.toLocation,
            purpose: d.purpose,
            officerName: d.officerName,
            donor: d.donor ?? "",
            remarks: d.remarks ?? "",
            dutyType: d.dutyType,
            status: d.status,
            dateIn: d.dateIn ? new Date(d.dateIn) : undefined,
            killometerOut: d.killometerOut,
            killometerIn: d.killometerIn,
            totalKm: d.totalKm,
            totalHours: d.totalHours,
          });
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("Failed to load duty record.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchDuty();
  }, [dutyId]);

  const isFormInvalid = () =>
    duty.fromLocation === "" ||
    duty.toLocation === "" ||
    duty.purpose === "" ||
    duty.officerName === "";

  const dateFields: (keyof IDutyUpdateDto)[] = ["dateIn"];
  const numberFields: (keyof IDutyUpdateDto)[] = [
    "killometerOut",
    "killometerIn",
    "totalKm",
    "totalHours",
  ];

  const handleChange = <K extends keyof IDutyUpdateDto>(
    name: K,
    value: any,
  ) => {
    setDuty((prev) => {
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
      const response = await updateDutyAsync(dutyId, duty);

      if (response.success) {
        toast.success(response.message || "Duty updated successfully!");
        router.push(`/duty/get-single-id/${dutyId}`);
      } else {
        toast.error(response.message || "Failed to update duty.");
      }
    } catch {
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
                <Clock className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                  Update Duty Record
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

                {/* Duty Type */}
                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                      Duty Type
                    </label>
                    <Select
                      value={duty.dutyType}
                      onValueChange={(v) =>
                        handleChange("dutyType", v as DutyType)
                      }
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Duty Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(DutyType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-6 px-4 py-4 bg-gray-color hover:bg-gray-300 rounded-2xl group transition-all duration-300">
                  <div className="bg-red-100 text-red-600 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <label className="text-md font-medium text-slate-500 group-hover:text-red-500 block mb-1">
                      Status
                    </label>
                    <Select
                      value={duty.status}
                      onValueChange={(v) =>
                        handleChange("status", v as DutyStatus)
                      }
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(DutyStatus).map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <CustomInput
                  label="From Location *"
                  Icon={MapPin}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Islamabad HQ"
                  value={duty.fromLocation ?? ""}
                  onChange={(v) => handleChange("fromLocation", v)}
                />

                <CustomInput
                  label="To Location *"
                  Icon={MapPin}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Lahore Office"
                  value={duty.toLocation ?? ""}
                  onChange={(v) => handleChange("toLocation", v)}
                />

                <CustomInput
                  label="Purpose *"
                  Icon={FileText}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Supply delivery"
                  value={duty.purpose ?? ""}
                  onChange={(v) => handleChange("purpose", v)}
                />

                <CustomInput
                  label="Officer Name *"
                  Icon={User}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g Maj. Ali Hassan"
                  value={duty.officerName ?? ""}
                  onChange={(v) => handleChange("officerName", v)}
                />

                <CustomInput
                  label="Date In"
                  Icon={Calendar}
                  type="date"
                  className="custom-input w-full"
                  value={formatDate(duty.dateIn)}
                  onChange={(v) => handleChange("dateIn", v)}
                />

                <CustomInput
                  label="Odometer Out (km)"
                  Icon={Gauge}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 45000"
                  value={duty.killometerOut ?? ""}
                  onChange={(v) => handleChange("killometerOut", v)}
                />

                <CustomInput
                  label="Odometer In (km)"
                  Icon={Gauge}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 47500"
                  value={duty.killometerIn ?? ""}
                  onChange={(v) => handleChange("killometerIn", v)}
                />

                <CustomInput
                  label="Total Km"
                  Icon={Gauge}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 2500"
                  value={duty.totalKm ?? ""}
                  onChange={(v) => handleChange("totalKm", v)}
                />

                <CustomInput
                  label="Total Hours"
                  Icon={Clock}
                  type="number"
                  className="custom-input w-full"
                  placeholder="e.g 6.5"
                  value={duty.totalHours ?? ""}
                  onChange={(v) => handleChange("totalHours", v)}
                />

                <CustomInput
                  label="Donor (optional)"
                  Icon={Heart}
                  type="text"
                  className="custom-input w-full"
                  placeholder="e.g PRCS"
                  value={duty.donor ?? ""}
                  onChange={(v) => handleChange("donor", v)}
                />

                <CustomInput
                  label="Remarks (optional)"
                  Icon={FileText}
                  type="text"
                  className="custom-input w-full"
                  placeholder="Any additional notes..."
                  value={duty.remarks ?? ""}
                  onChange={(v) => handleChange("remarks", v)}
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
                  buttonText={isLoading ? "Updating..." : "Update Duty"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UpdateDuty;