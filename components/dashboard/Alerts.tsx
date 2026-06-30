"use client"
import React, { useEffect, useState } from 'react'
import GreetingContainer from './GreetingContainer'
import { Bell, Search } from 'lucide-react'
import { IDashboardSummary } from '@/modules/dashboards/types';
import { getDashBoardSummeryAsync } from '@/modules/dashboards/api';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';

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

                    const expired = data?.expiryAlerts?.expiredVehicles?.length ?? 0;
                    const in30 = data?.expiryAlerts?.expiringIn30Days?.length ?? 0;
                    const in60 = data?.expiryAlerts?.expiringIn60Days?.length ?? 0;

                    setAlerts(expired + in30 + in60);
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
        <div className="relative flex flex-row items-center">
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
            <div className="px-3 py-1.5 rounded-xl relative border 
            border-red-300 bg-red-200 flex items-center justify-center gap-2 w-42">
                <p className='text-md text-red-600'>Expriy Alerts</p>
                <Bell className="text-red-400" size={23} />
                <span className="absolute -top-4 -right-3 bg-red-600 w-6 h-6 rounded-full text-white
              text-sm flex justify-center items-center">{alerts}</span>
            </div>
        </div>
    )
}

export default Alerts
