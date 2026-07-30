"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, User, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import { images } from "@/public/images";
import Image from "next/image";
import { IRegisterDto } from "@/modules/auth/types";
import ImageUpload from "@/components/ImageUpload";

const emptyForm = (): IRegisterDto & { confirmPassword: string } => ({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avator: undefined,
    phoneNumber: "",
});

const SignupPage = () => {
    const { register } = useAuth();
    const router = useRouter();
    const [form, setForm] = useState(emptyForm());
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (name: keyof typeof form, value: any) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const isFormInvalid = () =>
        !form.userName.trim() ||
        !form.fullName.trim() ||
        !form.email.trim() ||
        form.password.length < 6 ||
        form.password !== form.confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        try {
            setIsLoading(true);
            const { confirmPassword, ...dto } = form;
            const formData = new FormData();
            formData.append("fullName", dto.fullName)
            formData.append("email", dto.email)
            if (dto.avator) {
                formData.append("avator", dto.avator)
            }
            formData.append("password", dto.password)
            formData.append("phoneNumber", dto.phoneNumber)
            formData.append("userName", dto.userName)
            console.log("formData",formData);
            const res = await register(formData);
            console.log("res",res);
            if (res.success) {
                toast.success(
                    res.message ||
                    "Registration successful! Your account is pending admin approval.",
                );
                router.push("/auth/login");
            } else {
                toast.error(res.message || "Registration failed.");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-color via-red-100 to-gray-color p-6 py-12">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-linear-to-r bg-black p-8 text-center">
                    <Image
                        src={images.logo}
                        alt="PRCS Logo"
                        width={160}
                        height={80}
                        className="h-14 w-auto mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-extrabold text-white">Create an Account</h1>
                    <p className="text-red-100 text-sm mt-1">
                        Your account will need Admin approval before you can log in.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">
                    <ImageUpload
                        label="Upload Driver Avator"
                        value={form.avator}
                        onChange={(file) => {
                            handleChange("avator", file);
                        }}
                    />
                    <CustomInput
                        label="Full Name *"
                        Icon={User}
                        type="text"
                        className="custom-input w-full"
                        placeholder="e.g Ayesha Khan"
                        value={form.fullName}
                        onChange={(v) => handleChange("fullName", v)}
                    />
                    <CustomInput
                        label="Username *"
                        Icon={User}
                        type="text"
                        className="custom-input w-full"
                        placeholder="e.g ayesha.khan"
                        value={form.userName}
                        onChange={(v) => handleChange("userName", v)}
                    />
                    <CustomInput
                        label="Email *"
                        Icon={Mail}
                        type="email"
                        className="custom-input w-full"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(v) => handleChange("email", v)}
                    />
                    <CustomInput
                        label="Phone Number"
                        Icon={Phone}
                        type="text"
                        className="custom-input w-full"
                        placeholder="03xx-xxxxxxx"
                        value={form.phoneNumber}
                        onChange={(v) => handleChange("phoneNumber", v)}
                    />
                    <CustomInput
                        label="Password *"
                        Icon={Lock}
                        type="password"
                        className="custom-input w-full"
                        placeholder="At least 6 characters"
                        value={form.password}
                        onChange={(v) => handleChange("password", v)}
                    />
                    <CustomInput
                        label="Confirm Password *"
                        Icon={Lock}
                        type="password"
                        className="custom-input w-full"
                        placeholder="Re-enter your password"
                        value={form.confirmPassword}
                        onChange={(v) => handleChange("confirmPassword", v)}
                    />

                    <CustomButton
                        buttonText={isLoading ? "Creating account..." : "Sign Up"}
                        buttonColor="bg-red-600"
                        buttonHoverColor="bg-red-900"
                        type="submit"
                        icon={<UserPlus className="w-4 h-4" />}
                        disabled={isFormInvalid() || isLoading}
                        className="w-full py-3 rounded-full mt-2"
                    />

                    <p className="text-center text-sm text-slate-500 mt-2">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-red-600 font-semibold hover:text-red-800">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
