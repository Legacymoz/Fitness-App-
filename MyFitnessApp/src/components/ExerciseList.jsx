import { useEffect } from "react";
import useFitnessStore from "../store/zustandStore";

const ExerciseList = () => {
  const {
    exercises,
    fetchExercises,
    hasFetchedExercises,
    setSelectedExercise,
  } = useFitnessStore();

  useEffect(() => {
    if (!hasFetchedExercises) {
      fetchExercises(); // Fetch data on component mount
    }
  }, [fetchExercises, hasFetchedExercises]);

  useEffect(() => {
    console.log("Exercises Loading complete");
  }, [exercises]);

  return (
    <div className="bg-white p-0 rounded-lg ">
      <label
        htmlFor="exercise"
        className="block text-gray-700 font-semibold mb-2"
      >
        Select an Exercise
      </label>
      <select
        id="exercise"
        onChange={(e) => {
          setSelectedExercise(e.target.value);
        }}
        className="block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select an exercise</option>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Loading exercises...
          </option>
        )}
      </select>
    </div>
  );
};

export default ExerciseList;
