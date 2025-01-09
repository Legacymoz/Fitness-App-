import React, { useState, useEffect } from "react";
import useFitnessStore from "../store/zustandStore";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import DoneButton from "./DoneButton";
import ExerciseDetailsButton from "./ExerciseDetailsButton";
import ExerciseDetails from "./ExerciseDetails";

const TodayWorkout = () => {
  const { presentDayWorkouts, setPresentDayWorkouts, workouts } =
    useFitnessStore();
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    setPresentDayWorkouts();
  }, [setPresentDayWorkouts, workouts]);

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout((prevWorkout) =>
      prevWorkout === workout ? null : workout
    );
  };

  return (
    <div className=" bg-gray-50 p-4 rounded-lg  w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Today's Workouts
      </h2>
      {presentDayWorkouts.length > 0 ? (
        <ul>
          {presentDayWorkouts.map((workout, index) => (
            <li key={index} className="mb-4">
              <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer mt-4">
                <h2
                  onClick={() => handleWorkoutClick(workout)}
                  className="text-xl font-bold text-gray-800"
                >
                  {workout.exerciseName}
                </h2>
                {selectedWorkout === workout && (
                  <div className="mt-2">
                    <p className="text-gray-600">Sets: {workout.sets}</p>
                    <p className="text-gray-600">Reps: {workout.reps}</p>
                    <p className="text-gray-600">Weight: {workout.weight}</p>

                    <div className="mt-2 flex space-x-2">
                      <EditButton workout={workout} />
                      <DoneButton timestamp={workout.timestamp} />
                      <DeleteButton timestamp={workout.timestamp} />
                      <ExerciseDetailsButton exerciseId={workout.exerciseId} />
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No workouts for today.</p>
      )}
    </div>
  );
};

export default TodayWorkout;
