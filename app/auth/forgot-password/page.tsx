"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Send, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { forgotPasswordAsync } from "@/modules/auth/api";
import { images } from "@/public/images";
import Image from "next/image";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await forgotPasswordAsync({ email });
            toast.success(res.message || "If that email exists, a reset link has been sent.");
            setSent(true);
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
                    <h1 className="text-2xl font-extrabold text-white">Forgot Password</h1>
                    <p className="text-red-100 text-sm mt-1">
                        We&apos;ll email you a link to reset it.
                    </p>
                </div>

                <div className="p-8">
                    {sent ? (
                        <div className="text-center py-6">
                            <p className="text-slate-600">
                                If an account with <span className="font-semibold">{email}</span> exists,
                                a password reset link is on its way. Check your inbox (and spam folder).
                            </p>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 mt-6 text-red-600 font-semibold hover:text-red-800"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <CustomInput
                                label="Email Address"
                                Icon={Mail}
                                type="email"
                                className="custom-input w-full"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(v) => setEmail(String(v))}
                            />

                            <CustomButton
                                buttonText={isLoading ? "Sending..." : "Send Reset Link"}
                                buttonColor="bg-red-600"
                                buttonHoverColor="bg-red-900"
                                type="submit"
                                icon={<Send className="w-4 h-4" />}
                                disabled={isLoading || !email}
                                className="w-full py-3 rounded-full mt-2"
                            />

                            <Link
                                href="/login"
                                className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-red-600 mt-2"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to Login
                            </Link>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
