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
      <nav className="h-full flex flex-col bg-black/90 shadow-md">
        <div className="p-4 pb-2 flex items-center justify-between gap-2">
          {expanded && (
            <Link href={"/"} className="flex items-center gap-2">
              <Image
                src={images.logo}
                alt="Logo"
                width={50}
                height={50}
                className={`${expanded ? "transition-all duration-300 w-20" : "w-0"} `}
              />
            </Link>
          )}
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-2 rounded-full bg-gray-300 hover:bg-red-600 text-white transition"
          >
            {expanded ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </button>
        </div>

        {/* MENU */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 ">{children}</ul>
        </SidebarContext.Provider>
        {/*user section */}
        <div className="border-t border-gray-400 flex p-3 text-white">
          <Image src={images.profile} alt="user image" className="w-10 h-10 rounded-md" />
          <div className={`flex justify-between items-center w-52 ml-3 ${!expanded && "hidden"}`}>
            <div className="leading-4">
              <h4 className="font-semibold">
                Irfan shah
              </h4>
              <span className="text-sm text-gray-300">
                info@prcs.com
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>


    </aside>
  );
};

export default SlideMenu;
