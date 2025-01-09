import React, { useState, useEffect } from "react";
import useFitnessStore from "../store/zustandStore";

const EditForm = () => {
  const { editingWorkout, editWorkout, clearEditingWorkout, exercises } =
    useFitnessStore();
  const [workoutDetails, setWorkoutDetails] = useState({
    sets: "",
    reps: "",
    weight: "",
    date: ""
  });

  useEffect(() => {
    if (editingWorkout) {
      setWorkoutDetails({
        sets: editingWorkout.sets,
        reps: editingWorkout.reps,
        weight: editingWorkout.weight,
        date: editingWorkout.date,
      });
    }
  }, [editingWorkout]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setWorkoutDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedExerciseDetails = exercises.find(
      (exercise) => exercise.id === parseInt(editingWorkout.exerciseId, 10)
    );

    if (!selectedExerciseDetails) {
      alert("Please select an exercise.");
      return;
    }

    const updatedWorkout = {
      exerciseId: editingWorkout.exerciseId,
      exerciseName: selectedExerciseDetails.name,
      ...workoutDetails,
      timestamp: editingWorkout.timestamp,
    };

    editWorkout(updatedWorkout);
    clearEditingWorkout();
  };

  if (!editingWorkout) return null;

  return (
    <div>
      <h2>Edit Workout</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditForm;
