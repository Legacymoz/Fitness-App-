import React, { useEffect, useState } from "react";
import useFitnessStore from "../store/zustandStore";
import ExerciseList from "./ExerciseList";
import EditForm from "./EditForm";

const WorkoutLog = () => {
  const { selectedExercise, setWorkouts, workouts, exercises } =
    useFitnessStore();
  const [workoutDetails, setWorkoutDetails] = useState({
    sets: "",
    reps: "",
    weight: "",
    date: new Date().toLocaleDateString("en-CA", {
      timeZone: "Africa/Nairobi",
    }), // Default to today's date
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setWorkoutDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedExerciseDetails = exercises.find(
      (exercise) => exercise.id === parseInt(selectedExercise, 10)
    );

    if (!selectedExercise) {
      alert("Please select an exercise.");
      return;
    }

    const dateParts = workoutDetails.date.split("-");
    const timestamp = new Date(
      dateParts[0], // year
      dateParts[1] - 1, // month (0-based index)
      dateParts[2], // day
      new Date().getHours(), // current hour
      new Date().getMinutes(), // current minute
      new Date().getSeconds(), // current second
      new Date().getMilliseconds() // current millisecond
    ).getTime();

    const newWorkout = {
      exerciseId: selectedExercise,
      exerciseName: selectedExerciseDetails.name,
      ...workoutDetails,
      timestamp, // Use the constructed timestamp
    };
    setWorkouts(newWorkout);

    setWorkoutDetails({
      sets: "",
      reps: "",
      weight: "",
      date: new Date().toLocaleDateString("en-CA", {
        timeZone: "Africa/Nairobi",
      }),
      
    }); // Reset form inputs
    console.log("These are my Workouts:", workouts);
  };

  useEffect(() => {
    console.log("Workouts:", workouts);
  }, [workouts]);

  return (
    <div>
      <h1>My Workout</h1>
      <div>
        <ExerciseList />
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="sets">Sets:</label>
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
            <label htmlFor="reps">Reps:</label>
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
            <label htmlFor="weight">Weight:</label>
            <input
              type="number"
              name="weight"
              value={workoutDetails.weight}
              onChange={handleInput}
              required
              placeholder="Enter Weight"
            />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              value={workoutDetails.date}
              onChange={handleInput}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <EditForm />
    </div>
  );
};

export default WorkoutLog;
