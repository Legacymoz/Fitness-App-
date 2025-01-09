import React from "react";
import useFitnessStore from "../store/zustandStore";

const EditButton = ({ workout }) => {
  const { setEditingWorkout } = useFitnessStore();
  

  const handleEdit = () => {
    setEditingWorkout(workout);
  };

  return (
    <button className="ml-2 text-blue-500" onClick={handleEdit}>
      Edit
    </button>
  );
};

export default EditButton;
