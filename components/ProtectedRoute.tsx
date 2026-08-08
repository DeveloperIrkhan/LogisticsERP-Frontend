"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) {
            router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
            return;
        }
        if (user?.mustChangePassword && pathname !== "/auth/change-password") {
            router.replace("/force-change-password");
        }
    }, [isLoading, isAuthenticated, user, router, pathname]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <Spinner />
            </div>
        );
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user?.roleName ?? "")) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[70vh] gap-3 text-center px-4">
                <h1 className="text-3xl font-bold text-slate-800">Access Restricted</h1>
                <p className="text-slate-500 max-w-md">
                    Your role ({user?.roleName}) doesn&apos;t have permission to view this page.
                </p>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
