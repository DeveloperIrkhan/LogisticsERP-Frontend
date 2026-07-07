"use client";
import { getAvailableDriversAsync } from '@/modules/drivers/api';
import AvailableDriverList from '@/modules/drivers/AvailableDriverList'
import { IDriverResponseDto } from '@/modules/drivers/types'
import { useEffect, useState } from 'react';






const page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [drivers, setDrivers] = useState<IDriverResponseDto[]>([]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await getAvailableDriversAsync();
                if (response.success) {
                    setDrivers(response.data);
                } else {
                    console.error(response.message);
                }
            }
            catch (error) {
                console.error("Error fetching drivers:", error);
            }
            finally { setIsLoading(false); }
        }


        fetchDrivers();
    }, [])
    return (
        <div>
            <AvailableDriverList
                isLoading={isLoading}
                drivers={drivers} />
        </div>
    )
}

export default page
