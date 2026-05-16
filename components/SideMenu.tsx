import React, { FC, useEffect } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { MenuItems } from "@/app/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMediaIcons from "../SocialMediaIcons";
import { useOutSideClick } from "@/Hooks";
interface ISideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
// const SideMenu: FC<ISideMenuProps> = ({ isOpen, onClose }) => {
const SideMenu = ({ isOpen, onClose }: ISideMenuProps) => {
  const pathname = usePathname();
  const sideMenuRef = useOutSideClick<HTMLDivElement>(onClose)
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full
    shadow-xl bg-black/50 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } hoverEffect`}
    >
      <div ref={sideMenuRef}
        className="min-w-72 max-w-96 text-white/80 bg-black h-screen 
      px-7 py-3 border-r border-r-amber-950 shadow-2xl flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <Logo logoSrc="/EShopping-02.png" />
          <button onClick={onClose} className="hover:text-white hoverEffect">
            <X className="" />
          </button>
        </div>
        <div className=" flex flex-col float-start gap-y-4 text-white">
          {MenuItems?.map((item) => (
            <Link
              onClick={onClose}
              className={`group transition-all hoverEffect hover:text-primary-color
                             duration-300 relative group
                             ${
                               pathname == item.href &&
                               "text-accent-color text-xl"
                             }`}
              key={item.title}
              href={item.href}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="">
            <SocialMediaIcons/>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
