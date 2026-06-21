import { images } from "@/public/images";
import Image from "next/image";

export default function Logo() {
  return (
    <a href="#" className="relative flex h-16 items-center md:h-18">
      {/* Angled red background, like the reference image */}
      <span
        className="absolute inset-y-0 left-0 -right-6 md:-right-10"
        style={{
          clipPath: "polygon(0 0, 100% 0, calc(100% - 24px) 100%, 0 100%)",
        }}
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center gap-2 pl-5 pr-8 text-xl font-bold text-white md:pl-8 md:pr-14 md:text-2xl">
        <Image src={images.logo} alt="" height={400} width={100} />
      </span>
    </a>
  );
}
