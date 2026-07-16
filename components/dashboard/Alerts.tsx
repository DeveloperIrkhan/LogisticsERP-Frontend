"use client"
import React, { useEffect, useState } from 'react'
import GreetingContainer from './GreetingContainer'
import { Bell, Search } from 'lucide-react'
import { IDashboardSummary } from '@/modules/dashboards/types';
import { getDashBoardSummeryAsync } from '@/modules/dashboards/api';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import Link from 'next/link';

const Alerts = () => {


    const [summary, setSummary] = useState<IDashboardSummary | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [alerts, setAlerts] = useState<number | null>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDashBoardSummeryAsync();
                if (response.success) {
                    const data = response.data;
                    setSummary(data);
                    toast.success(response.message);

                    const expiredDriver = data?.expiryAlerts?.driverExpiryAlerts?.expiredDrivers.length ?? 0;
                    const expiredDriverIn30Days = data?.expiryAlerts?.driverExpiryAlerts?.expiringDriverIn30Days.length ?? 0;
                    const expiredDriverIn60Days = data?.expiryAlerts?.driverExpiryAlerts?.expiringDriverIn60Days.length ?? 0;


                    const expiredVehicles = data?.expiryAlerts?.vehicleExpiryAlerts?.expiredVehicles.length ?? 0;
                    const expiredVehiclesIn30Days = data?.expiryAlerts?.vehicleExpiryAlerts?.vehicleExpiringIn30Days.length ?? 0;
                    const expiredVehiclesIn60Days = data?.expiryAlerts?.vehicleExpiryAlerts?.vehicleExpiringIn60Days.length ?? 0;



                    setAlerts(expiredDriver + expiredDriverIn30Days + expiredDriverIn60Days
                        + expiredVehicles + expiredVehiclesIn30Days + expiredVehiclesIn60Days
                    );
                } else {
                    toast.error(response.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log("summary", summary)

    }, [summary])






    if (isLoading) {
        return <Spinner />;
    }
    return (
        <Link href={"/dashboard/alerts"} className="relative group flex 
        flex-row items-center cursor-pointer">
            {/* <input
                type="text"
                placeholder="Search..."
                className="px-4 py-1 bg-white rounded-full border border-gray-600
               text-gray-900 focus:outline-none focus:ring-1 focus:ring-default-color 
               transition-all duration-300"
            /> */}
            {/* <Search
                className="absolute top-2 right-14 text-gray-700"
                size={15}
            /> */}
            {/* <div className="px-3 relative border"> */}
            <div className="p-1 rounded-xl text-sm relative border 
            border-red-300 bg-red-200 group-hover:bg-red-700 hoverEffect
             group-hover:text-white flex w-32 items-center justify-center gap-2">
                <p className='text-md text-red-600 hoverEffect group-hover:text-white'>Expriy Alerts</p>
                <Bell className="text-red-400 hoverEffect group-hover:text-white" size={23} />
                <span className="absolute -top-4 -right-3
                 bg-red-600 group-hover:bg-red-700 hoverEffect w-6 h-6 rounded-full text-white
              text-sm flex justify-center items-center">{alerts}</span>
            </div>
        </Link>
    )
}

export default Alerts
