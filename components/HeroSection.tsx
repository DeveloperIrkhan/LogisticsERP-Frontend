import { images } from "@/public/images";
import Image from "next/image";
import CustomButton from "./CustomButton";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full font-raleway">
      {/* Background Image */}
      <Image
        src={images.hero}
        alt="hero image"
        fill
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-12 text-white">
        <div className="max-w-2xl">
          <p className="uppercase text-gray-color tracking-widest text-sm md:text-lg mb-4">
            Pakistan Red Crescent Society - PRCS
          </p>

          <h1 className="text-2xl md:text-4xl text-gray-color  italic font-raleway leading-tight mb-6">
            Digitally Driven <br />
            <span className="text-4xl text-gray-color md:text-6xl not-italic font-semibold">
              Intelligent Fleet & Logistics Solutions
            </span>
          </h1>

          <div className="flex gap-4">
            <CustomButton
              buttonText="Book Your Fleet"
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
