"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShieldCheck, Users, Plus, Tag } from "lucide-react";
import Spinner from "@/components/Spinner";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { getAllRolesAsync, createRoleAsync } from "./api";
import { IRoleResponseDto, getRoleStyle } from "./interfaces";

const ViewAllRoles = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState<IRoleResponseDto[]>([]);
    const [newRoleName, setNewRoleName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const fetchRoles = async () => {
        try {
            setIsLoading(true);
            const res = await getAllRolesAsync();
            if (res.success) setRoles(res.data);
            else toast.error(res.message);
        } catch {
            toast.error("Failed to load roles.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRoleName.trim()) return;
        try {
            setIsCreating(true);
            const res = await createRoleAsync({ roleName: newRoleName.trim() });
            if (res.success) {
                toast.success(res.message || "Role created successfully!");
                setRoles((prev) => [...prev, res.data]);
                setNewRoleName("");
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsCreating(false);
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
            <div className="max-w-5xl mx-auto">

                {/* Header Banner */}
                <div className="mb-10 px-4 py-7 rounded-t-2xl bg-linear-to-r from-red-400 to-red-900">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl text-white font-extrabold">Roles</h1>
                            <p className="mt-1 text-white/90">
                                {roles.length} role(s) — controls what each user can access
                            </p>
                        </div>
                    </div>
                </div>

                {/* Create role */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-red-600" /> Add a New Role
                    </h2>
                    <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <CustomInput
                                label="Role Name"
                                Icon={Tag}
                                type="text"
                                className="custom-input w-full"
                                placeholder="e.g Auditor, Warehouse Keeper"
                                value={newRoleName}
                                onChange={(v) => setNewRoleName(String(v))}
                            />
                        </div>
                        <div className="flex items-end">
                            <CustomButton
                                buttonText={isCreating ? "Adding..." : "Add Role"}
                                buttonColor="bg-red-600"
                                buttonHoverColor="bg-red-900"
                                type="submit"
                                icon={<Plus className="w-4 h-4" />}
                                disabled={!newRoleName.trim() || isCreating}
                                className="px-6 py-3.5 rounded-xl whitespace-nowrap"
                            />
                        </div>
                    </form>
                </div>

                {/* Roles grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roles.map((role) => (
                        <div
                            key={role.roleId}
                            className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 flex items-center justify-between"
                        >
                            <div>
                                <span
                                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-3 ${getRoleStyle(role.roleName)}`}
                                >
                                    {role.roleName}
                                </span>
                                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                    <Users className="w-4 h-4" />
                                    {role.userCount} user{role.userCount === 1 ? "" : "s"}
                                </div>
                            </div>
                            <div className="bg-red-100 text-red-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {roles.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-slate-200">
                        <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">No roles found yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAllRoles;
