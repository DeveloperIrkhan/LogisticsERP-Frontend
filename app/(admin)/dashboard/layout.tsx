import type { Metadata } from "next";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import { FaUserTie } from "react-icons/fa";
import SlideMenu from "@/components/SlideMenu";
import { MenuItems } from "@/components/MenuItem";
import { BsGraphUpArrow } from "react-icons/bs";
import { Bell, CarFront, Home, Search, User } from "lucide-react";
import { ImStatsDots, ImUser } from "react-icons/im";
import GreetingContainer from "@/components/dashboard/GreetingContainer";
import { GrUser, GrUserManager } from "react-icons/gr";
import Alerts from "@/components/dashboard/Alerts";
import { PiUserListLight } from "react-icons/pi";

export const metadata: Metadata = {
  title: "Admin Panel | Fleet Management System",
  description: "this is admin panel used for Fleet Management System",
};
const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen font-raleway">
      <ToastContainer position="top-right" autoClose={3000} />
      <SlideMenu>
        <MenuItems
          icon={<Home size={20} />}
          text="Home"
          alert="Home"
          href="/dashboard" />
        <MenuItems
          icon={<BsGraphUpArrow size={20} />}
          text="Reports"
          href="/dashboard/reports"
        />
        <MenuItems
          icon={<ImStatsDots size={20} />}
          text="Statistics"
          href="/dashboard"
        />
        <div className="border-t flex w-full border-gray-600" />
        <MenuItems
          icon={<CarFront size={20} />}
          text="Activate Vehicle"
          href="/dashboard/vehicles/activate"
        />
        <div className="border-t flex w-full border-gray-600" />
        <MenuItems
          icon={<PiUserListLight  size={20} />}
          text="Driver List"
          href="/dashboard/drivers/get-all-drivers"
        />
        <MenuItems
          icon={<ImUser size={20} />}
          text="Activate Drivers"
          href="/dashboard/drivers/activate"
        />
        <div className="border-t flex w-full border-gray-600" />
        <MenuItems
          icon={<GrUser size={20} />}
          text="Team"
          href=""
        />
      </SlideMenu>

      <div className="flex-1 flex flex-col bg-gray-200 overflow-hidden">
        <div className="flex md:flex-row flex-col items-center p-3 shrink-0">
          <GreetingContainer text={getGreeting()} user="irfan" />
          <div className="mr-3">

            <Alerts />
          </div>
        </div>

        <section className="flex-1 overflow-y-auto flex p-2 font-raleway">
          {children}
        </section>
      </div>
    </div>
  );
}
