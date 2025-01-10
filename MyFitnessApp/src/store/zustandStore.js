import { create } from "zustand";
import axios from "axios";
import { useEffect } from "react";

const useFitnessStore = create((set) => ({
  //holds a list of exercises fetched from the API
  // State to hold all exercises
  exercises: [],
  // State to indicate if exercises have been fetched
  hasFetchedExercises: false,
  // State to indicate if data is loading
  isLoading: false,

  // Function to fetch exercises from the API
  fetchExercises: async () => {
    set({ hasFetchedExercises: true });

    set({ isLoading: true }); // Indicate loading started
    try {
      let allExercises = [];
      let nextUrl = "https://wger.de/api/v2/exercise-translation/";

      while (nextUrl) {
        const response = await axios.get(nextUrl);
        const data = response.data;

        // Append results, ensuring no duplicates by exercise `id`
        allExercises = [
          ...allExercises,
          ...data.results.filter(
            (exercise) => !allExercises.some((e) => e.id === exercise.id)
          ),
        ];

        set({ exercises: allExercises }); // Update the state with fetched exercises
        nextUrl = data.next; // Proceed to the next page if available
      }
      set({ hasFetchedExercises: true });
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      set({ isLoading: false }); // Indicate loading finished
    }
  },

  //holds the id of selected exercise by user
  selectedExercise: "",
  setSelectedExercise: (exerciseId) => set({ selectedExercise: exerciseId }),

  //holds a list of selected workouts
  workouts: JSON.parse(localStorage.getItem("workouts")) || [],
  setWorkouts: (newWorkout) =>
    set((state) => {
      const updatedWorkouts = [...state.workouts, newWorkout];
      localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
      return { workouts: updatedWorkouts };
    }),

  // Helper to normalize a timestamp to the start of the day (midnight)
  normalizedDate: (timestamp) => {
    const date = new Date(timestamp); // Create a Date object from the provided timestamp
    date.setHours(0, 0, 0, 0); // Normalize the time to midnight in the local timezone
    return date.getTime(); // Return the normalized timestamp in milliseconds
  },

  //Holds a list of exercise images fetched from the API
  exerciseImages: [],
  fetchExerciseImages: async () => {
    try {
      let allImages = "";
      let nextUrl = "https://wger.de/api/v2/exerciseimage/";

      while (nextUrl) {
        const response = await axios.get(nextUrl);
        const data = response.data;
        allImages = [...allImages, ...data.results];
        nextUrl = data.next; // Proceed to the next page if available
      }

      set({ exerciseImages: allImages });
    } catch (error) {
      console.error("Error fetching exercise Images:", error);
    }
  },

  //Holds a list of exercise full description fetched from the API
  fullExerciseInfo: [],
  isFullExerciseLoading: false,

  fetchFullExerciseInfo: async () => {
    try {
      set({ isFullExerciseLoading: true });
      let allExercisesInfo = "";
      let nextUrl = "https://wger.de/api/v2/exerciseinfo/";

      while (nextUrl) {
        const response = await axios.get(nextUrl);
        const data = response.data;
        allExercisesInfo = [...allExercisesInfo, ...data.results];
        set({ fullExerciseInfo: allExercisesInfo });
        nextUrl = data.next; // Proceed to the next page if available
      }
       set({ isFullExerciseLoading: false });

      
    } catch (error) {
      console.error("Error fetching full exercises info:", error);
    }
  },

  //function to delete a workout from the workout array
  deleteWorkout: (timestamp) =>
    set((state) => {
      const updatedWorkouts = state.workouts.filter(
        (item) => item.timestamp !== timestamp
      );
      localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
      return { workouts: updatedWorkouts };
    }),

  //holds a list of workouts for the present day
  presentDayWorkouts: [],
  setPresentDayWorkouts: () => {
    set((state) => {
      const currentTimestamp = state.normalizedDate(Date.now()); // Correct use of `state.normalizedDate`
      const todaysWorkouts = state.workouts.filter((workout) => {
        return state.normalizedDate(workout.timestamp) === currentTimestamp;
      });

      return { presentDayWorkouts: todaysWorkouts };
    });
  },

  //Holds a list of previous workouts
  previousWorkouts: JSON.parse(localStorage.getItem("previousWorkouts")) || {},
  setPreviousWorkouts: (time) => {
    set((state) => {
      const prevWorkout = state.presentDayWorkouts.find(
        (workout) => workout.timestamp === time
      );

      if (!prevWorkout) {
        console.error("Workout not found for the given timestamp:", time);
        return state; // Early return to prevent further processing if no workout is found
      }

      // Create a copy of presentDayWorkouts excluding the deleted one (workout with timestamp === time)
      const updatedPresentDayWorkouts = state.presentDayWorkouts.filter(
        (workout) => workout.timestamp !== time
      );
      //  Create a copy of workouts excluding the deleted one
      const updatedWorkouts = state.workouts.filter(
        (workout) => workout.timestamp !== time
      );

      // Create a normalized timestamp
      const timestamp = state.normalizedDate(time);

      // Update previousWorkouts
      const updatedPreviousWorkouts = { ...state.previousWorkouts };
      if (!updatedPreviousWorkouts[timestamp]) {
        updatedPreviousWorkouts[timestamp] = []; // Create a new array for the date if it doesn't exist
      }
      updatedPreviousWorkouts[timestamp].push(prevWorkout); // Add the previous workout to the array

      localStorage.setItem(
        "previousWorkouts",
        JSON.stringify(updatedPreviousWorkouts)
      ); // Save to localStorage
      return {
        presentDayWorkouts: updatedPresentDayWorkouts, // Update presentDayWorkouts
        workouts: updatedWorkouts, // Update workouts
        previousWorkouts: updatedPreviousWorkouts, // Update previousWorkouts
      };
    });
  },

  //holds the total weight lifted by the user
  totalWeights: {},
  setTotalWeight: (timestamp, totalWeight) => {
    set((state) => {
      return {
        totalWeights: {
          ...state.totalWeights,
          [timestamp]: totalWeight, // Add the total weight for that timestamp
        },
      };
    });
  },

  totalWorkouts: {}, // This will store the total number of workouts per day
  // Function to calculate total workouts and update totalWorkouts
  setTotalWorkouts: () => {
    set((state) => {
      const updatedTotalWorkouts = {};

      // Loop through each day (timestamp) in previousWorkouts
      for (const timestamp in state.previousWorkouts) {
        if (Object.hasOwn(state.previousWorkouts, timestamp)) {
          const workoutsForTheDay = state.previousWorkouts[timestamp];

          // Calculate the number of workouts for the day
          const totalForDay = workoutsForTheDay.length;

          // Store it in the updatedTotalWorkouts object
          updatedTotalWorkouts[timestamp] = totalForDay;
        }
      }

      // Update the state with the calculated total workouts
      return {
        totalWorkouts: updatedTotalWorkouts,
      };
    });
  },

  editWorkout: (updatedWorkout) =>
    set((state) => {
      const updatedWorkouts = state.workouts.map((workout) =>
        workout.timestamp === updatedWorkout.timestamp
          ? updatedWorkout
          : workout
      );
      localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
      return { workouts: updatedWorkouts };
    }),
  editingWorkout: null,
  setEditingWorkout: (workout) => set({ editingWorkout: workout }),
  clearEditingWorkout: () => set({ editingWorkout: null }),
}));

export default useFitnessStore;
