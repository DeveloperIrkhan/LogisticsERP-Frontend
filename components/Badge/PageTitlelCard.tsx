import React from "react";

interface IProps {
  h2: string;
  p: string;
  boxTitle?: string;
  Total?: number;
}
const PageTitlelCard = ({ h2, p, boxTitle, Total }: IProps) => {
  return (
    <div className="flex bg-dark-color p-5 rounded-md flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
      <div>
        <h1 className="text-2xl capitalize font-extrabold text-white">{h2}</h1>

        <p className="text-white/70 mt-2 text-lg">{p}</p>
      </div>

      <div className="bg-white shadow-lg border border-slate-200 rounded-2xl px-6 py-4">
        <p className="text-slate-500 text-sm">{boxTitle}</p>

        <h2 className="text-3xl font-bold text-dark-color">{Total}</h2>
      </div>
    </div>
  );
};

export default PageTitlelCard;
