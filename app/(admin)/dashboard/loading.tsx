import { images } from "@/app/Images";
import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center 
                 bg-darkColor/70 backdrop-blur-sm"
    >
      <div className="flex flex-col justify-center relative items-center text-2xl">
        <Image
          src={images.icon}
          width={30}
          height={30}
          alt="Loading Spinner"
          className="absolute z-10 w-15 h-15"
        />
        <Image
          src={images.Spinner}
          width={100}
          height={100}
          alt="Loading Spinner"
          className="w-28 h-28 relative z-20 animate"
        />
      </div>
    </div>
  );
};

export default Loading;
