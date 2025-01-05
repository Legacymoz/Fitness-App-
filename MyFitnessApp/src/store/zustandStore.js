import { create } from "zustand";
import axios from "axios";
import { useEffect } from "react";

const useFitnessStore = create((set) => ({
  //holds a list of exercises fetched from the API
  testingUrl: "",
  exercises: [],
  //   fetchExercises: async () => {
  //     try {
  //       let allExercises = "";
  //       let nextUrl = "https://wger.de/api/v2/exercise-translation/";

  //       while (nextUrl) {
  //         const response = await axios.get(nextUrl);
  //         const data = response.data;
  //         allExercises = [...allExercises, ...data.results];
  //         nextUrl = data.next; // Proceed to the next page if available
  //       }

  //       set({ exercises: allExercises });
  //     } catch (error) {
  //       console.error("Error fetching exercises:", error);
  //     }
  //   },
  isLoading: false,
  fetchExercises: async () => {
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
  workouts: [],
  setWorkouts: (workouts) =>
    set((state) => ({ workouts: [...state.workouts, workouts] })),

  // Helper to normalize a timestamp to the start of the day (midnight)
  normalizedDate: (timestamp) => {
    const date = new Date(timestamp); // Create a Date object from the provided timestamp
    date.setHours(0, 0, 0, 0); // Normalize the time to midnight in the local timezone
    return date.getTime(); // Return the normalized timestamp in milliseconds
  },

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

  fullExerciseInfo: [],
  isFullExerciseLoading: false,

  fetchFullExerciseInfo: async () => {
    try {
      let allExercisesInfo = "";
      let nextUrl = "https://wger.de/api/v2/exerciseinfo/";

      while (nextUrl) {
        const response = await axios.get(nextUrl);
        const data = response.data;
        allExercisesInfo = [...allExercisesInfo, ...data.results];
        nextUrl = data.next; // Proceed to the next page if available
      }

      set({ fullExerciseInfo: allExercisesInfo });
    } catch (error) {
      console.error("Error fetching full exercises info:", error);
    }
  },

  //   fetchFullExerciseInfo: async () => {
  //     try {
  //       set({ isFullExerciseLoading: true });
  //       let nextUrl = "https://wger.de/api/v2/exerciseinfo/";

  //       // Use a loop to fetch all pages
  //       while (nextUrl) {
  //         const response = await axios.get(nextUrl);
  //         const data = response.data;

  //         // Append the new data to the existing state
  //         set((state) => ({
  //           fullExerciseInfo: [...state.fullExerciseInfo, ...data.results],
  //         }));

  //         // Update the next URL for the next iteration
  //         nextUrl = data.next;
  //       }

  //       set({ isFullExerciseLoading: false }); // Loading complete
  //       console.log("All data fetched!");
  //     } catch (error) {
  //       console.error("Error fetching exercises:", error);
  //     }
  //   },
  //   fetchFullExerciseInfo: async () => {
  //     set({ isFullExerciseLoading: true });
  //     try {
  //       let allExercisesInfo = [];
  //       let nextUrl = "https://wger.de/api/v2/exerciseinfo/";

  //       while (nextUrl) {
  //         const response = await axios.get(nextUrl);
  //         const data = response.data;
  //         allExercisesInfo = [
  //           ...allExercisesInfo,
  //           ...data.results.filter(
  //             (item) => !allExercisesInfo.some((e) => e.id === item.id)
  //           ), // Ensure no duplicates by checking the `id`
  //         ];
  //         nextUrl = data.next; // Proceed to the next page if available
  //       }

  //       set({ fullExerciseInfo: allExercisesInfo });
  //     } catch (error) {
  //       console.error("Error fetching full exercises info:", error);
  //     } finally {
  //       set({ isFullExerciseLoading: false });
  //     }
  //   },

  //   deleteWorkout: (id) =>
  //     set((state) => ({
  //       presentDayWorkouts: state.presentDayWorkouts.filter((item) => item.exerciseId !== id),
  //     })),
  deleteWorkout: (timestamp) =>
    set((state) => ({
      presentDayWorkouts: state.presentDayWorkouts.filter(
        (item) => item.timestamp !== timestamp
      ),
      workouts: state.workouts.filter((item) => item.timestamp !== timestamp),
    })),

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

  previousWorkouts: {},
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

      // Return the updated state
      return {
        presentDayWorkouts: updatedPresentDayWorkouts, // Update presentDayWorkouts
        workouts: updatedWorkouts, // Update workouts
        previousWorkouts: updatedPreviousWorkouts, // Update previousWorkouts
      };
    });
  },
}));

export default useFitnessStore;
