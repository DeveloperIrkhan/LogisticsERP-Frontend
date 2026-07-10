import React from 'react'
interface SectionHeadingProps {
    title: string
    icon?: React.ReactNode
}
const SectionHeading = ({ title, icon }: SectionHeadingProps) => {
    return (
        <div className="p-3 flex gap-3 items-center mb-4">
            {icon && <span className="bg-red-100 p-2 rounded-md text-red-500">{icon}</span>}
            <h2 className="uppercase tracking-widest text-xl font-bold text-gray-500">
                {title}
            </h2>
            <hr className="flex-1 border-2 border-t border-gray-500" />

        </div>
    )
}
export default SectionHeading
