import React from "react";

const SearchExerciseDetails = ({ exercise }) => {
  return (
    <div className="mt-4 p-4 bg-white rounded-lg ">
      <p className="text-gray-800 mb-2">
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
        className=" w-3/4 md:w-[550px] h-auto max-h-[400px] rounded-md mb-4"
      />
      <p className="text-gray-800 mb-2">
        <strong>Category: </strong>
        {exercise.category?.name || "N/A"}
      </p>
      <p className="text-gray-800 mb-2">
        <strong>Primary Muscles: </strong>
        {exercise.muscles.length > 0
          ? exercise.muscles.map((muscle) => muscle.name_en).join(", ")
          : "N/A"}
      </p>
      <p className="text-gray-800 mb-2">
        <strong>Secondary Muscles: </strong>
        {exercise.muscles_secondary.length > 0
          ? exercise.muscles_secondary
              .map((muscle) => muscle.name_en)
              .join(", ")
          : "N/A"}
      </p>
      <p className="text-gray-800">
        <strong>Equipment: </strong>
        {exercise.equipment.length > 0
          ? exercise.equipment.map((item) => item.name).join(", ")
          : "None"}
      </p>
    </div>
  );
};

export default SearchExerciseDetails;
