import React, { useState } from "react";
import useFitnessStore from "../store/zustandStore";
import ExerciseList from "./ExerciseList";

const WorkoutLog = () => {
  const { selectedExercise, setWorkouts, workouts,exercises} = useFitnessStore();
  const [workoutDetails, setWorkoutDetails] = useState({
    sets: "",
    reps: "",
    weight: "",
  });
  const handleInput = (e) => {
    const {name, value} = e.target;
    setWorkoutDetails((prev) => ({...prev, [name]: value}));
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedExerciseDetails = exercises.find(
      (exercise) => exercise.id === parseInt(selectedExercise, 10)
    );


    if (!selectedExercise) {
      alert("Please select an exercise.");
      return;
    }

    const newWorkout = {
      exerciseId: selectedExercise,
      exerciseName: selectedExerciseDetails.name,
      ...workoutDetails,
      timestamp: new Date(),
    };
    setWorkouts(newWorkout);

    setWorkoutDetails({ sets: "", reps: "", weight: "" }); // Reset form inputs
    console.log("These are my Workouts:", workouts)
  }

  return (
    <div>
      <h1>My Workout </h1>
      <div>
        <ExerciseList />
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="sets"> Sets: </label>
            <input
              type="number"
              name="sets"
              value={workoutDetails.sets}
              onChange={handleInput}
              required
              min="1"
              placeholder="Enter number of Sets"
            />
          </div>
          <div>
            <label htmlFor="reps"> Reps: </label>
            <input
              type="number"
              name="reps"
              value={workoutDetails.reps}
              onChange={handleInput}
              required
              placeholder="Enter number of Reps"
            />
          </div>
          <div>
            <label htmlFor="weight"> Weight: </label>
            <input
              type="number"
              name="weight"
              value={workoutDetails.weight}
              onChange={handleInput}
              required
              placeholder="Enter Weight"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutLog;
