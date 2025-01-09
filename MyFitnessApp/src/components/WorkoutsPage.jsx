import React from 'react'
import WorkoutLog from './WorkoutLog'
import AllWorkoutList from './AllWorkoutsList'

const WorkoutsPage = () => {
  return (
    <div>
        <h1>Workouts</h1>
        <div>
            <WorkoutLog />
        </div>
        <div>
            <AllWorkoutList />
        </div>
    </div>
  )
}

export default WorkoutsPage