import React from "react";
interface IPieChartProps {
  chartTitle: string;
  insideTitle?: string;
  calculatedValue: number;
  totalValue: number;
}
const PieChart = ({
  calculatedValue,
  chartTitle,
  totalValue,
  insideTitle
}: IPieChartProps) => {
  const getColor = (persentage: number) => {
    if (persentage <= 25) return "#FF6F21"; // Red
    if (persentage <= 50) return "#FFDE21"; // Yellow
    if (persentage <= 75) return "#2142FF"; // Orange
    return "#8CFF21";// Orange
  };
  const persentage = Math.floor((calculatedValue * 100) / totalValue);
  const progressColor = getColor(persentage);

  const getProgress = (persentage: number) => {
    if (persentage <= 25) return "Normal";
    if (persentage <= 50) return "Good"; // Yellow
    if (persentage <= 75) return "Better"; // Green
    else
    return "Best";
  };
  const Progress = getProgress(persentage);

  return (
    <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center relative">
      <h2 className="text-sm font-bold text-gray-700 mb-4">{chartTitle}</h2>

      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Ring using conic gradient */}
        <div
          className={`w-full h-full rounded-full`}
          style={{
            background: `conic-gradient(${progressColor} 0% ${persentage}%, #e0e0e0 ${persentage}% 100%)`
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-35 h-35 bg-gray-50 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-bold">{calculatedValue}</p>
              <p className="text-xs text-gray-500">{insideTitle ?? "Total"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between w-full px-4 text-sm text-gray-600">
        <span>Progress</span>
        <span className="font-semibold text-black">{Progress}</span>
      </div>
    </div>
  );
};

export default PieChart;
