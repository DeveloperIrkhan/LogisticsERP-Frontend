import PieChart from "../Charts/PieChart";
import PortionDesign from "../PortionDesign";
import { IDashboardSummary } from "@/modules/dashboards/types";
interface IDriverInfo {
  getSummary: IDashboardSummary;
}
const DriverInfo = ({ getSummary }: IDriverInfo) => {
  return (
    <PortionDesign className="bg-white">
      <h2 className="p-3 font-bold text-gray-900">Driver Info</h2>
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
