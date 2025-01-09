import React, { useState, useEffect } from "react";
import useFitnessStore from "../store/zustandStore";
import SearchExerciseDetails from "./SearchExerciseDetails";

const itemsPerPage = 15; // Number of items per page

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const {
    fullExerciseInfo,
    fetchFullExerciseInfo,
    fetchExerciseImages,
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

  // Calculate total pages
  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);

  // Get exercises for the current page
  const paginatedExercises = filteredExercises.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchFullExerciseInfo();
    fetchExerciseImages();
  }, []);

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Search Exercises
      </h2>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setCurrentPage(1); // Reset to first page on new search
        }}
        placeholder="Search by name, muscle, or category..."
        className="block w-full p-2 border border-gray-300 rounded-md mb-4"
      />

      {paginatedExercises.length > 0 ? (
        <div>
          {paginatedExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white p-4 rounded-lg shadow-inner mb-4 cursor-pointer"
              onClick={() =>
                setSelectedExercise(
                  selectedExercise?.id === exercise.id ? null : exercise
                )
              }
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {exercise.name}
              </h3>
              {selectedExercise?.id === exercise.id && (
                <SearchExerciseDetails exercise={selectedExercise} />
              )}
            </div>
          ))}
          {loading && (
            <p className="text-gray-600">Loading exercises, please wait...</p>
          )}

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-green-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-800">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-green-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        !loading && (
          <p className="text-gray-600">No exercises found for "{query}".</p>
        )
      )}
    </div>
  );
};

export default SearchBar;
