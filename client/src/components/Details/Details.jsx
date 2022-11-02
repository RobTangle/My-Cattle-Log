import React from "react";
import { DoughnutChart } from "../../charts/doughnut/DoughnutChart";
import { BarChart } from "../../charts/BarChart";
export function Details() {
  React.useEffect(() => {});

  return (
    <div>
      <h1>DETAILS</h1>
      <div>
        <DoughnutChart />
      </div>
      <div>
        <BarChart />
      </div>
    </div>
  );
}
