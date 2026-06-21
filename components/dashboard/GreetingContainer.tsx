import React from "react";

interface IGreetingProps {
  text: string;
  user: string;
}
const GreetingContainer = ({ text, user }: IGreetingProps) => {
  return (
    <div className="w-full p-3">
      <p className="md:text-lg text-sm text-black capitalize">
        <span className="md:font-bold font-medium font-heading tracking-wider">{text},</span>
        <span className="md:font-bold font-light mx-2 italic">{user}!</span>
      </p>
    </div>
  );
};

export default GreetingContainer;
