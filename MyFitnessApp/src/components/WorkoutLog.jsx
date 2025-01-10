import React, { useEffect, useState } from "react";
import useFitnessStore from "../store/zustandStore";
import ExerciseList from "./ExerciseList";
import EditForm from "./EditForm";

const WorkoutLog = () => {
  const { selectedExercise, setWorkouts, workouts, exercises } =
    useFitnessStore();

  // State to keep track of the workout details being logged
  const [workoutDetails, setWorkoutDetails] = useState({
    sets: "",
    reps: "",
    weight: "",
    date: new Date().toLocaleDateString("en-CA", {
      timeZone: "Africa/Nairobi",
    }), // Default to today's date
  });

  // Function to handle input changes and update the workout details state
  const handleInput = (e) => {
    const { name, value } = e.target;
    setWorkoutDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle form submission and add the workout to the Zustand store
    const handleFormSubmit = (e) => {
      e.preventDefault();

      const selectedExerciseDetails = exercises.find(
        (exercise) => exercise.id === parseInt(selectedExercise, 10)
      );

      if (!selectedExercise) {
        alert("Please select an exercise.");
        return;
      }

      // Split the date string into parts and construct a timestamp
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

      // Create a new workout object with the entered details
      const newWorkout = {
        exerciseId: selectedExercise,
        exerciseName: selectedExerciseDetails.name,
        ...workoutDetails,
        timestamp, // Use the constructed timestamp
      };

      // Add the new workout to the Zustand store
      setWorkouts(newWorkout);

      // Reset the workout details state
      setWorkoutDetails({
        sets: "",
        reps: "",
        weight: "",
        date: new Date().toLocaleDateString("en-CA", {
          timeZone: "Africa/Nairobi",
        }),
      }); // Reset form inputs
      
    };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Log a Workout
      </h2>
      <div className="mb-4">
        <ExerciseList />
      </div>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="sets" className="block text-gray-700">
            Sets:
          </label>
          <input
            type="number"
            name="sets"
            value={workoutDetails.sets}
            onChange={handleInput}
            required
            min="1"
            placeholder="Enter number of Sets"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="reps" className="block text-gray-700">
            Reps:
          </label>
          <input
            type="number"
            name="reps"
            value={workoutDetails.reps}
            onChange={handleInput}
            required
            placeholder="Enter number of Reps"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-gray-700">
            Weight:
          </label>
          <input
            type="number"
            name="weight"
            value={workoutDetails.weight}
            onChange={handleInput}
            required
            placeholder="Enter Weight"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-700">
            Date:
          </label>
          <input
            type="date"
            name="date"
            value={workoutDetails.date}
            onChange={handleInput}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WorkoutLog;
