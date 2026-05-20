import Image from "next/image";
interface IBadgeProps {
  Icon: React.ElementType;
  title: string;
  subTitle: string;
}
const BadgeCard = ({ Icon, title, subTitle }: IBadgeProps) => {
  return (
    <div className="group [perspective:1000px] w-60 h-80">
      <div className="relative w-full h-full transition-transform duration-800 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* FRONT SIDE */}
        <div className="absolute inset-0 flex flex-col justify-center items-center border h-80 w-60 bg-white/20 border-white/20 rounded-lg p-6 text-white [backface-visibility:hidden]">
          <div className="mb-4">{Icon && <Icon className="w-20 h-20 font-extralight" />}</div>

          <h3 className="text-lg md:text-4xl font-bold hoverEffect">{title}</h3>

          <p className="text-sm text-gray-400 hoverEffect">{subTitle}</p>
        </div>

        <div className="absolute inset-0 flex justify-center items-center h-80 w-60 bg-black/90 rounded-lg p-6 rotate-y-180 backface-hidden">
          <div className="absolute inset-0 flex flex-col justify-center items-center text-dark-color border h-80 w-60 border-dark-color rounded-lg p-6 backface-hidden">
            <div className="mb-4">{Icon && <Icon className="w-20 h-20" />}</div>

            <h3 className="text-lg md:text-4xl text-dark-color font-bold hoverEffect">
              {title}
            </h3>

            <p className="text-sm text-dark-color hoverEffect">{subTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;
