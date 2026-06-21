"use client";

import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "./SlideMenu";

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  alert?: string;
}

export const MenuItems = ({ icon, text, href, alert }: MenuItemProps) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={href} className="group">
      <li
        className={`relative flex items-center py-3 px-3 my-2 rounded-l-md cursor-pointer transition-all duration-300
        text-gray-300 hover:bg-white hover:text-black hover:shadow-md`}
      >
        <span className="text-2xl">{icon}</span>

        <span
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? "w-40 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>

        {/* ALERT */}
        {/* {alert && (
          <span className="absolute right-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded">
            {alert}
          </span>
        )} */}
      </li>
    </Link>
  );
};
