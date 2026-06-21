import { progress } from "framer-motion";
import React from "react";

interface IBarChartProps {
  chartTitle: string;
  value: number; // percentage from 0 to 100
  totalCount: number; // percentage from 0 to 100
}

const BarChart = ({ value, chartTitle, totalCount }: IBarChartProps) => {
  const getColor = (persentage: number) => {
    if (persentage <= 25) return "#f44336"; // Red
    if (persentage <= 50) return "#42A5F5"; // Yellow
    if (persentage <= 75) return "#66BB6A"; // Orange
    return "#FFA000";
  };
  const persentage = Math.floor((value * 100) / totalCount);

  const progressColor = getColor(persentage);

  const getProgress = (persentage: number) => {
    if (persentage <= 25) return "Normal";
    if (persentage <= 50) return "Good"; // Yellow
    if (persentage <= 75) return "Best"; // Orange
    return "Outstanding";
  };
  const Progress = getProgress(persentage);

  return (
    <div className="bg-gray-50 flex items-center justify-center flex-col rounded-xl shadow-md p-4 w-full max-w-md">
      <h2 className="text-sm font-bold text-gray-700 mb-4 text-center">
        {chartTitle}
      </h2>

      {/* Progress Bar */}
      <div className="w-full h-4  bg-[#e0e0e0] rounded-2xl relative overflow-hidden">
        <div
          className="h-full rounded-2xl flex items-center justify-center"
          style={{
            width: `${persentage}%`,
            backgroundColor: progressColor,
            transition: "width 0.3s ease"
          }}
        >
          <span className="text-xs text-white font-semibold">
            {persentage}%
          </span>
        </div>
      </div>

      {/* Label */}
      <div className="mt-4 flex items-center justify-between w-full text-sm text-gray-600">
        <span>Progress</span>
        <span className="font-semibold text-black">{Progress}</span>
      </div>
    </div>
  );
};

export default BarChart;
