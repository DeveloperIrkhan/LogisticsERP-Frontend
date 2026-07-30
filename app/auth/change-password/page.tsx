"use client";
import { useState } from "react";
import { KeyRound, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { changePasswordAsync } from "@/modules/auth/api";

const ChangePasswordForm = () => {
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
                toast.success(res.message || "Password changed successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(res.message || "Failed to change password.");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="py-8">
            <div className="max-w-xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                    <div className="bg-linear-to-r from-red-500 via-dark-color to-red-900 p-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
                                <KeyRound className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-extrabold text-white">Change Password</h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">
                        <CustomInput
                            label="Current Password"
                            Icon={Lock}
                            type="password"
                            className="custom-input w-full"
                            value={currentPassword}
                            onChange={(v) => setCurrentPassword(String(v))}
                        />
                        <CustomInput
                            label="New Password"
                            Icon={Lock}
                            type="password"
                            className="custom-input w-full"
                            placeholder="At least 6 characters"
                            value={newPassword}
                            onChange={(v) => setNewPassword(String(v))}
                        />
                        <CustomInput
                            label="Confirm New Password"
                            Icon={Lock}
                            type="password"
                            className="custom-input w-full"
                            value={confirmPassword}
                            onChange={(v) => setConfirmPassword(String(v))}
                        />

                        <div className="flex justify-end">
                            <CustomButton
                                buttonText={isLoading ? "Saving..." : "Update Password"}
                                buttonColor="bg-red-600"
                                buttonHoverColor="bg-red-900"
                                type="submit"
                                disabled={isFormInvalid() || isLoading}
                                className="w-full sm:w-1/2 py-3 rounded-full"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
};

const ChangePasswordPage = () => (
    <ProtectedRoute>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <ChangePasswordForm />
    </ProtectedRoute>
);

export default ChangePasswordPage;
