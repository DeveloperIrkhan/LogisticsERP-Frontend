import { images } from "@/public/images";
import Image from "next/image";
import React from "react";

const Spinner = () => {
  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center 
                 bg-darkColor/70 backdrop-blur-sm"
    >
      <div className="flex flex-col justify-center relative items-center text-2xl">
        <Image
          src={images.Spinner}
          width={200}
          height={200}
          alt="Loading Spinner"
          className="w-28 h-28 relative z-20 animate"
        />
      </div>
    </div>
  );
};

export default Spinner;
