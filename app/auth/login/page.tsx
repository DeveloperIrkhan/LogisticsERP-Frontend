"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { images } from "@/public/images";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const LoginForm = () => {
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [userNameOrEmail, setUserNameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await login({ userNameOrEmail, password });
            if (res.success) {
                toast.success(res.message || "Welcome back!");
                const next = searchParams.get("next") || "/";
                router.push(next);
            } else {
                toast.error(res.message || "Login failed.");
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
                <div className="bg-black p-8 text-center">
                    <Image
                        src={images.logo}
                        alt="PRCS Logo"
                        width={160}
                        height={80}
                        className="h-14 w-auto mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-extrabold text-white">Welcome Back</h1>
                    <p className="text-red-100 text-sm mt-1">Sign in to PRCS Logistics ERP</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">
                    <CustomInput
                        label="Username or Email"
                        Icon={Mail}
                        type="text"
                        className="custom-input w-full"
                        placeholder="you@example.com"
                        value={userNameOrEmail}
                        onChange={(v) => setUserNameOrEmail(String(v))}
                    />
                    <CustomInput
                        label="Password"
                        Icon={Lock}
                        type="password"
                        className="custom-input w-full"
                        placeholder="••••••••"
                        value={password}
                        onChange={(v) => setPassword(String(v))}
                    />

                    <div className="flex justify-end -mt-2">
                        <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-800 font-medium">
                            Forgot password?
                        </Link>
                    </div>

                    <CustomButton
                        buttonText={isLoading ? "Signing in..." : "Login"}
                        buttonColor="bg-red-600"
                        buttonHoverColor="bg-red-900"
                        type="submit"
                        icon={<LogIn className="w-4 h-4" />}
                        disabled={isLoading || !userNameOrEmail || !password}
                        className="w-full py-3 rounded-full mt-2"
                    />

                    <p className="text-center text-sm text-slate-500 mt-2">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="text-red-600 font-semibold hover:text-red-800">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

const LoginPage = () => (
    <Suspense fallback={null}>
        <LoginForm />
    </Suspense>
);

export default LoginPage;
