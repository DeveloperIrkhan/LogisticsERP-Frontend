"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    CheckCircle,
    XCircle,
    Mail,
    Phone,
    Calendar,
    UserCheck,
} from "lucide-react";
import Spinner from "@/components/Spinner";
import CustomButton from "@/components/CustomButton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getPendingApprovalsAsync, approveUserAsync, rejectUserAsync, getAllRolesAsync } from "./api";
import { IRoleResponseDto, IUserResponseDto } from "./interfaces";
import { useAuth } from "@/context/AuthContext";

const PendingApprovals = () => {
    const { user: currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [pendingUsers, setPendingUsers] = useState<IUserResponseDto[]>([]);
    const [roles, setRoles] = useState<IRoleResponseDto[]>([]);
    const [selectedRole, setSelectedRole] = useState<Record<string, string>>({});
    const [actioningId, setActioningId] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [usersRes, rolesRes] = await Promise.all([
                getPendingApprovalsAsync(),
                getAllRolesAsync(),
            ]);
            if (usersRes.success) setPendingUsers(usersRes.data);
            if (rolesRes.success) setRoles(rolesRes.data);
        } catch {
            toast.error("Failed to load pending approvals.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApprove = async (userId: string) => {
        const roleId = selectedRole[userId];
        if (!roleId) {
            toast.error("Please select a role before approving.");
            return;
        }
        try {
            setActioningId(userId);
            const res = await approveUserAsync(userId, {
                roleId,
                approvedBy: currentUser?.fullName ?? currentUser?.userName ?? "Admin",
            });
            if (res.success) {
                toast.success(res.message || "User approved!");
                setPendingUsers((prev) => prev.filter((u) => u.userId !== userId));
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setActioningId(null);
        }
    };

    const handleReject = async (userId: string) => {
        try {
            setActioningId(userId);
            const res = await rejectUserAsync(userId, {
                approvedBy: currentUser?.fullName ?? currentUser?.userName ?? "Admin",
            });
            if (res.success) {
                toast.success(res.message || "User request rejected.");
                setPendingUsers((prev) => prev.filter((u) => u.userId !== userId));
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setActioningId(null);
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-gray-color via-red-200 to-gray-color p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 px-4 py-7 rounded-t-2xl bg-linear-to-r from-red-400 to-red-900">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
                            <UserCheck className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl text-white font-extrabold">Pending Approvals</h1>
                            <p className="mt-1 text-white/90">
                                {pendingUsers.length} account(s) waiting for review
                            </p>
                        </div>
                    </div>
                </div>

                {pendingUsers.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-slate-200">
                        <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mt-6">All caught up!</h2>
                        <p className="text-slate-500 mt-2">No accounts are waiting for approval right now.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {pendingUsers.map((u) => (
                            <div
                                key={u.userId}
                                className="bg-white rounded-2xl border border-slate-200 shadow-md p-6"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-yellow-100 text-yellow-700 w-12 h-12 rounded-full flex items-center justify-center font-bold uppercase">
                                        {u.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">{u.fullName}</h3>
                                        <p className="text-sm text-slate-500">@{u.userName}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Mail className="w-4 h-4 text-slate-400" /> {u.email}
                                    </div>
                                    {u.phoneNumber && (
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Phone className="w-4 h-4 text-slate-400" /> {u.phoneNumber}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        Requested {new Date(u.createdAt).toDateString()}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="text-sm font-medium text-slate-500 block mb-1.5">
                                        Assign Role
                                    </label>
                                    <Select
                                        value={selectedRole[u.userId] ?? ""}
                                        onValueChange={(v) =>
                                            setSelectedRole((prev) => ({ ...prev, [u.userId]: v }))
                                        }
                                    >
                                        <SelectTrigger className="w-full bg-gray-color">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((r) => (
                                                <SelectItem key={r.roleId} value={r.roleId}>
                                                    {r.roleName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-3">
                                    <CustomButton
                                        buttonText={actioningId === u.userId ? "..." : "Approve"}
                                        buttonColor="bg-green-600"
                                        buttonHoverColor="bg-green-700"
                                        icon={<CheckCircle className="w-4 h-4" />}
                                        onClickFunction={() => handleApprove(u.userId)}
                                        disabled={actioningId === u.userId}
                                        className="flex-1 py-2.5 rounded-xl"
                                    />
                                    <CustomButton
                                        buttonText={actioningId === u.userId ? "..." : "Reject"}
                                        buttonColor="bg-red-100"
                                        buttonHoverColor="bg-red-600"
                                        icon={<XCircle className="w-4 h-4 text-red-600 group-hover:text-white" />}
                                        onClickFunction={() => handleReject(u.userId)}
                                        disabled={actioningId === u.userId}
                                        className="flex-1 py-2.5 rounded-xl text-red-600! hover:text-white!"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingApprovals;
