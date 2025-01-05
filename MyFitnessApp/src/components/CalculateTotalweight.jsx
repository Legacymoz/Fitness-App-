import React, { useEffect } from "react";
import useFitnessStore from "../store/zustandStore";

const TotalWeightCalculator = () => {
  const { previousWorkouts, setTotalWeight, totalWeights } = useFitnessStore();

  useEffect(() => {
    if (previousWorkouts && Object.keys(previousWorkouts).length > 0) {
      // Calculate and update the total weights
      for (const timestamp in previousWorkouts) {
        if (Object.hasOwn(previousWorkouts, timestamp)) {
          let dailyWeight = 0;

          // Loop through each workout in the timestamped array
          previousWorkouts[timestamp].forEach((workout) => {
            const weight = parseInt(workout.weight, 10) || 0;
            const reps = parseInt(workout.reps, 10) || 0;
            const sets = parseInt(workout.sets, 10) || 0;

            dailyWeight += weight * reps * sets;
          });

          // Update Zustand store with the calculated total weight for the day
          setTotalWeight(timestamp, dailyWeight);
          // console.log(
          //   `Updated total weight for ${new Date(
          //     Number(timestamp)
          //   ).toLocaleDateString()}: ${dailyWeight}`
          // );
          
        }
      }
    }
  }, [previousWorkouts, setTotalWeight]);

  return null; // No UI output since it's only for logic
};

export default TotalWeightCalculator;
