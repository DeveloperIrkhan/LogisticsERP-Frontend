"use client";

import NavbarComponent from "@/components/Navbar/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavLinkButtons from "./NavLinkButtons";
import CustomButton from "./CustomButton";
import { Phone } from "lucide-react";
import { MenuItems } from "@/app/constants/constants";
import { images } from "@/public/images";
import Link from "next/link";
import TopBar from "./Navbar/TopBar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopBar />
      <header
        className={`top-0 left-0 w-full z-50 font-raleway transition-all duration-300`}
      >
        {/* TOP BAR */}
        <div
          className={`flex items-center justify-between px-6 md:px-12 py-4 text-white transition-all 
          duration-300 ${isScrolled ? "bg-black/70 backdrop-blur-xl" : ""}`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              // src={images.logo}
              src={isScrolled ? images.PrcsLogo : images.logo}
              alt="Logo"
              width={400}
              height={400}
              className="h-15 w-auto"
            />
            {/* Desktop Nav */}
          </Link>
          <nav className="hidden md:flex items-center gap-8 uppercase tracking-widest text-md">
            {MenuItems.map((item, index) => (
              <NavLinkButtons
                key={index}
                title={item.label}
                href={item.href as string}
                dropdown={item.dropdown}
              />
            ))}
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:flex">
            <CustomButton
              icon={<Phone className="w-5 h-5" />}
              buttonText="Get in touch"
              buttonColor="bg-default-color"
              buttonHoverColor="bg-red-900"
              className="px-6 py-3 rounded-full font-bold hover:shadow-lg transition-shadow duration-300"
            />
          </div>

          {/* Mobile Button */}
          <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU (SLIDE DOWN ANIMATION) */}
        <div
          className={`md:hidden bg-black/90 backdrop-blur text-white mx-3 rounded-2xl shadow-lg origin-top transform transition-transform duration-300 ease-in-out overflow-hidden ${
            open ? "scale-y-100 py-4" : "scale-y-0 py-0"
          }`}
        >
          <div className="flex flex-col space-y-3 px-6">
            {MenuItems.map((item, index) => (
              <div key={index} className="border-b border-white/10 pb-2">
                {item.dropdown && item.dropdown.length > 0 ? (
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer py-2 uppercase tracking-widest">
                      {item.label}
                      <span className="transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </summary>

                    <div className="pl-4 mt-2 flex flex-col gap-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setOpen(false)}
                          className="text-sm text-gray-300 hover:text-red-500 transition"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    href={item.href as string}
                    onClick={() => setOpen(false)}
                    className="block py-2 uppercase tracking-widest hover:text-red-500 transition"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-3">
              <CustomButton
                icon={<Phone className="w-5 h-5" />}
                buttonText="Get in touch"
                buttonColor="bg-red-600"
                buttonHoverColor="bg-red-900"
                className="w-full px-6 py-3 rounded-full font-bold"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
