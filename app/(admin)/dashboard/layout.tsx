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
        <MenuItems icon={<Home />} text="Home" alert="Home" href="/dashboard" />
        <MenuItems
          icon={<BsGraphUpArrow />}
          text="Reports"
          alert="Reports"
          href="/dashboard/reports"
        />
        <MenuItems
          icon={<User />}
          text="Users"
          alert="Users"
          href="/dashboard/users"
        />
        <MenuItems
          icon={<ImStatsDots />}
          text="Statistics"
          alert="Manage Drivers"
          href="/dashboard/stats"
        />
        <MenuItems
          icon={<FaUserTie />}
          text="Drivers"
          alert="Manage Drivers"
          href="/dashboard/drivers"
        />
        <MenuItems
          icon={<CarFront />}
          text="Vehicles"
          alert="Manage Vehicles"
          href="/dashboard/vehicles"
        />
      </SlideMenu>

      <div className="flex-1 flex flex-col bg-gray-200 overflow-hidden">
        <div className="flex md:flex-row flex-col items-center p-3 shrink-0">
          <GreetingContainer text={getGreeting()} user="irfan" />
          <div className="relative flex flex-row items-center">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-1 bg-white rounded-full border border-gray-600
               text-gray-900 focus:outline-none focus:ring-1 focus:ring-default-color 
               transition-all duration-300"
            />
            <Search
              className="absolute top-2 right-14 text-gray-700"
              size={15}
            />
            <div className="px-3">
              <Bell className="text-gray-700" size={23} />
            </div>
          </div>
        </div>

        <section className="flex-1 overflow-y-auto flex p-2 font-raleway">
          {children}
        </section>
      </div>
    </div>
  );
}
