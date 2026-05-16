import type { Metadata } from "next";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import Image from "next/image";
import SideBarComponent from "@/components/Admin/SideBarComponent";
import Container from "@/components/ui/Container";
import PageTitle from "@/components/ui/PageTitle";
import { images } from "@/app/Images";
import UserLoginButton from "@/components/UserLoginButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Panel | Ticket Management System",
  description: "this is admin panel used for Ticket managment system.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <ToastContainer autoClose={10} position="top-center" />
      <SideBarComponent />
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center py-1 px-4 shadow-md md:ml-0 ml-7">
          <div className="ml-3">
            <Link href="/dashboard">
              <Image
                src={images.Logo}
                height={75}
                className="p-2"
                width={75}
                alt="logo"
              />
            </Link>
          </div>
          <div className="">
            <PageTitle className="text-center uppercase border-b md:block hidden text-main-brand-color tracking-wider text-shadow-2xs text-shadow-main-brand-color">
              Admin Section
            </PageTitle>
          </div>
          <div className="flex gap-2">
            <UserLoginButton />
          </div>
        </header>
        <main className="p-3">
          <Container className="">{children}</Container>
        </main>
      </div>

      {/* Main Section */}
    </div>
  );
}
