import { SidebarContext } from '@/components/SlideMenu'
import { images } from '@/public/images'
import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const [expanded, setExpanded] = useState(true)
    return (
        <>
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-gray-400 border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <Image alt='Logo' src={images.logo} className={`overflow-hidden transition-all ${expanded ? "w-12" : "w-0"}`} />
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>

                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t flex p-3">
                        <Image src={images.profile} className="w-10 h-10 rounded-md" alt='' />
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
                            <div className="leading-4">
                                <h4 className="font-semibold">constGenius</h4>
                                <span className="text-xs text-gray-600">constgenius@gmail.com</span>
                            </div>
                            <MoreVertical size={20} />
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar


interface MenuItemProps {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    href: string;
    alert?: string;
}

export function SidebarItem({ icon, href, text, active, alert }: MenuItemProps) {
    const { expanded } = useContext(SidebarContext)
    return (
        <Link href={href} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

                </div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </Link>
    )
}
