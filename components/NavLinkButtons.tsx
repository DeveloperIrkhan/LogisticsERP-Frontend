"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type DropdownItems = {
  label: string;
  href: string;
};

type NavLinkButtonsProps = {
  title: string;
  href: string;
  dropdown?: DropdownItems[];
};

const NavLinkButtons = ({ title, href, dropdown }: NavLinkButtonsProps) => {
  const [open, setOpen] = useState(false);
  const hasDropdown = dropdown && dropdown.length > 0;

  return (
    <div
      className="relative uppercase transition-all duration-300 hover:text-dark-color cursor-pointer group"
      onMouseEnter={() => hasDropdown && setOpen(true)}
      onMouseLeave={() => hasDropdown && setOpen(false)}
    >
      {!hasDropdown ? (
        <Link href={href}>{title}</Link>
      ) : (
        <div className="flex items-center gap-1">
          <span>{title}</span>
          <ChevronDown size={16} />

          {open && (
            <div className="absolute top-7 left-0 w-52 bg-white text-black rounded-md shadow-lg z-10 overflow-hidden">
              {dropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 hover:bg-hover-color hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* underline animation */}
      <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-dark-color transition-all duration-300 group-hover:w-1/2 group-hover:left-0" />
      <span className="absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-dark-color transition-all duration-300 group-hover:w-1/2 group-hover:right-0" />
    </div>
  );
};

export default NavLinkButtons;
