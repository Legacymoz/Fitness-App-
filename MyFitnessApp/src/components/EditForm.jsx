import React, { useState, useEffect } from "react";
import useFitnessStore from "../store/zustandStore";

const EditForm = () => {
  // Get necessary functions and state from the Zustand store
  const { editingWorkout, editWorkout, clearEditingWorkout, exercises } =
    useFitnessStore();

  // State to keep track of the workout details being edited
  const [workoutDetails, setWorkoutDetails] = useState({
    sets: "",
    reps: "",
    weight: "",
  });

  // useEffect hook to update the workout details state when editingWorkout changes
  useEffect(() => {
    if (editingWorkout) {
      setWorkoutDetails({
        sets: editingWorkout.sets,
        reps: editingWorkout.reps,
        weight: editingWorkout.weight,
      });
    }
  }, [editingWorkout]);

  // Function to handle input changes and update the workout details state
  const handleInput = (e) => {
    const { name, value } = e.target;
    setWorkoutDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle form submission and update the workout in the Zustand store
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Find the selected exercise details from the exercises list
    const selectedExerciseDetails = exercises.find(
      (exercise) => exercise.id === parseInt(editingWorkout.exerciseId, 10)
    );

    if (!selectedExerciseDetails) {
      alert("Please select an exercise.");
      return;
    }

    // Create an updated workout object with the new details
    const updatedWorkout = {
      exerciseId: editingWorkout.exerciseId,
      exerciseName: selectedExerciseDetails.name,
      ...workoutDetails,
      timestamp: editingWorkout.timestamp,
    };

    // Call the editWorkout function to update the workout in the Zustand store
    editWorkout(updatedWorkout);
    // Clear the editing workout state
    clearEditingWorkout();
  };

  if (!editingWorkout) return null;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Edit Workout
      </h2>
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
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditForm;
