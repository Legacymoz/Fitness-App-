import React, { useState } from "react";
import useFitnessStore from "../store/zustandStore";
import Modal from "./Modal";
import EditForm from "./EditForm";

const EditButton = ({ workout }) => {
  const { setEditingWorkout } = useFitnessStore();
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEdit = () => {
    setEditingWorkout(workout);
    setShowEditForm(true);
  };

  const handleCloseModal = () => {
    setShowEditForm(false);
  };

  return (
    <div>
      <button
        className="bg-green-700 h-11 w-auto text-white px-4 py-2 rounded"
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
