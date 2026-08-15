import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";
import { FaRegBell } from "react-icons/fa";
import Container from "@/components/Container";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineGridView } from "react-icons/md";
import { SiLanggraph } from "react-icons/si";
import QuickLinks from "@/components/dashboard/QuickLinks";

export const metadata: Metadata = {
    title: "Pakistan Red Crecent Socity | Inventory Management system",
    description: "this is webapp used for PRCS's Fleet Logestics",
    icons: {},
};

const SaleLinks = [
    {
        label: "Add Sale Record",
        href: "/inventory/item-sale/create",
        icon: IoMdAdd,
        color: "bg-lime-50 text-lime-600 hover:bg-lime-600",
    },
    {
        label: "View Sales Items",
        href: "/inventory/item-sale/view-all",
        icon: MdOutlineGridView,
        color: "bg-pink-50 text-pink-600 hover:bg-pink-600",
    },
    // {
    //     label: "Active Sales Items",
    //     href: "/inventory/item-sale/active-items",
    //     icon: FaRegBell,
    //     color: "bg-orange-50 text-orange-600 hover:bg-orange-600",
    // },
    // {
    //     label: "Sales Reports",
    //     href: "/inventory/item-sale/stock-reports",
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
