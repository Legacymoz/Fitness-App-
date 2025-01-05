import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useFitnessStore from "../store/zustandStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TotalWorkoutsLineGraphs = () => {
  const { totalWorkouts } = useFitnessStore();

  const chartData = {
    labels: Object.keys(totalWorkouts).map(
      (timestamp) => new Date(Number(timestamp)).toLocaleDateString() // Format timestamp as date string
    ),
    datasets: [
      {
        label: "Total Workouts per Day",
        data: Object.values(totalWorkouts),
        fill: false,
        borderColor: "#4b7bec",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Workouts per Day",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Total Workouts: ${tooltipItem.raw}`; // Customize tooltip text
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Workouts",
        },
        min: 0,
      },
    },
  };

  return (
    <div>
      <h2>Total Workouts Chart</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default TotalWorkoutsLineGraphs;
