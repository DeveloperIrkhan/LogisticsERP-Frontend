import React from "react";

interface IProps {
  h2: string;
  p: string;
  boxTitle?: string;
  ActiveNowTitle?: string;
  Total?: number;
  ActiveNow?: number;
}
const PageTitlelCard = ({ h2, p, boxTitle, Total, ActiveNowTitle,ActiveNow }: IProps) => {
  return (
    <div className="flex bg-linear-to-r from-red-500 to-red-800 p-3 rounded-md flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
      <div>
        <h1 className="text-2xl capitalize font-bold tracking-widest text-white">{h2}</h1>
        <p className="text-white/70 mt-2 text-lg">{p}</p>
      </div>

      <div className="flex gap-4">
        <div className="bg-white/20 shadow-lg border border-slate-200 rounded-2xl px-6 py-4">
          <p className="text-white text-sm">{boxTitle}</p>
          <h2 className="text-3xl font-bold text-white">{Total}</h2>
        </div>
        {ActiveNow && (
          <div className="bg-white/20 shadow-lg border border-slate-200 rounded-2xl px-6 py-4">
          <p className="text-white text-sm">{ActiveNowTitle}</p>
          <h2 className="text-3xl font-bold text-white">{ActiveNow}</h2>
        </div>
          
        )}
      </div>
    </div>
  );
};

export default PageTitlelCard;
