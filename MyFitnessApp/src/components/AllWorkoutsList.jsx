import React, { useState } from "react";
import useFitnessStore from "../store/zustandStore";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const AllWorkoutList = () => {
  // Get the workouts from the Zustand store
  const workouts = useFitnessStore((state) => state.workouts);

  // State to keep track of the selected date
  const [selectedDate, setSelectedDate] = useState(null);

  // State to keep track of the selected exercise
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Function to format the timestamp into a readable date string
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-CA", {
      timeZone: "Africa/Nairobi",
    });
  };

  // Get unique dates from the workouts
  const uniqueDates = [
    ...new Set(workouts.map((workout) => formatDate(workout.timestamp))),
  ];

  // Handle click on a date to toggle the selected date
  const handleDateClick = (date) => {
    setSelectedDate((prevDate) => (prevDate === date ? null : date));
    setSelectedExercise(null); // Reset selected exercise when date changes
  };

  // Handle click on an exercise to toggle the selected exercise
  const handleExerciseClick = (workout) => {
    setSelectedExercise((prevExercise) =>
      prevExercise === workout ? null : workout
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        All Workouts
      </h2>
      <ul className="space-y-4">
        {uniqueDates.map((date, index) => (
          <li key={index}>
            <button
              onClick={() => handleDateClick(date)}
              className="text-lg font-semibold text-gray-800 hover:text-gray-600"
            >
              {date}
            </button>
            {selectedDate === date && (
              <ul className="mt-2 space-y-2">
                {workouts
                  .filter((workout) => formatDate(workout.timestamp) === date)
                  .map((workout, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 p-4 rounded-lg shadow-inner"
                    >
                      <button
                        onClick={() => handleExerciseClick(workout)}
                        className="text-lg font-semibold text-gray-800 hover:text-gray-600"
                      >
                        {workout.exerciseName}
                      </button>
                      {selectedExercise === workout && (
                        <div className="mt-2">
                          <p className="text-gray-600">Sets: {workout.sets}</p>
                          <p className="text-gray-600">Reps: {workout.reps}</p>
                          <p className="text-gray-600">
                            Weight: {workout.weight}
                          </p>
                          <div className="mt-2 flex space-x-2">
                            <EditButton workout={workout} />
                            <DeleteButton timestamp={workout.timestamp} />
                          </div>
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