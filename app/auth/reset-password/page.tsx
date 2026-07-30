"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, KeyRound } from "lucide-react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { resetPasswordAsync } from "@/modules/auth/api";
import { images } from "@/public/images";
import Image from "next/image";

const ResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") ?? "";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isFormInvalid = () =>
        !token || newPassword.length < 6 || newPassword !== confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        try {
            setIsLoading(true);
            const res = await resetPasswordAsync({ token, newPassword });
            if (res.success) {
                toast.success(res.message || "Password reset successfully!");
                router.push("/login");
            } else {
                toast.error(res.message || "This reset link is invalid or has expired.");
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
                    <Image
                        src={images.logo}
                        alt="PRCS Logo"
                        width={160}
                        height={80}
                        className="h-14 w-auto mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-extrabold text-white">Reset Password</h1>
                    <p className="text-red-100 text-sm mt-1">Choose a new password below.</p>
                </div>

                <div className="p-8">
                    {!token ? (
                        <p className="text-center text-red-600">
                            This reset link is missing a token. Please use the link from your email.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                                placeholder="Re-enter your new password"
                                value={confirmPassword}
                                onChange={(v) => setConfirmPassword(String(v))}
                            />

                            <CustomButton
                                buttonText={isLoading ? "Resetting..." : "Reset Password"}
                                buttonColor="bg-red-600"
                                buttonHoverColor="bg-red-900"
                                type="submit"
                                icon={<KeyRound className="w-4 h-4" />}
                                disabled={isFormInvalid() || isLoading}
                                className="w-full py-3 rounded-full mt-2"
                            />
                        </form>
                    )}

                    <p className="text-center text-sm text-slate-500 mt-4">
                        <Link href="/login" className="text-red-600 font-semibold hover:text-red-800">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const ResetPasswordPage = () => (
    <Suspense fallback={null}>
        <ResetPasswordForm />
    </Suspense>
);

export default ResetPasswordPage;
