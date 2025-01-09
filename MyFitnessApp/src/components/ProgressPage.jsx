import React from 'react'
import TotalWeightBarChart from './TotalWeightBarChart'
import TotalWorkoutsLineGraphs from './TotalWorkoutsLineGraphs'
import WorkoutHistory from './WorkoutHistory'

const ProgressPage = () => {
  return (
    <div>
        <h1>Progress</h1>
        <div>
            <WorkoutHistory />
        </div>
        <div>
            <TotalWeightBarChart />
        </div>
        <div>
            <TotalWorkoutsLineGraphs />
        </div>
    </div>
  )
}

export default ProgressPage