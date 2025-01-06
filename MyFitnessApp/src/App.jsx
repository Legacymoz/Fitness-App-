import { useState, useEffect } from "react";
import TodayWorkout from "./components/TodayWorkout";
import WorkoutLog from "./components/WorkoutLog";
import useFitnessStore from "./store/zustandStore";
import ExerciseDetailsButton from "./components/ExerciseDetailsButton";
import WorkoutHistory from "./components/WorkoutHistory";
import SearchBar from "./components/SearchBar";
import TotalWeightBarChart from "./components/TotalWeightBarChart";
import TotalWorkoutsLineGraphs from "./components/TotalWorkoutsLineGraphs";

function App() {
  return (
    <div>
      {/* <WorkoutHistory />
      <WorkoutLog />
      <TodayWorkout />
      <TotalWeightBarChart />
      <TotalWorkoutsLineGraphs /> */}
      <SearchBar />
    </div>
  );
}

export default App;
