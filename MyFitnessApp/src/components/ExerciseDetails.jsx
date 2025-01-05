import React, { useState,useEffect } from 'react'
import useFitnessStore from '../store/zustandStore'

const ExerciseDetails = ({exerciseId}) => {
    const { exercises, exerciseImages } = useFitnessStore();
    const [describedExercise, setDescribedExercise] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    

    useEffect(() => {
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
        console.log("my image URLs", exerciseImages)
        console.log("my full description exercise", exercises)
      }
    }, [exerciseId, exercises, exerciseImages]);

    if (!describedExercise) {
      return <div>Loading exercise details...</div>;
    }   
  return (
    <div>
      <h2>{describedExercise.name}</h2>
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt={describedExercise.name} />
        ) : (
          <p>No image available for this exercise.</p>
        )}
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: describedExercise.description,
        }}
      />
    </div>
  );
}

export default ExerciseDetails