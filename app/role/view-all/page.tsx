"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import ViewAllRoles from "@/modules/role/ViewAllRoles";

export default function Page() {
    return (
        <ProtectedRoute allowedRoles={["Admin"]}>
            <ViewAllRoles />
        </ProtectedRoute>
    );
}
