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
} from "chart.js"; // Import the necessary Chart.js library components
import useFitnessStore from "../store/zustandStore";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
); // Register the Chart.js components

const TotalWeightBarChart = () => {
  const { totalWeights } = useFitnessStore();

  const chartData = {
    labels: Object.keys(totalWeights).map(
      (timestamp) => new Date(Number(timestamp)).toLocaleDateString() // Convert timestamp to a human-readable date
    ),
    datasets: [
      {
        label: "Total Weight Lifted per Day", // Label for the chart
        data: Object.values(totalWeights), // Values of totalWeight lifted on each date
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color (Optional, based on your visual preference)
        borderColor: "rgba(75, 192, 192, 1)", // Border color for bars
        borderWidth: 1, // Border thickness
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
    <div>
      <h2>Weight Lifting Progress</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default TotalWeightBarChart;
