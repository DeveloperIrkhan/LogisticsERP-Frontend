import React from 'react'
import { IDriverResponseDto } from './types'
import Spinner from '@/components/Spinner'
import { User } from 'lucide-react'
import PageTitlelCard from '@/components/Badge/PageTitlelCard'
import Image from 'next/image'
import { images } from '@/public/images'
import Link from 'next/link'
interface AvailableDriverListProps {
    drivers: IDriverResponseDto[],
    isLoading: boolean
}
const AvailableDriverList = ({ drivers, isLoading }: AvailableDriverListProps) => {

    isLoading && <Spinner />


    if (!isLoading && drivers.length === 0) {
        return (
            <div className="flex h-screen flex-col items-center justify-center">
                <User className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600">
                    No Available Driver Found
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <PageTitlelCard
                        h2="Available Drivers"
                        p="Total Number of Available Drivers in Pakistan Red Crescent Society Fleet"
                        boxTitle="Total Drivers"
                        Total={drivers.length}
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-4">
                    {drivers.map((driver: IDriverResponseDto) => {
                        return (
                            <div key={driver.driverId} className="shadow-xl  flex items-center flex-col h-32 bg-red-100 rounded-md
                border border-red-400 hover:bg-red-200 hover:border-red-50
                duration-300 transition-all ease-in-out">

                                <div className="border-2 w-full border-red-600 flex 
                                items-center justify-between p-4 gap-4">
                                    <Image
                                        src={driver.photoUrl?.trim() ? driver.photoUrl : images.profile}
                                        alt="Driver"
                                        width={128}
                                        height={128}
                                        className="rounded-full object-cover"
                                        style={{
                                            width: "128px",
                                            height: "128px",
                                        }}
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">Driver Name</p>
                                        <h2 className="ml-4 text-lg font-semibold capitalize text-gray-800">
                                            {driver.fullName}
                                        </h2>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">Driver CNIC</p>
                                        <h2 className="ml-4 text-lg font-semibold capitalize text-gray-800">
                                            {driver.cnic}
                                        </h2>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">Type of Licence</p>
                                        <h2 className="ml-4 text-lg font-semibold capitalize text-gray-800">
                                            {driver.typeOfLicence}
                                        </h2>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">License Number</p>
                                        <h2 className="ml-4 text-lg font-semibold capitalize text-gray-800">
                                            {driver.licenseNumber}
                                        </h2>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">Remarks</p>
                                        <h2 className="ml-4 text-lg font-semibold capitalize text-gray-800">
                                            {driver.description}
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-2 flex-col">
                                        <p className="text-sm text-gray-500">Assign Duty</p>
                                        <Link className="text-lg font-normal capitalize 
                                        border border-red-300
                                        p-2 rounded-lg 
                                        text-red-300
                                         hover:text-white
                                         hover:border-white 
                                         hover:bg-red-500
                                         hoverEffect 
                                         transition-all duration-300 ease-in-out"
                                            href={`/duty/assign-duty/${driver.driverId}`}>
                                            Assign Duty
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>


        </div >
    )
}

export default AvailableDriverList
