import React from 'react'
import TotalWeightBarChart from "./components/TotalWeightBarChart";
import TotalWorkoutsLineGraphs from "./components/TotalWorkoutsLineGraphs";

const ProgressCharts = () => {
    
  return (
    <div>
        <TotalWorkoutsLineGraphs/>
        <TotalWeightBarChart/>
    </div>
  )
}

export default ProgressCharts