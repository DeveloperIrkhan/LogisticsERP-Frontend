"use client"
import AlertPage from "@/components/dashboard/AlertPage";
import Spinner from "@/components/Spinner";
import { getExpiryAlerts } from "@/modules/dashboards/api";
import { IExpiryAlertsResponseDto } from "@/modules/dashboards/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const page = () => {


    const [alerts, setAlerts] = useState<IExpiryAlertsResponseDto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getExpiryAlerts();
                if (response.success) {
                    setAlerts(response.data);
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    if (!alerts) {
        return <div className="w-full h-full">
            <p className="text-lg text-red-500 bg-red-100 p-4">
                No alert(s) available.
            </p>
        </div>;
    }



    return <AlertPage alertsResp={alerts} />
}

export default page
