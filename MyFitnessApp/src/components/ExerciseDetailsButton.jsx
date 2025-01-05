import React, { useState } from "react";
import ExerciseDetails from "./ExerciseDetails";

const ExerciseDetailsButton = ({ exerciseId }) => {
  const [showDetails, setShowDetails] = useState(false); // State to toggle details visibility

  const handleClick = () => {
    setShowDetails((prev) => !prev); // Toggle the visibility
  };

  return (
    <div>
      <button onClick={handleClick}>Details</button>
      {showDetails && <ExerciseDetails exerciseId={exerciseId} />}{" "}
      {/* Conditional rendering */}
    </div>
  );
};

export default ExerciseDetailsButton;
