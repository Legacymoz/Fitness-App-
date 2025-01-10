import React, { useState } from "react";
import useFitnessStore from "../store/zustandStore";
import Modal from "./Modal";
import EditForm from "./EditForm";

const EditButton = ({ workout }) => {
  // Get the setEditingWorkout function from the Zustand store
  const { setEditingWorkout } = useFitnessStore();

  // State to control the visibility of the EditForm modal
  const [showEditForm, setShowEditForm] = useState(false);

  // Function to handle the edit button click
  const handleEdit = () => {
    setEditingWorkout(workout); // Set the workout to be edited in the Zustand store
    setShowEditForm(true); // Show the EditForm modal
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowEditForm(false); // Hide the EditForm modal
  };

  return (
    <div>
      <button
        className="bg-green-700 h-11 w-20 text-white px-4 py-2 rounded"
        onClick={handleEdit}
      >
        Edit
      </button>
      <Modal isOpen={showEditForm} onClose={handleCloseModal}>
        <EditForm />
      </Modal>
    </div>
  );
};

export default EditButton;
