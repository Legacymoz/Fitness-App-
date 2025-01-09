// import useFitnessStore from "../store/zustandStore";
// import React, { useState, useEffect } from "react";
// import ExerciseDetails from "./ExerciseDetails";
// import ExerciseDetailsButton from "./ExerciseDetailsButton";
// import DeleteButton from "./DeleteButton";
// import DoneButton from "./DoneButton";
// import EditButton from "./EditButton";

// const TodayWorkout = () => {
//   const [presentWorkout, setPresentWorkout] = useState([]);
//   const {
//     workouts,previousWorkouts,
//     presentDayWorkouts,
//     setPresentDayWorkouts,
//   } = useFitnessStore();

//   useEffect(() => {
//     // Call the setPresentDayWorkouts method on component mount to set today's workouts
//     setPresentDayWorkouts();
//   }, [workouts, setPresentDayWorkouts]);

//   useEffect(() => {
//     setPresentWorkout(presentDayWorkouts); // Update the presentWorkout state when presentDayWorkouts from store changes
//   }, [presentDayWorkouts]);
  

  

//   return (
//     <div>
//       <h1>Todays Workout</h1>
//       {presentWorkout.length > 0 ? (
//         presentWorkout.map((workout) => (
//           <div key={ workout.timestamp}>
//             <h2>{workout.exerciseName}</h2> {/* Access exercise name */}
//             <p>Sets: {workout.sets}</p> {/* Display sets */}
//             <p>Reps: {workout.reps}</p> {/* Display reps */}
//             <p>Weight: {workout.weight}</p> {/* Display weight if necessary */}
//             <ExerciseDetailsButton exerciseId={workout.exerciseId} />
//             <DeleteButton timestamp={workout.timestamp} />
//             <DoneButton timestamp={workout.timestamp} />
//             <EditButton workout={workout} />
//           </div>
//         ))
//       ) : (
//         <p>No workout logged for today.</p> // If no workouts, display this message
//       )}
//     </div>
//   );
// };

// export default TodayWorkout;

import React, { useState, useEffect } from "react";
import useFitnessStore from "../store/zustandStore";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import DoneButton from "./DoneButton";

const TodaysWorkouts = () => {
  const { presentDayWorkouts, setPresentDayWorkouts, workouts } = useFitnessStore();
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    setPresentDayWorkouts();
  }, [setPresentDayWorkouts, workouts]);

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout((prevWorkout) =>
      prevWorkout === workout ? null : workout
    );
  };

  return (
    <div>
      <h2>Today's Workouts</h2>
      {presentDayWorkouts.length > 0 ? (
        <ul>
          {presentDayWorkouts.map((workout, index) => (
            <li key={index}>
              <h2
                onClick={() => handleWorkoutClick(workout)}
                style={{ cursor: "pointer" }}
              >
                {workout.exerciseName}
              </h2>
              {selectedWorkout === workout && (
                <div>
                  <p>Sets: {workout.sets}</p>
                  <p>Reps: {workout.reps}</p>
                  <p>Weight: {workout.weight}</p>
                  <EditButton workout={workout} />
                  <DoneButton timestamp={workout.timestamp} />
                  <DeleteButton timestamp={workout.timestamp} />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts for today.</p>
      )}
    </div>
  );
};

export default TodaysWorkouts;