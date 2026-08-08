"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Lock, ShieldAlert } from "lucide-react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { changePasswordAsync } from "@/modules/auth/api";

const ForceChangePasswordForm = () => {
    const router = useRouter();
    const { markPasswordChanged } = useAuth();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isFormInvalid = () =>
        !currentPassword || newPassword.length < 6 || newPassword !== confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        try {
            setIsLoading(true);
            const res = await changePasswordAsync({ currentPassword, newPassword });
            if (res.success) {
                toast.success("Password updated! You're all set.");
                markPasswordChanged();
                router.push("/");
            } else {
                toast.error(res.message || "Failed to update password.");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-color via-red-100 to-gray-color p-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-linear-to-r from-red-500 via-dark-color to-red-900 p-8 text-center">
                    <div className="bg-white/20 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ShieldAlert className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-white">Set a New Password</h1>
                    <p className="text-red-100 text-sm mt-1">
                        You're using a temporary password. Please set your own before continuing.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">
                    <CustomInput
                        label="Temporary / Current Password"
                        Icon={Lock}
                        type="password"
                        className="custom-input w-full"
                        placeholder="The password you were given"
                        value={currentPassword}
                        onChange={(v) => setCurrentPassword(String(v))}
                    />
                    <CustomInput
                        label="New Password"
                        Icon={KeyRound}
                        type="password"
                        className="custom-input w-full"
                        placeholder="At least 6 characters"
                        value={newPassword}
                        onChange={(v) => setNewPassword(String(v))}
                    />
                    <CustomInput
                        label="Confirm New Password"
                        Icon={KeyRound}
                        type="password"
                        className="custom-input w-full"
                        value={confirmPassword}
                        onChange={(v) => setConfirmPassword(String(v))}
                    />

                    <CustomButton
                        buttonText={isLoading ? "Saving..." : "Set Password & Continue"}
                        buttonColor="bg-red-600"
                        buttonHoverColor="bg-red-900"
                        type="submit"
                        disabled={isFormInvalid() || isLoading}
                        className="w-full py-3 rounded-full mt-2"
                    />
                </form>
            </div>
        </div>
    );
};

const ForceChangePasswordPage = () => (
    <ProtectedRoute>
        <ForceChangePasswordForm />
    </ProtectedRoute>
);

export default ForceChangePasswordPage;