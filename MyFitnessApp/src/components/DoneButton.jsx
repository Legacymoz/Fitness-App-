import React from "react";
import useFitnessStore from "../store/zustandStore";

const DoneButton = ({ timestamp }) => {
  const { setPreviousWorkouts } = useFitnessStore();

  return (
    <div>
      <button
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
