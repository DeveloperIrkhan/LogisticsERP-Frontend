"use client";

import { createContext, useState } from "react";
import Image from "next/image";
import { images } from "@/public/images";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { KeyRound, LogOut, MoreVertical, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

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
  const { user, isAuthenticated, logout } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <aside className="h-screen relative">
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
          <Image
            src={user?.profilePictureUrl ?? images.profile}
            width={100} height={100} alt="user image"
            className="w-10 h-10 rounded-full" />
          <div className={`flex justify-between items-center w-52 ml-3 ${!expanded && "hidden"}`}>
            <div className="leading-4">
              <h4 className="font-semibold">
                {user?.fullName}
              </h4>
              <span className="text-sm text-gray-300">
                {user?.email}
              </span>
            </div>
            <MoreVertical onClick={() => setOpen(!open)} size={20} />


            {open && (
              <div className="absolute bottom-10 right-3 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                <Link
                  href="/auth/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-300 hover:text-red-600 transition-colors"
                >
                  <User className="w-4 h-4" /> My Profile
                </Link>

                <Link
                  href="/auth/change-password"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-300 hover:text-red-600 transition-colors"
                >
                  <KeyRound className="w-4 h-4" /> Change Password
                </Link>

                {user?.roleName === "Admin" && (
                  <>
                    <Link
                      href="/auth/users/pending-approvals"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-300 hover:text-red-600 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" /> Pending Approvals
                    </Link>
                    <Link
                      href="/auth/users/view-all"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-300 hover:text-red-600 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" /> All Users
                    </Link>
                    <Link
                      href="/auth/roles/view-all"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-300 hover:text-red-600 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" /> Manage Roles
                    </Link>
                  </>
                )}

                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-300 transition-colors border-t border-slate-100"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>


    </aside >
  );
};

export default SlideMenu;
