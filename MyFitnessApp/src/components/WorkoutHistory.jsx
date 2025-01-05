import React, { useState } from "react";
import useFitnessStore from "../store/zustandStore";

const WorkoutHistory = () => {
  const [expandedDate, setExpandedDate] = useState(null);
  const previousWorkouts = useFitnessStore((state) => state.previousWorkouts);

  const workoutDates = Object.keys(previousWorkouts).map(
    (timestamp) => new Date(Number(timestamp))
  );
  workoutDates.sort((a, b) => b - a);

  const toggleExpandDate = (date) => {
    setExpandedDate(expandedDate?.getTime() === date.getTime() ? null : date);
  };

  return (
    <div>
      <h2>Workout History</h2>
      {workoutDates.map((date) => {
        const formattedDate = date.toLocaleDateString();
        const workoutsForDate = previousWorkouts[date.getTime()];

        return (
          <div key={date.getTime()}>
            <h3
              onClick={() => toggleExpandDate(date)}
              
            >
              {formattedDate}
            </h3>
            {expandedDate?.getTime() === date.getTime() && (
              <div>
                {workoutsForDate.map((workout, index) => (
                  <div key={index}>
                    <p>
                      <strong>Exercise: </strong>
                      {workout.exerciseName}
                    </p>
                    <p>
                      <strong>Sets: </strong>
                      {workout.sets}
                    </p>
                    <p>
                      <strong>Reps: </strong>
                      {workout.reps}
                    </p>
                    <p>
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
