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

  return (
    <div className="flex flex-col p-2 w-full">
      <h2 className="text-sm font-bold text-gray-700 mb-4">
        {chartTitle}
      </h2>

      <div className="w-full h-4  bg-gray-300 rounded-2xl relative overflow-hidden">
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

     
    </div>
  );
};

export default BarChart;
