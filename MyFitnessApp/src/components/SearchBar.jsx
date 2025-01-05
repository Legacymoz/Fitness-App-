import React, { useState, useEffect } from "react";
import useFitnessStore from "../store/zustandStore";
import SearchExerciseDetails from "./SearchExerciseDetails";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const {
    fullExerciseInfo,
    fetchFullExerciseInfo,
    isFullExerciseLoading: loading,
  } = useFitnessStore();
  const [selectedExercise, setSelectedExercise] = useState(null);

  const filteredExercises = fullExerciseInfo.filter((exercise) => {
    const lowerCaseQuery = query.toLowerCase();

    return (
      exercise.name.toLowerCase().includes(lowerCaseQuery) ||
      (exercise.category?.name &&
        exercise.category.name.toLowerCase().includes(lowerCaseQuery)) ||
      (exercise.muscles &&
        exercise.muscles.some((muscle) =>
          muscle.name.toLowerCase().includes(lowerCaseQuery)
        )) ||
      (exercise.muscles_secondary &&
        exercise.muscles_secondary.some((muscle) =>
          muscle.name.toLowerCase().includes(lowerCaseQuery)
        ))
    );
  });

  useEffect(() => {
   
   
    fetchFullExerciseInfo();
  }, []);
  useEffect(() => {
   
   
    
  }, []);

  return (
    <div>
      <h2>Search Exercises</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, muscle, or category..."
      />

      {filteredExercises.length > 0 ? (
        <div>
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} style={{ margin: "5px 0" }}>
              <h3
                onClick={() =>
                  setSelectedExercise(
                    selectedExercise?.id === exercise.id ? null : exercise
                  )
                }
              >
                {exercise.name}
              </h3>
              {selectedExercise?.id === exercise.id && (
                <SearchExerciseDetails exercise={selectedExercise} />
              )}
            </div>
          ))}
          {loading && <p>Loading exercises, please wait...</p>}
        </div>
      ) : (
        !loading && <p>No exercises found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchBar;
