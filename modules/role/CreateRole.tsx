"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ShieldCheck, Tag, Save } from "lucide-react";
import Container from "@/components/Container";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { createRoleAsync } from "./api";
import { WELL_KNOWN_ROLES } from "./interfaces";

const CreateRole = () => {
    const router = useRouter();
    const [roleName, setRoleName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isFormInvalid = () => roleName.trim() === "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await createRoleAsync({ roleName: roleName.trim() });
            if (response.success) {
                toast.success(response.message || "Role created successfully!");
                router.push("/roles/view-all");
            } else {
                toast.error(response.message || "Failed to create role.");
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="py-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                    {/* Header */}
                    <div className="bg-linear-to-r from-red-500 via-dark-color to-red-900 p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                            <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl w-fit">
                                <ShieldCheck className="w-12 h-12 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide">
                                    Add a New Role
                                </h1>
                                <p className="text-red-100 mt-2 text-sm">
                                    Create a custom role beyond the default set — assign it to users
                                    from the All Users or Pending Approvals screens.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <CustomInput
                                label="Role Name *"
                                Icon={Tag}
                                type="text"
                                className="custom-input w-full"
                                placeholder="e.g Auditor, Warehouse Keeper"
                                value={roleName}
                                onChange={(v) => setRoleName(String(v))}
                            />

                            <div className="bg-gray-color rounded-2xl p-5">
                                <p className="text-sm font-medium text-slate-500 mb-2">
                                    Default roles already seeded:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {WELL_KNOWN_ROLES.map((r) => (
                                        <span
                                            key={r}
                                            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600"
                                        >
                                            {r}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <CustomButton
                                    buttonColor="bg-red-500"
                                    buttonHoverColor="bg-red-900"
                                    type="submit"
                                    disabled={isFormInvalid() || isLoading}
                                    icon={<Save />}
                                    className="w-1/2 md:w-1/4 text-white py-2 rounded-full transition"
                                    buttonText={isLoading ? "Saving..." : "Save Role"}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CreateRole;
