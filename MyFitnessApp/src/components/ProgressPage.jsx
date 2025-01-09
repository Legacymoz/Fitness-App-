import React from "react";
import TotalWeightBarChart from "./TotalWeightBarChart";
import TotalWorkoutsLineGraphs from "./TotalWorkoutsLineGraphs";
import WorkoutHistory from "./WorkoutHistory";

const ProgressPage = () => {
  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Progress
      </h1>
      <div className="mb-8">
        <WorkoutHistory />
      </div>
      <div className="mb-8">
        <TotalWeightBarChart />
      </div>
      <div>
        <TotalWorkoutsLineGraphs />
      </div>
    </div>
  );
};

export default ProgressPage;
