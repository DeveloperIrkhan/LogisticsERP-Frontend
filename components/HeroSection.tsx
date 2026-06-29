import { images } from "@/public/images";
import Image from "next/image";
import CustomButton from "./CustomButton";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full font-raleway">
      {/* Background Image */}
      <Image
        src={images.herojpg}
        alt="hero image"
        fill
        className="absolute bg-black/20 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-12 text-white">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-2xl text-gray-color  italic font-raleway leading-tight mb-6">
            Digitally Driven 
            <span className="px-3 white-color md:text-5xl not-italic font-semibold uppercase">
              Intelligent <br />
              <span className="text-4xl md:text-7xl text-dark-color font-Archivo">
                Fleet & Logistics
              </span>{" "}
              <br />
              Solutions
            </span>
          </h1>
          <p className="uppercase text-gray-color tracking-widest text-sm md:text-lg mb-4">
            Pakistan Red Crescent Society - PRCS
          </p>

          <div className="flex gap-4">
            <CustomButton
              buttonText="Add Vehicle To Fleet"
              buttonColor="bg-red-600"
              buttonHoverColor="bg-red-900"
              className="px-6 py-3 rounded-full font-bold"
            />

            <CustomButton
              buttonText="Book Now"
              buttonColor="bg-transparent"
              buttonHoverColor="bg-white"
              className="px-6 py-3 border border-white font-medium duration-700 rounded-full text-white hover:text-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
}