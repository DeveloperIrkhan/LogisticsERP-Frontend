import type { Metadata } from "next";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import { FaUserTie } from "react-icons/fa";
import SlideMenu from "@/components/SlideMenu";
import { MenuItems } from "@/components/MenuItem";
import { BsGraphUpArrow } from "react-icons/bs";
import { Bell, CarFront, Home, Search, User } from "lucide-react";
import { ImStatsDots } from "react-icons/im";
import GreetingContainer from "@/components/dashboard/GreetingContainer";
import { GrUser, GrUserManager } from "react-icons/gr";
import Alerts from "@/components/dashboard/Alerts";

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
          key={1}
          icon={<Home />}
          text="Home"
          alert="Home"
          href="/dashboard" />
        <MenuItems
          key={2}
          icon={<BsGraphUpArrow />}
          text="Reports"
          alert="Reports"
          href="/dashboard/reports"
        />
        <MenuItems
          key={3}
          icon={<ImStatsDots />}
          text="Statistics"
          alert="Manage Drivers"
          href="/dashboard/"
        />

        <div className="h-1 flex w-full bg-white/20" />

        <MenuItems
          key={6}
          icon={<CarFront />}
          text="Vehicles"
          alert="Manage Vehicles"
          href="/dashboard/vehicles/activate"
        />
        <MenuItems
          key={5}
          icon={<GrUserManager />}
          text="Drivers"
          alert="Manage Driver"
          href="/dashboard/drivers/activate"
        />

        <div className="h-1 flex w-full bg-white/20" />
        <MenuItems
          key={4}
          icon={<GrUser />}
          text="Team"
          alert="Manage Users"
          href=""
        />
      </SlideMenu>

      <div className="flex-1 flex flex-col bg-gray-200 overflow-hidden">
        <div className="flex md:flex-row flex-col items-center p-3 shrink-0">
          <GreetingContainer text={getGreeting()} user="irfan" />
          <Alerts />
        </div>

        <section className="flex-1 overflow-y-auto flex p-2 font-raleway">
          {children}
        </section>
      </div>
    </div>
  );
}
