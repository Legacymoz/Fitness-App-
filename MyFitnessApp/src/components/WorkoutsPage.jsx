import React from "react";
import WorkoutLog from "./WorkoutLog";
import AllWorkoutList from "./AllWorkoutsList";

const WorkoutsPage = () => {
  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Workouts
      </h1>
      <div className="mb-8">
        <WorkoutLog />
      </div>
      <div>
        <AllWorkoutList />
      </div>
    </div>
  );
};

export default WorkoutsPage;
