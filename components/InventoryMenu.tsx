"use client";

import { createContext, useState } from "react";
import Image from "next/image";
import { images } from "@/public/images";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

interface SidebarContextType {
    expanded: boolean;
}

export const InventorySidebarContext = createContext<SidebarContextType>({
    expanded: true,
});

interface Props {
    children: React.ReactNode;
}

const InventoryMenu = ({ children }: Props) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-black/90 shadow-md">
                <div className="p-4 pb-2 flex items-center justify-end gap-2">
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="p-2 rounded-full bg-gray-300 text-gray-600 hover:text-white hover:bg-gray-900 hoverEffect transition"
                    >
                        {expanded ? <IoIosArrowBack /> : <IoIosArrowForward />}
                    </button>
                </div>
                <InventorySidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 ">{children}</ul>
                </InventorySidebarContext.Provider>
            </nav>


        </aside>
    );
};

export default InventoryMenu;
