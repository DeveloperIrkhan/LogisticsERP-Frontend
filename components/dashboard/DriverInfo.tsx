import Link from "next/link";
import PieChart from "../Charts/PieChart";
import PortionDesign from "../PortionDesign";
import { IDashboardSummary } from "@/modules/dashboards/types";
interface IDriverInfo {
  getSummary: IDashboardSummary;
  className?: string;
}
const DriverInfo = ({ getSummary, className }: IDriverInfo) => {
  return (
    <PortionDesign className={`bg-white ${className}`}>
      <div className="flex items-center justify-between p-4 pb-2">
        <h2 className="font-bold text-gray-900 w-full">Driver Info</h2>
        <Link className='text-sm flex w-full text-blue-500 justify-end
             hover:text-red-600 hoverEffect' href={"/dashboard/drivers/get-all-drivers"}>view all</Link>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
        <PieChart
          chartTitle="Total Drivers"
          totalValue={100}
          calculatedValue={getSummary?.driverStatsDto.totalDrivers ?? 0}
          insideTitle="Drivers"
          key="1"
        />
        <PieChart
          chartTitle="On Duty Drivers"
          totalValue={getSummary?.driverStatsDto.totalDrivers ?? 0}
          calculatedValue={getSummary?.driverStatsDto.onDutyDrivers ?? 0}
          insideTitle="On Duty"
          key="2"
        />

        <PieChart
          chartTitle="Active Drivers"
          totalValue={getSummary?.driverStatsDto.totalDrivers ?? 0}
          calculatedValue={getSummary?.driverStatsDto.totalActiveDrivers ?? 0}
          insideTitle="Active"
          key="4"
        />
        <PieChart
          chartTitle="Inactive Drivers"
          totalValue={getSummary?.driverStatsDto.totalDrivers ?? 0}
          calculatedValue={getSummary?.driverStatsDto.inActiveDrivers ?? 0}
          insideTitle="Inactive"
          key="5"
        />
      </div>
    </PortionDesign>
  );
};

export default DriverInfo;
