import { cn } from "@/lib/utils";
import React from "react";
interface IButtonProps {
  onClickFunction?: () => void;
  buttonText: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}
const CustomButton = ({
  onClickFunction,
  buttonText,
  buttonColor,
  icon,
  className,
  buttonHoverColor,
  disabled,
  type = "button",
}: IButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClickFunction}
      className={cn(
        `group relative overflow-hidden h-10 px-4 py-1 
        rounded-md text-white text-sm font-medium 
        flex items-center justify-center gap-2 
        ${buttonColor || "bg-default-color"} 
        ${disabled && "bg-light-color cursor-not-allowed"}`,
        className,
        className,
      )}
    >
      <span
        className={`absolute inset-0  transform -translate-x-full
           group-hover:translate-x-0 transition-transform duration-500
            ease-out z-0 ${buttonHoverColor || "bg-black"}`}
      ></span>

      <div className="relative z-10 flex items-center gap-2">
        {icon && (
          <span className="group-hover:-translate-x-2 duration-400">
            {icon}
          </span>
        )}
        {buttonText}
      </div>
    </button>
  );
};
export default CustomButton;
