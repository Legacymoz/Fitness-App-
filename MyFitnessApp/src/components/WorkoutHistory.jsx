import React, { useState, useEffect } from "react";
import useFitnessStore from "../store/zustandStore";
import TotalWeightCalculator from "./CalculateTotalweight";

const WorkoutHistory = () => {
  const [expandedDate, setExpandedDate] = useState(null);
  const previousWorkouts = useFitnessStore((state) => state.previousWorkouts);
  const { totalWorkouts, setTotalWorkouts } = useFitnessStore();

  useEffect(() => {
    console.log("Previous Workouts Loaded:", previousWorkouts);
    setTotalWorkouts();
  }, [previousWorkouts]);

  const workoutDates = Object.keys(previousWorkouts).map(
    (timestamp) => new Date(Number(timestamp))
  );
  workoutDates.sort((a, b) => b - a);

  const toggleExpandDate = (date) => {
    setExpandedDate(expandedDate?.getTime() === date.getTime() ? null : date);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {Object.keys(previousWorkouts).length > 0 && <TotalWeightCalculator />}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Workout History
      </h2>
      {workoutDates.map((date) => {
        const formattedDate = date.toLocaleDateString();
        const workoutsForDate = previousWorkouts[date.getTime()];

        return (
          <div key={date.getTime()} className="mb-4">
            <h3
              onClick={() => toggleExpandDate(date)}
              className="text-lg font-semibold text-gray-800 cursor-pointer"
            >
              {formattedDate}
            </h3>
            {expandedDate?.getTime() === date.getTime() && (
              <div className="mt-2 space-y-2">
                {workoutsForDate.map((workout, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-inner"
                  >
                    <p className="text-gray-600">
                      <strong>Exercise: </strong>
                      {workout.exerciseName}
                    </p>
                    <p className="text-gray-600">
                      <strong>Sets: </strong>
                      {workout.sets}
                    </p>
                    <p className="text-gray-600">
                      <strong>Reps: </strong>
                      {workout.reps}
                    </p>
                    <p className="text-gray-600">
                      <strong>Weight: </strong>
                      {workout.weight}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutHistory;
