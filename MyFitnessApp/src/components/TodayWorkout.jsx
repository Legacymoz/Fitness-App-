import useFitnessStore from "../store/zustandStore";
import React, { useState, useEffect } from "react";
import ExerciseDetails from "./ExerciseDetails";
import ExerciseDetailsButton from "./ExerciseDetailsButton";
import DeleteButton from "./DeleteButton";
import DoneButton from "./DoneButton";

const TodayWorkout = () => {
  const [presentWorkout, setPresentWorkout] = useState([]);
  const {
    workouts,previousWorkouts,
    presentDayWorkouts,
    setPresentDayWorkouts,
  } = useFitnessStore();

  useEffect(() => {
    // Call the setPresentDayWorkouts method on component mount to set today's workouts
    setPresentDayWorkouts();
  }, [workouts, setPresentDayWorkouts]);

  useEffect(() => {
    setPresentWorkout(presentDayWorkouts); // Update the presentWorkout state when presentDayWorkouts from store changes
  }, [presentDayWorkouts]);
  
  // const currentTimestamp = normalizedDate(Date.now());

  // useEffect(() => {
  //   const todaysWorkouts = workouts.filter((workout) => {
  //     const workoutDate = normalizedDate(workout.timestamp);
  //     return workoutDate === currentTimestamp;
  //   });

  //   setPresentWorkout(todaysWorkouts); // Set the state with today's workouts
  //   console.log("My present workout is: ", presentWorkout);
  // }, [workouts, currentTimestamp]); // Only re-run effect when `workouts` or `currentTimestamp` change


  // useEffect(() => {
  //   console.log("Previous workouts: ", previousWorkouts);
  //   console.log("Updated workouts: ", workouts);
  //   const timestamp = Object.keys(previousWorkouts)[0]; // Get the first key (timestamp)
  //   const currentTime = new Date(parseInt(timestamp)); // Create a Date object from the timestamp
  //   console.log("The current time is" ,currentTime);
  // }, [previousWorkouts]);
  

  return (
    <div>
      <div>Todays Session</div>
      {presentWorkout.length > 0 ? (
        presentWorkout.map((workout) => (
          <div key={ workout.timestamp}>
            <h2>{workout.exerciseName}</h2> {/* Access exercise name */}
            <p>Sets: {workout.sets}</p> {/* Display sets */}
            <p>Reps: {workout.reps}</p> {/* Display reps */}
            <p>Weight: {workout.weight}</p> {/* Display weight if necessary */}
            <ExerciseDetailsButton exerciseId={workout.exerciseId} />
            <DeleteButton timestamp={workout.timestamp} />
            <DoneButton timestamp={workout.timestamp} />
          </div>
        ))
      ) : (
        <p>No workout logged for today.</p> // If no workouts, display this message
      )}
    </div>
  );
};

export default TodayWorkout;
