import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import useFitnessStore from "../store/zustandStore";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const TotalWeightBarChart = () => {
  const { totalWeights } = useFitnessStore();

  const chartData = {
    labels: Object.keys(totalWeights).map((timestamp) =>
      new Date(Number(timestamp)).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Total Weight Lifted per Day",
        data: Object.values(totalWeights),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Weight Lifted Per Day",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Weight Lifting Progress
      </h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default TotalWeightBarChart;
