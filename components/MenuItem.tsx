"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { SidebarContext } from "./SlideMenu";
import { ChevronDown } from "lucide-react";

interface SubMenuItem {
  text: string;
  href: string;
}

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  alert?: string;
  subItems?: SubMenuItem[];
}

export const MenuItems = ({ icon, text, href, alert, subItems }: MenuItemProps) => {
  const { expanded } = useContext(SidebarContext);
  const [open, setOpen] = useState(false);


  const menuItems = (
    <li
      className={`relative group flex items-center p-2 m-0 cursor-pointer 
      transition-all duration-300 font-medium text-gray-300 hover:bg-white 
      hover:text-black hover:shadow-md ${!expanded && "flex justify-center items-center p-4"}`}
      onClick={() => setOpen((prev) => !prev)}
    >
      {icon}

      <p
        className={`overflow-hidden transition-all duration-300 ${expanded ? "w-40 flex ml-3" : "hidden"
          }`}
      >
        {text}
      </p>

      {/* ALERT */}
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded-full bg-red-500
          ${expanded ? "" : "top-2"}`}>
        </div>
      )}

      {!expanded && (
        <div className="absolute left-full rounded-md px-1 py-0.5 ml-5
        bg-red-200 text-red-600 text-sm invisible opacity-20 -translate-x-3 transition-all duration-300
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">{text}</div>
      )}
    </li>
  );

  return (
    <Link key={text} href={href} className="group">
      {menuItems}
    </Link>
  );
};