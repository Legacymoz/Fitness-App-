import React, { useState } from "react";
import ExerciseDetails from "./ExerciseDetails";
import Modal from "./Modal";

const ExerciseDetailsButton = ({ exerciseId }) => {
  const [showDetails, setShowDetails] = useState(false); // State to toggle details visibility

  const handleClick = () => {
    setShowDetails((prev) => !prev); // Toggle the visibility
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-green-700 h-11 w-20 text-white px-4 py-2 rounded"
      >
        Details
      </button>
      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
        <ExerciseDetails exerciseId={exerciseId} />
      </Modal>
    </div>
  );
};

export default ExerciseDetailsButton;
