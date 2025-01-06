import { useState, useEffect } from "react";
import TodayWorkout from "./components/TodayWorkout";
import WorkoutLog from "./components/WorkoutLog";
import useFitnessStore from "./store/zustandStore";
import ExerciseDetailsButton from "./components/ExerciseDetailsButton";
import WorkoutHistory from "./components/WorkoutHistory";
import SearchBar from "./components/SearchBar";
import TotalWeightBarChart from "./components/TotalWeightBarChart";
import TotalWorkoutsLineGraphs from "./components/TotalWorkoutsLineGraphs";
import CalendarView from "./components/CalendarView";

function App() {
  return (
    <div>
      <CalendarView />
      <WorkoutLog />
      <TodayWorkout />

      <WorkoutHistory />

      {/* <TotalWeightBarChart />
      <TotalWorkoutsLineGraphs />
      <SearchBar /> */}
    </div>
  );
}

export default App;
