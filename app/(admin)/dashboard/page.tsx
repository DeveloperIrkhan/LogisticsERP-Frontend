"use client";
import DriverInfo from "@/components/dashboard/DriverInfo";
import Fleet from "@/components/dashboard/Fleet";
import Spinner from "@/components/Spinner";
import { getDashBoardSummeryAsync } from "@/modules/dashboards/api";
import { IDashboardSummary } from "@/modules/dashboards/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [summary, setSummary] = useState<IDashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

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

  if (isLoading) {
    return <Spinner />;
  }

  if (!summary) {
    return <div>No data available.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-around gap-2">
      <Fleet getSummary={summary} />
      <DriverInfo getSummary={summary} />
    </div>
  );
};

export default Page;