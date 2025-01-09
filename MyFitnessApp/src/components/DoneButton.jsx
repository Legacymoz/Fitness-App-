import React from "react";
import useFitnessStore from "../store/zustandStore";

const DoneButton = ({ timestamp }) => {
  const { setPreviousWorkouts } = useFitnessStore();

  return (
    <div>
      <button
        className="bg-green-700 h-11 w-auto text-white px-4 py-2 rounded"
        onClick={() => {
          setPreviousWorkouts(timestamp);
        }}
      >
        Done
      </button>
    </div>
  );
};

export default DoneButton;
