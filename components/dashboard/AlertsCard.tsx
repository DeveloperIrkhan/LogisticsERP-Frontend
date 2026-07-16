import React, { useEffect } from 'react'
import PortionDesign from '../PortionDesign'

interface IAletsCard {
    title: string;
    className?: string,
    totalAlerts: number | 0
    alertsNumber: number | 0
}
const AlertsCard = ({ title, className, alertsNumber, totalAlerts }: IAletsCard) => {
    const persentage = Math.floor((alertsNumber * 100) / totalAlerts);
    const getColor = (persentage: number) => {
        if (persentage <= 25) return "#66BB6A"; // Red
        if (persentage <= 50) return "#42A5F5"; // Yellow
        if (persentage <= 75) return "#f44336"; // Orange
        return "#FFA000";
    }

    const progressColor = getColor(persentage);

    return (
        <div className='p-5 rounded-md shadow-xl' style={{
            backgroundColor: `${progressColor}20`
        }}>
            <div className="grid gap-y-10" >
                <div className="">
                    <h2 className='font-normal text-sm tracking-widest' style={{ color: progressColor }}>{title}</h2>
                    <h2 className='font-bold text-xl'
                        style={{ color: progressColor }}>{alertsNumber}</h2>
                </div>
                <div className="w-full h-0.5 bg-gray-500 rounded-2xl relative flex items-center">
                    <div
                        className="h-1 rounded-2xl flex items-center justify-center"
                        style={{
                            width: `${persentage}%`,
                            backgroundColor: progressColor,
                            transition: "width 0.3s ease"
                        }}
                    >
                    </div>
                    <div className="absolute w-4 h-4 rounded-full"
                        style={{
                            backgroundColor: `${progressColor}`,
                            left: `${persentage-3}%`
                        }}></div>
                </div>
            </div>
        </div>
    )
}

export default AlertsCard
