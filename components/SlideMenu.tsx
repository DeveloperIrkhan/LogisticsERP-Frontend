"use client";

import { createContext, useState } from "react";
import Image from "next/image";
import { images } from "@/public/images";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MoreVertical } from "lucide-react";

interface SidebarContextType {
  expanded: boolean;
}

export const SidebarContext = createContext<SidebarContextType>({
  expanded: true,
});

interface Props {
  children: React.ReactNode;
}

const SlideMenu = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-gray-800 shadow-md">
        {/* TOP */}
        <div className="p-4 flex items-center justify-between gap3">
          {expanded && (
            <div className="flex items-center gap-2">
              <Image
                src={images.logo}
                alt="Logo"
                width={50}
                height={50}
                className={`transition-all duration-300 w-20`}
              />
              <span className="text-white text-sm font-bold">Dashboard</span>
            </div>
          )}
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition"
          >
            {expanded ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </button>
        </div>

        {/* MENU */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2">{children}</ul>
        </SidebarContext.Provider>
      </nav>

      {/* FOOTER */}
    </aside>
  );
};

export default SlideMenu;
