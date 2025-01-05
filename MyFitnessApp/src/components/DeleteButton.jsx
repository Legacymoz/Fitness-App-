import React from 'react'
import useFitnessStore from '../store/zustandStore'


const DeleteButton = ({ timestamp }) => {
    const {deleteWorkout}= useFitnessStore()
    
  return (
    <div>
        <button onClick={()=>{deleteWorkout(timestamp)}}>Delete</button>
        
    </div>
  )
}

export default DeleteButton