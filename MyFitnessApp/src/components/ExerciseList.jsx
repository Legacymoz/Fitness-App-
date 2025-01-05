import { useEffect } from "react";
import useFitnessStore from "../store/zustandStore";


const ExerciseList = () => {
  const { exercises, fetchExercises, setSelectedExercise, fetchExerciseImages, fetchFullExerciseInfo } = useFitnessStore();

  useEffect(() => {
    fetchExercises(); // Fetch data on component mount
    fetchFullExerciseInfo();
    fetchExerciseImages()

  }, [fetchExercises]);

  useEffect(()=>{
    console.log("Exercises Loading complete")
  },[exercises])

  return (
    <div>
      <select
        onChange={(e) => {
          setSelectedExercise(e.target.value);
        }}
      >
        <option value="">Select an exercise</option>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name || "Unnamed Exercise"}
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
