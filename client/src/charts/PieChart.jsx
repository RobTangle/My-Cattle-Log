import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ statsObj, by, title }) {
  let dataArrayParsed = [];
  for (const key in statsObj) {
    if (Object.hasOwnProperty.call(statsObj, key)) {
      const element = statsObj[key];
      dataArrayParsed.push(element.count);
    }
  }

  const data = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    labels: Object.keys(statsObj),
    datasets: [
      {
        label: `# por ${by}`,
        data: dataArrayParsed,
        backgroundColor: [
          "rgba(155, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 106, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(205, 206, 86, 0.4)",
          "rgba(35, 192, 192, 0.4)",
          "rgba(94, 162, 235, 0.4)",
          "rgba(105, 206, 86, 0.4)",
          "rgba(35, 232, 192, 0.4)",
          "rgba(34, 162, 235, 0.4)",
          "rgba(235, 106, 86, 0.4)",
          "rgba(35, 192, 112, 0.4)",
        ],
        borderColor: [
          "rgba(155, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 106, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(205, 206, 86, 0.4)",
          "rgba(35, 192, 192, 0.4)",
          "rgba(94, 162, 235, 0.4)",
          "rgba(105, 206, 86, 0.4)",
          "rgba(35, 232, 192, 0.4)",
          "rgba(34, 162, 235, 0.4)",
          "rgba(235, 106, 86, 0.4)",
          "rgba(35, 192, 112, 0.4)",
        ],
        borderWidth: 1,
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
    maintainAspectRatio: false,
  };

  return <Pie data={data} options={options} />;
}
