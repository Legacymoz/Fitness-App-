import React, { useState,useEffect } from 'react'
import useFitnessStore from '../store/zustandStore'

const ExerciseDetails = ({exerciseId}) => {
  // Get exercises and exerciseImages from the Zustand store
  const { exercises, exerciseImages } = useFitnessStore();

  // State to keep track of the described exercise
  const [describedExercise, setDescribedExercise] = useState(null);

  // State to keep track of the image URL for the described exercise
  const [imageUrl, setImageUrl] = useState(null);

  // useEffect hook to update the described exercise and image URL when exerciseId or exercises change
  useEffect(() => {
    console.log("my exerciseId", exerciseId);

    // Find the described exercise when component loads or exerciseId changes
    const foundExercise = exercises.find(
      (exercise) => exercise.id === parseInt(exerciseId, 10)
    );
    setDescribedExercise(foundExercise);

    if (foundExercise) {
      // Find the corresponding image for the described exercise
      const foundImage = exerciseImages.find(
        (image) => image.exercise_base === foundExercise.exercise_base
      );
      setImageUrl(foundImage?.image || null);
      console.log("my image URLs", exerciseImages);
      console.log("my full description exercise", exercises);
    }
  }, [exerciseId, exercises, exerciseImages]);

  // If the described exercise is not found, display a loading message
  if (!describedExercise) {
    return <div>Loading exercise details...</div>;
  }
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {describedExercise.name}
      </h3>
      <p className="text-gray-800 mb-2">
        <strong>Description: </strong>
        <span
          dangerouslySetInnerHTML={{
            __html: describedExercise.description || "No description available",
          }}
        />
      </p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={describedExercise.name}
          className="w-full max-w-xs max-h-48 h-auto rounded-md mb-4 mx-auto"
        />
      )}
    </div>
  );
}

export default ExerciseDetails