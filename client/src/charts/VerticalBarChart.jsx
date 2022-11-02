import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function VerticalBarChart({ statsObj, title, by }) {
  const labels = Object.keys(statsObj);

  let dataArrayParsed = [];
  for (const key in statsObj) {
    if (Object.hasOwnProperty.call(statsObj, key)) {
      const element = statsObj[key];
      dataArrayParsed.push(element.count);
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: `# por ${by}`,
        data: dataArrayParsed,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(205, 206, 86, 0.4)",
          "rgba(35, 192, 192, 0.4)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Bar options={options} data={data} />;
}
