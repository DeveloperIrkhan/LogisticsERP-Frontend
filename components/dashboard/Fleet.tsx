"use client";
import { IDashboardSummary } from "@/modules/dashboards/types";
import PieChart from "../Charts/PieChart";
import PortionDesign from "../PortionDesign";
interface IFleet {
  getSummary: IDashboardSummary;
}
const Fleet = ({ getSummary }: IFleet) => {
  return (
    <PortionDesign className="bg-white">
      <h2 className="p-3 font-bold text-gray-900">Vehicles Info</h2>
      <div className="grid md:grid-cols-4 grid-cols-2 sm:grid-cols-1 gap-3">
        <PieChart
          chartTitle="Total Vehicles"
          totalValue={100}
          calculatedValue={getSummary?.vehicleStats.totalVehicles ?? 0}
          insideTitle="Car"
          key="1"
        />
        <PieChart
          chartTitle="Active Vehicles"
          totalValue={getSummary?.vehicleStats.totalVehicles ?? 0}
          calculatedValue={getSummary?.vehicleStats.activeVehicles ?? 0}
          insideTitle="Active"
          key="2"
        />
        <PieChart
          chartTitle="Inactive Vehicles"
          totalValue={getSummary?.vehicleStats.totalVehicles ?? 0}
          calculatedValue={getSummary?.vehicleStats.inactiveVehicles ?? 0}
          insideTitle="Inactive"
          key="5"
        />

        <PieChart
          chartTitle="On Trip"
          totalValue={100}
          calculatedValue={getSummary?.vehicleStats.onDutyDrivers ?? 0}
          insideTitle="On Trip"
          key="4"
        />
      </div>
    </PortionDesign>
  );
};

export default Fleet;
