"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import CreateRole from "@/modules/role/CreateRole";

export default function Page() {
    return (
        <ProtectedRoute allowedRoles={["Admin"]}>
            <CreateRole />
        </ProtectedRoute>
    );
}
