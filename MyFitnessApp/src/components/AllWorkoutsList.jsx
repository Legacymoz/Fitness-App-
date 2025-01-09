import React, { useState } from "react";
import useFitnessStore from "../store/zustandStore";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const AllWorkoutList = () => {
  const { workouts } = useFitnessStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-CA", {
      timeZone: "Africa/Nairobi",
    });
  };

  const uniqueDates = [
    ...new Set(workouts.map((workout) => formatDate(workout.timestamp))),
  ];

  const handleDateClick = (date) => {
    setSelectedDate((prevDate) => (prevDate === date ? null : date));
    setSelectedExercise(null); // Reset selected exercise when date changes
  };

  const handleExerciseClick = (workout) => {
    setSelectedExercise((prevExercise) =>
      prevExercise === workout ? null : workout
    );
  };

  return (
    <div>
      <h2>All Workouts</h2>
      <ul>
        {uniqueDates.map((date, index) => (
          <li key={index}>
            <button onClick={() => handleDateClick(date)}>{date}</button>
            {selectedDate === date && (
              <ul>
                {workouts
                  .filter((workout) => formatDate(workout.timestamp) === date)
                  .map((workout, index) => (
                    <li key={index}>
                      <button onClick={() => handleExerciseClick(workout)}>
                        {workout.exerciseName}
                      </button>
                      {selectedExercise === workout && (
                        <div>
                          <p>Sets: {workout.sets}</p>
                          <p>Reps: {workout.reps}</p>
                          <p>Weight: {workout.weight}</p>
                          <EditButton workout={workout} />
                          <DeleteButton timestamp={workout.timestamp} />
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllWorkoutList;
