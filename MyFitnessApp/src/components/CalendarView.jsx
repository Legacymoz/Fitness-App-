// filepath: /c:/Users/Admin/OneDrive/Documents/Front End/ALX-project/Fitness App Project/Fitness_App/MyFitnessApp/src/components/CalendarView.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useFitnessStore from "../store/zustandStore";

const CalendarView = () => {
  const { workouts } = useFitnessStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-CA", { timeZone: "Africa/Nairobi" });
  };

  const selectedDateWorkouts = workouts.filter((workout) => {
    return formatDate(new Date(workout.timestamp)) === formatDate(selectedDate);
  });

  return (
    <div>
      <h1>Workout Calendar</h1>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <div>
        <h2>Workouts for {formatDate(selectedDate)}</h2>
        {selectedDateWorkouts.length > 0 ? (
          <ul>
            {selectedDateWorkouts.map((workout, index) => (
              <li key={index}>
                {workout.exerciseName}: {workout.sets} sets, {workout.reps}{" "}
                reps, {workout.weight} kg
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts for this date.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
