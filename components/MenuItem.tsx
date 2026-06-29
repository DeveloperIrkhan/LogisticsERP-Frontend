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

  const hasChildren = !!subItems?.length;

  const rowClasses = `relative flex items-center py-3 px-3 my-2 rounded-l-md cursor-pointer transition-all duration-300
    text-gray-300 hover:bg-white hover:text-black hover:shadow-md`;

  const row = (
    <li
      className={rowClasses}
      onClick={hasChildren ? () => setOpen((prev) => !prev) : undefined}
    >
      <span className="text-2xl">{icon}</span>

      <span
        className={`overflow-hidden transition-all duration-300 ${expanded ? "w-40 ml-3" : "w-0"
          }`}
      >
        {text}
      </span>

      {/* CHEVRON for items with children */}
      {hasChildren && expanded && (
        <ChevronDown
          size={16}
          className={`ml-auto transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
            }`}
        />
      )}

      {/* ALERT */}
      {/* {alert && (
        <span className="absolute right-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded">
          {alert}
        </span>
      )} */}
    </li>
  );

  if (hasChildren) {
    return (
      <div className="group">
        {row}

        {/* SUBMENU */}
        <ul
          className={`overflow-hidden transition-all duration-300 ease-in-out ${open && expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {subItems!.map((sub, index) => (
            <Link key={index} href={sub.href} className="group">
              <li
                className="flex items-center py-2 pl-12 pr-3 my-1 rounded-l-md cursor-pointer text-sm
                  text-gray-400 hover:bg-white hover:text-black transition-all duration-300"
              >
                {sub.text}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Link href={href} className="group">
      {row}
    </Link>
  );
};