"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { InventorySidebarContext } from "./InventoryMenu";



interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  alert?: string;
}

export const InventoryMenuItems = ({ icon, text, href, alert }: MenuItemProps) => {
  const { expanded } = useContext(InventorySidebarContext);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = (
    <li
      className={`relative group flex items-center p-2 m-0 cursor-pointer 
      transition-all duration-300 font-medium  hover:bg-red-700 
      hover:text-white hover:shadow-md ${!expanded && "flex justify-center items-center p-4"}
      ${pathname === href ? "bg-red-700 text-white" : "text-white"}`}
      onClick={() => setOpen((prev) => !prev)}>
      {icon}

      <p
        className={`overflow-hidden tracking-widest transition-all duration-300 ${expanded ? "w-40 flex ml-3" : "hidden"
          }`}
      >
        {text}
      </p>

      {/* ALERT */}
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded-full bg-red-700
          ${expanded ? "" : "top-2"}`}>
        </div>
      )}

      {!expanded && (
        <div className="absolute z-40 left-full rounded-md px-1 py-1 ml-5
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