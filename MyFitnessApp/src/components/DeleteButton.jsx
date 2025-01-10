import React from 'react'
import useFitnessStore from '../store/zustandStore'


const DeleteButton = ({ timestamp }) => {
    const {deleteWorkout}= useFitnessStore()
    
  return (
    <div>
      <button
        className="bg-green-700 h-11 w-20 text-white px-4 py-2 rounded"
        onClick={() => {
          deleteWorkout(timestamp);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteButton