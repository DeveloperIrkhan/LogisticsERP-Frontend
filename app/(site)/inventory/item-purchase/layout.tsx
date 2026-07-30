import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";
import { FaRegBell } from "react-icons/fa";
import Container from "@/components/Container";
import QuickLinks from "@/components/dashboard/QuickLinks";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineGridView } from "react-icons/md";
import { PiStackOverflowLogoLight } from "react-icons/pi";
import { SiLanggraph } from "react-icons/si";

export const metadata: Metadata = {
    title: "Pakistan Red Crecent Socity | Inventory Management system",
    description: "this is webapp used for PRCS's Fleet Logestics",
    icons: {},
};

const SaleLinks = [
    {
        label: "Add purchase Record",
        href: "/inventory/item-purchase/create-item",
        icon: IoMdAdd,
        color: "bg-lime-50 text-lime-600 hover:bg-lime-600",
    },
    {
        label: "View Purchase Records",
        href: "/inventory/item-purchase/view-all",
        icon: MdOutlineGridView,
        color: "bg-pink-50 text-pink-600 hover:bg-pink-600",
    },
    // {
    //     label: "Active Items",
    //     href: "/inventory/item-purchase/active-items",
    //     icon: FaRegBell,
    //     color: "bg-orange-50 text-orange-600 hover:bg-orange-600",
    // },
    // {
    //     label: "Low Stock",
    //     href: "/inventory/item-purchase/low-stock",
    //     icon: PiStackOverflowLogoLight,
    //     color: "bg-green-50 text-green-600 hover:bg-green-600",
    // },
    // {
    //     label: "Stock Reports",
    //     href: "/inventory/item-purchase/stock-reports",
    //     icon: SiLanggraph,
    //     color: "bg-yellow-50 text-yellow-600 hover:bg-yellow-600",
    // },
];

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex w-full h-screen font-raleway">
            <Container className='w-full'>
                <QuickLinks
                    links={SaleLinks}
                    className='bg-white p-3 rounded-md shadow-xl'
                    title="Sale Quick Actions" />
           
           {children}
           
            </Container>
            
        </div>
    );
}
