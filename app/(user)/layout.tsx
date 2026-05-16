import type { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import Image from "next/image";
import { images } from "@/public/images";

export const metadata: Metadata = {
  title: "Complaint Registeration System",
  description: "this is webapp used for Ticket managment system.",
  icons: {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <ToastContainer position="top-right" autoClose={3000} />
      <section className="w-full h-22 font-raleway bg-black"></section>
      {children}
    </div>
  );
}
