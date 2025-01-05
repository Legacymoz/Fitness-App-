import React from 'react'



const SearchExerciseDetails = ({ exercise }) => {
  return (
    <div>
      <p>
        <strong>Description: </strong>
        <span
          dangerouslySetInnerHTML={{
            __html: exercise.description || "No description available",
          }}
        />
      </p>
      <img
        src={
          exercise.images.length > 0
            ? exercise.images[0].image
            : "https://via.placeholder.com/150"
        }
        alt={exercise.name}
      />
      <p>
        <strong>Category: </strong>
        {exercise.category?.name || "N/A"}
      </p>
      <p>
        <strong>Primary Muscles: </strong>
        {exercise.muscles.length > 0
          ? exercise.muscles.map((muscle) => muscle.name_en).join(", ")
          : "N/A"}
      </p>
      <p>
        <strong>Secondary Muscles: </strong>
        {exercise.muscles_secondary.length > 0
          ? exercise.muscles_secondary
              .map((muscle) => muscle.name_en)
              .join(", ")
          : "N/A"}
      </p>
      <p>
        <strong>Equipment: </strong>
        {exercise.equipment.length > 0
          ? exercise.equipment.map((item) => item.name).join(", ")
          : "None"}
      </p>
    </div>
  );
};

export default SearchExerciseDetails