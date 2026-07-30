"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Users,
    Mail,
    ShieldCheck,
    PowerOff,
    Power,
    Trash,
} from "lucide-react";
import Spinner from "@/components/Spinner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    getAllUsersAsync,
    getAllRolesAsync,
    updateUserRoleAsync,
    deactivateUserAsync,
    reactivateUserAsync,
    deleteUserAsync,
} from "./api";
import { IRoleResponseDto, IUserResponseDto, UserStatus, getStatusStyle } from "./interfaces";
import MidModal from "@/components/Modals/MidModal";
import Link from "next/link";

const AllUsers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<IUserResponseDto[]>([]);
    const [roles, setRoles] = useState<IRoleResponseDto[]>([]);
    const [filter, setFilter] = useState<UserStatus | "All">("All");
    const [deleteTarget, setDeleteTarget] = useState<IUserResponseDto | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [usersRes, rolesRes] = await Promise.all([getAllUsersAsync(), getAllRolesAsync()]);
           console.log("users", usersRes)
           console.log("rolesRes", rolesRes)
            if (usersRes.success) setUsers(usersRes.data);
            if (rolesRes.success) setRoles(rolesRes.data);
        } catch {
            toast.error("Failed to load users.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRoleChange = async (userId: string, roleId: string) => {
        try {
            const res = await updateUserRoleAsync(userId, { roleId });
            if (res.success) {
                toast.success("Role updated successfully!");
                setUsers((prev) => prev.map((u) => (u.userId === userId ? res.data : u)));
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        }
    };

    const handleToggleActive = async (u: IUserResponseDto) => {
        try {
            const res =
                u.status === UserStatus.Active
                    ? await deactivateUserAsync(u.userId)
                    : await reactivateUserAsync(u.userId);
            if (res.success) {
                toast.success(res.message);
                setUsers((prev) => prev.map((x) => (x.userId === u.userId ? res.data : x)));
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            setIsDeleting(true);
            const res = await deleteUserAsync(deleteTarget.userId);
            if (res.success) {
                toast.success("User deleted successfully!");
                setUsers((prev) => prev.filter((u) => u.userId !== deleteTarget.userId));
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsDeleting(false);
            setDeleteTarget(null);
        }
    };

    if (isLoading) return <Spinner />;

    const filtered = filter === "All" ? users : users.filter((u) => u.status === filter);
    const statusTabs: (UserStatus | "All")[] = ["All", UserStatus.Active, UserStatus.Pending, UserStatus.Inactive, UserStatus.Rejected];

    return (
        <div className="min-h-screen  w-full bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 px-4 py-7 rounded-t-2xl bg-linear-to-r from-red-400 to-red-900">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl text-white font-extrabold">All Users</h1>
                            <p className="mt-1 text-white/90">{users.length} account(s) total</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {statusTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === tab
                                ? "bg-red-600 text-white shadow-md"
                                : "bg-white text-slate-600 border border-slate-200 hover:border-red-300"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                    <div className="flex">
                        <Link className="bg-lime-600 hover:bg-lime-800 hoverEffect px-4 py-2 text-white rounded-xl" href={"/dashboard/users/approval"}>Approval List</Link>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-left text-slate-500 uppercase text-xs">
                                <th className="px-5 py-4">User</th>
                                <th className="px-5 py-4">Role</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4">Joined</th>
                                <th className="px-5 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u) => (
                                <tr key={u.userId} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <p className="font-semibold text-slate-800">{u.fullName}</p>
                                        <p className="text-xs text-slate-500 flex items-center gap-1">
                                            <Mail className="w-3 h-3" /> {u.email}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4 w-48">
                                        <Select
                                            value={u.roleId}
                                            onValueChange={(v) => handleRoleChange(u.userId, v)}
                                        >
                                            <SelectTrigger className="w-full bg-gray-color">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((r) => (
                                                    <SelectItem key={r.roleId} value={r.roleId}>
                                                        {r.roleName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusStyle(u.status)}`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-slate-500">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-2">
                                            {u.status === UserStatus.Active || u.status === UserStatus.Inactive ? (
                                                <button
                                                    onClick={() => handleToggleActive(u)}
                                                    title={u.status === UserStatus.Active ? "Deactivate" : "Reactivate"}
                                                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                                                >
                                                    {u.status === UserStatus.Active ? (
                                                        <PowerOff className="w-4 h-4" />
                                                    ) : (
                                                        <Power className="w-4 h-4" />
                                                    )}
                                                </button>
                                            ) : null}
                                            <button
                                                onClick={() => setDeleteTarget(u)}
                                                title="Delete"
                                                className="p-2 rounded-lg bg-red-100 hover:bg-red-600 text-red-600 hover:text-white"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="p-12 text-center text-slate-500">
                            <ShieldCheck className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                            No users match this filter.
                        </div>
                    )}
                </div>
            </div>

            <MidModal
                isOpen={!!deleteTarget}
                title="Delete User"
                description="Are you sure you want to permanently delete this user account?"
                itemName={deleteTarget ? `${deleteTarget.fullName} (@${deleteTarget.userName})` : ""}
                isDeleting={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setDeleteTarget(null)}
            />
        </div>
    );
};

export default AllUsers;
