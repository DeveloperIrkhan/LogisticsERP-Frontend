"use client";
import { useEffect, useState } from "react";
import { User, Mail, Phone, ShieldCheck, Calendar, Save } from "lucide-react";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Spinner from "@/components/Spinner";
import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { getStatusStyle, IUpdateUserProfileDto, IUserResponseDto } from "@/modules/user/interfaces";
import { getMyProfileAsync, updateMyProfileAsync } from "@/modules/user/api";
import Image from "next/image";
import { images } from "@/public/images";
import ImageUpload from "@/components/ImageUpload";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

const ProfileContent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState<IUserResponseDto | null>(null);
    const [edit, setEdit] = useState<boolean>(false)
    const [updateProfile, setUpdateProfile] = useState<IUpdateUserProfileDto | null>({
        fullName: "",
        phoneNumber: "",
        avatar: undefined,
    })
    const [existingPhotoUrl, setExistingPhotoUrl] = useState<string>("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);
                const res = await getMyProfileAsync();
                if (res.success) {
                    setProfile(res.data);
                    toast.success(res.message ?? "profile fetched!");
                    setUpdateProfile({
                        fullName: res.data.fullName,
                        phoneNumber: res.data.phoneNumber,
                    })
                    setExistingPhotoUrl(res?.data?.profilePictureUrl ?? "");
                }
                else toast.error(res.message);
            } catch {
                toast.error("Failed to load profile.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const updateUserProfileAsync = async () => {
        const formData = new FormData();
        if (updateProfile?.fullName)
            formData.append("FullName", updateProfile.fullName);
        if (updateProfile?.phoneNumber)
            formData.append("PhoneNumber", updateProfile.phoneNumber);
        if (updateProfile?.avatar)
            formData.append("avatar", updateProfile.avatar);

        try {
            setIsLoading(true)
            const response = await updateMyProfileAsync(formData);
            if (response.success) {
                toast.success(response.message ?? "profile updated successfully!")
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong.")
        }
        finally {
            setIsLoading(false)
        }
    }


    const handleChange = (name: keyof typeof updateProfile, value: any) => {
        setUpdateProfile((prev) => ({ ...prev, [name]: value }));
    };
    if (isLoading || !profile) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <Spinner />
            </div>
        );
    }

    const details = [
        { label: "Username", value: profile.userName, icon: User },
        { label: "Email", value: profile.email, icon: Mail },
        { label: "Phone", value: profile.phoneNumber || "-", icon: Phone },
        { label: "Role", value: profile.roleName, icon: ShieldCheck },
        { label: "Joined", value: new Date(profile.createdAt).toDateString(), icon: Calendar },
    ];

    return (
        <Container className="py-8">
            {(edit === false) ? (<>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                        <div className="bg-linear-to-r from-red-600 via-red-700 to-red-900 p-8 md:p-10">
                            <div className="flex items-center gap-5">
                                <div className="bg-white/20 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold uppercase">
                                    {profile.fullName?.charAt(0)}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-white">{profile.fullName}</h1>
                                    <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full border ${getStatusStyle(profile.status)}`}>
                                        {profile.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-10 bg-gray-100">
                            <div className="flex p-4 justify-center items-center">
                                <Image className="w-44 h-44 p-6 rounded-full"
                                    src={profile.profilePictureUrl ?
                                        profile.profilePictureUrl
                                        :
                                        images.profile} width={100} height={100} alt="" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {details.map((d, i) => {
                                    const Icon = d.icon;
                                    return (
                                        <div
                                            key={i}
                                            className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-md"
                                        >
                                            <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-500 font-medium">{d.label}</p>
                                                <h3 className="text-lg font-bold text-slate-800 mt-1">{d.value}</h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex mt-4">
                                <button
                                    type="button"
                                    className="flex justify-center items-center rounded-2xl bg-red-600 text-white p-3"
                                    onClick={() => setEdit(!edit)}>Update Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>) : (
                //Profile Edit
                <>
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={updateUserProfileAsync} className="p-8 flex flex-col gap-4">
                            <ImageUpload
                                label="Upload New Avatar"
                                value={updateProfile?.avatar}
                                existingUrl={existingPhotoUrl}
                                onChange={(file) => handleChange("avatar", file)}
                            />
                            <CustomInput
                                label="Full Name *"
                                Icon={User}
                                type="text"
                                className="custom-input w-full"
                                placeholder="e.g Ayesha Khan"
                                value={updateProfile?.fullName}
                                onChange={(v) => handleChange("fullName", v)}
                            />

                            <CustomInput
                                label="Phone Number"
                                Icon={Phone}
                                type="text"
                                className="custom-input w-full"
                                placeholder="03xx-xxxxxxx"
                                value={updateProfile?.phoneNumber}
                                onChange={(v) => handleChange("phoneNumber", v)}
                            />
                            <CustomButton
                                buttonColor="bg-red-500"
                                buttonHoverColor="bg-red-900"
                                type="submit"
                                disabled={isLoading}
                                icon={<Save />}
                                className="w-1/2 md:w-1/6 text-white py-2 rounded-full transition"
                                buttonText={isLoading ? "Updating..." : "Update Profile"}
                            />
                        </form>
                    </div>
                </>)}
        </Container>
    );
};

const ProfilePage = () => (
    <ProtectedRoute>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <ProfileContent />
    </ProtectedRoute>
);

export default ProfilePage;
