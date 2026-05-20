import { images } from "@/public/images";
import Image from "next/image";
import React from "react";
import BadgeCard from "./BadgeCard";
import { TbRoute } from "react-icons/tb";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { Truck } from "lucide-react";
import { CiDeliveryTruck, CiStopwatch } from "react-icons/ci";

const BadgeSection = () => {
  return (
    <section className="relative h-screen w-full font-raleway">
      {/* Background Image */}
      <Image
        src={images.badgeimg}
        alt="hero image"
        fill
        className="absolute bg-black/20 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85" />
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
            <BadgeCard
              Icon={CiDeliveryTruck}
              title="1400"
              subTitle="Active Vehicles"
            />
            <BadgeCard
              Icon={HiOutlineSpeakerWave}
              title="120min"
              subTitle="Avg. Response"
            />
            <BadgeCard Icon={TbRoute} title="99.9%" subTitle="Route Accuracy" />
            <BadgeCard
              Icon={CiStopwatch}
              title="24/7"
              subTitle="Active Dispatch"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BadgeSection;
