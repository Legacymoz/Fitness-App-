import React from 'react'
import CalendarView from './CalendarView'
import TodayWorkout from './TodayWorkout'

const HomePage = () => {

  return (
    <div>
        <div>
            <h1>Hello,</h1>
            <p>Ready to Make your Body Perfect</p>
        </div>
        <div>
            <CalendarView />
        </div>
        <div>
            <TodayWorkout />
        </div>
    </div>
  )
}

export default HomePage