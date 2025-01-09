// import React, { useState, useEffect } from "react";
// import useFitnessStore from "../store/zustandStore";
// import SearchExerciseDetails from "./SearchExerciseDetails";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const {
//     fullExerciseInfo,
//     fetchFullExerciseInfo,
//     isFullExerciseLoading: loading,
//   } = useFitnessStore();
//   const [selectedExercise, setSelectedExercise] = useState(null);

//   const filteredExercises = fullExerciseInfo.filter((exercise) => {
//     const lowerCaseQuery = query.toLowerCase();

//     return (
//       exercise.name.toLowerCase().includes(lowerCaseQuery) ||
//       (exercise.category?.name &&
//         exercise.category.name.toLowerCase().includes(lowerCaseQuery)) ||
//       (exercise.muscles &&
//         exercise.muscles.some((muscle) =>
//           muscle.name.toLowerCase().includes(lowerCaseQuery)
//         )) ||
//       (exercise.muscles_secondary &&
//         exercise.muscles_secondary.some((muscle) =>
//           muscle.name.toLowerCase().includes(lowerCaseQuery)
//         ))
//     );
//   });

  // useEffect(() => {
   
   
  //   fetchFullExerciseInfo();
  // }, []);
  

//   return (
//     <div>
//       <h2>Search Exercises</h2>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search by name, muscle, or category..."
//       />

//       {filteredExercises.length > 0 ? (
//         <div>
//           {filteredExercises.map((exercise) => (
//             <div key={exercise.id} style={{ margin: "5px 0" }}>
//               <h3
//                 onClick={() =>
//                   setSelectedExercise(
//                     selectedExercise?.id === exercise.id ? null : exercise
//                   )
//                 }
//               >
//                 {exercise.name}
//               </h3>
//               {selectedExercise?.id === exercise.id && (
//                 <SearchExerciseDetails exercise={selectedExercise} />
//               )}
//             </div>
//           ))}
//           {loading && <p>Loading exercises, please wait...</p>}
//         </div>
//       ) : (
//         !loading && <p>No exercises found for "{query}".</p>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

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
    <div>
      <h2>Search Exercises</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setCurrentPage(1); // Reset to first page on new search
        }}
        placeholder="Search by name, muscle, or category..."
      />

      {paginatedExercises.length > 0 ? (
        <div>
          {paginatedExercises.map((exercise) => (
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

          {/* Pagination Controls */}
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        !loading && <p>No exercises found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchBar;
