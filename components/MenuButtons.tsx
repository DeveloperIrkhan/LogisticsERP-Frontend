"use client";
import { MenuItems } from "@/app/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MenuButtons = () => {
  const pathname = usePathname();
  return (
    <div
      className="hidden font-Jost md:inline-flex items-center 
    gap-4 text-sm capitalize font-bold text-primary-color"
    >
      {MenuItems?.map((item) => (
        <Link
          className={`group transition-all hoverEffect hover:text-accent-color
                 duration-300 relative group
                 ${
                   pathname == item.href &&
                   "text-secondary-color border-b-[1.5px] border-secondary-color"
                 }`}
          key={item.title}
          href={item.href}
        >
          {item.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-accent-color group-hover:w-1/2  duration-400 group-hover:left-0 ${
              pathname === item?.href && "w-1/2 bg-secondary-color"
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-accent-color group-hover:w-1/2 duration-400  group-hover:right-0 ${
              pathname === item?.href && "w-1/2 bg-secondary-color"
            }`}
          />
        </Link>
      ))}
    </div>
  );
};

export default MenuButtons;
