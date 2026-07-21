import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";
import { InventoryMenuItems } from "@/components/InventoryMenuItems";
import { Home } from "lucide-react";
import { BsGearWideConnected, } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import InventoryMenu from "@/components/InventoryMenu";
import { FaCoins } from "react-icons/fa";
import { BiSitemap } from "react-icons/bi";

export const metadata: Metadata = {
    title: "Pakistan Red Crecent Socity | Inventory Management system",
    description: "this is webapp used for PRCS's Fleet Logestics",
    icons: {},
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen font-raleway">
            <InventoryMenu>
                <div className="border-t flex w-full border-gray-600" />
                <InventoryMenuItems
                    icon={<Home size={20} />}
                    text="Home"
                    alert="Home"
                    href="/inventory" />
                <div className="border-t flex w-full border-gray-600" />
                <InventoryMenuItems
                    icon={<BiSitemap size={20} />}
                    text="Item"
                    href="/inventory/item"
                />
                <div className="border-t flex w-full border-gray-600" />
                <InventoryMenuItems
                    icon={<FaCoins size={20} />}
                    text="Sale"
                    href="/inventory/sale"
                />
                <div className="border-t flex w-full border-gray-600" />
                <InventoryMenuItems
                    icon={<BsGearWideConnected size={20} />}
                    text="Purchase"
                    href="/dashboard/purchase"
                />
                <div className="border-t flex w-full border-gray-600" />
                <InventoryMenuItems
                    icon={<HiOutlineDocumentReport size={20} />}
                    text="Reports"
                    href="/dashboard/report"
                />
                <div className="border-t flex w-full border-gray-600" />
            </InventoryMenu>

            <div className="flex-1 flex flex-col bg-gray-200 overflow-hidden">
                <section className="flex-1 overflow-y-auto flex p-2 font-raleway">
                    {children}
                </section>
            </div>
        </div>
    );
}
