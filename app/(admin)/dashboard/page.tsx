"use client";
import DriverInfo from "@/components/dashboard/DriverInfo";
import ExpenseAnalytics from "@/components/dashboard/ExpenseAnalytics";
import ExpiringAlerts from "@/components/dashboard/ExpiringAlerts";
import Fleet from "@/components/dashboard/Fleet";
import FuelAnalytics from "@/components/dashboard/FuelAnalytics";
import Spinner from "@/components/Spinner";
import { getDashBoardSummeryAsync } from "@/modules/dashboards/api";
import { IDashboardSummary } from "@/modules/dashboards/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [summary, setSummary] = useState<IDashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashBoardSummeryAsync();
        if (response.success) {
          setSummary(response.data);
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

  if (!summary) {
    return <div className="w-full h-full">
      <p className="text-lg text-red-500 bg-red-100 p-4">
        No data available.
      </p>
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
      <Fleet getSummary={summary} />
      <DriverInfo getSummary={summary} />
      <ExpiringAlerts getSummary={summary} />
      <div className="flex flex-col gap-y-2">
        <FuelAnalytics getSummary={summary} />
        <ExpenseAnalytics getSummary={summary} />
      </div>
    </div>
  );
};

export default Page;