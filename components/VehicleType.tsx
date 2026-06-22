import { TruckIcon } from 'lucide-react'
import { BsBusFrontFill } from 'react-icons/bs'
import { FaCarSide, FaMotorcycle, FaShuttleVan, FaTruckPickup } from 'react-icons/fa'
import { PiAmbulanceFill, PiJeepBold } from 'react-icons/pi'
interface IVehicleType {
    vehicleType: string
}
const VehicleType = ({ vehicleType }: IVehicleType) => {
    return (
        <div>
            <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                {vehicleType === "Car" ? (
                    <FaCarSide className="w-7 h-7" />
                ) : vehicleType === "Jeep" ? (
                    <PiJeepBold className="w-7 h-7" />
                ) : vehicleType === "Ambulance" ? (
                    <PiAmbulanceFill className="w-7 h-7" />
                ) : vehicleType === "Pickup" ? (
                    <FaTruckPickup className="w-7 h-7" />
                ) : vehicleType === "Van" ? (
                    <FaShuttleVan className="w-7 h-7" />
                ) : vehicleType === "Bus" ? (
                    <BsBusFrontFill className="w-7 h-7" />
                ) : vehicleType === "Motorcycle" ? (
                    <FaMotorcycle className="w-7 h-7" />
                ) : (
                    <TruckIcon className="w-7 h-7" />
                )}
            </div>
        </div>
    )
}

export default VehicleType
