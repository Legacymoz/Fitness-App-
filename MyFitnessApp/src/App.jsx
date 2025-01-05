import { useState, useEffect } from "react";
import TodayWorkout from "./components/TodayWorkout";
import WorkoutLog from "./components/WorkoutLog";
import useFitnessStore from "./store/zustandStore";
import ExerciseDetailsButton from "./components/ExerciseDetailsButton";
import WorkoutHistory from "./components/WorkoutHistory";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div>
      <WorkoutHistory />
      <WorkoutLog />
      <TodayWorkout />
      {/* <SearchBar /> */}
    </div>
  );
}

export default App;
