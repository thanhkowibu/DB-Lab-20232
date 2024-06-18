import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface NewUsersChartProps {
  data: number[];
  labels: string[];
  reference: string;
  title: string;
  showTitle: boolean;
  showLegend: boolean;
}

const DiffChart: React.FC<NewUsersChartProps> = ({
  data,
  labels,
  title,
  showTitle,
  showLegend,
  reference,
}) => {
  const thisMonth = data[1];
  const lastMonth = data[0];

  const backgroundColors =
    reference === "Booking"
      ? [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ]
      : [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ];

  const borderColors =
    reference === "Booking"
      ? ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"]
      : ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"];

  const chartData = {
    labels,
    datasets: [
      {
        label: "New " + reference,
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: showLegend,
        position: "top" as const,
      },
      title: {
        display: showTitle,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const difference = thisMonth - lastMonth;
  const percentageChange =
    lastMonth !== 0
      ? ((difference / lastMonth) * 100).toFixed(1)
      : "N/A";

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6 bg-gray-800 text-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-sm font-medium text-gray-400">
            This Month New {`${reference}`}
          </h2>
          <p className="text-2xl font-bold">{thisMonth}</p>
          <p
            className={`text-sm ${
              difference >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            <span>
              {difference >= 0 ? "↑" : "↓"} {difference}
            </span>{" "}
            {percentageChange !== "N/A" &&
              `(${percentageChange}%)`}{" "}
            Up From Last Month
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-sm font-medium text-gray-400">
            Last Month New {`${reference}`}
          </h2>
          <p className="text-xl font-bold text-gray-400">
            {lastMonth}
          </p>
        </div>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DiffChart;
