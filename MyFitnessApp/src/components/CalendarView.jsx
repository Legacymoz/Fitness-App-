import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Calendar.css"; // Import the custom CSS file
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

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      const hasWorkouts = workouts.some(
        (workout) => formatDate(new Date(workout.timestamp)) === dateStr
      );
      if (hasWorkouts) {
        return <div className="indicator"></div>;
      }
    }
    return null;
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-full md:max-w-4xl mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center">
        Workout Calendar
      </h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={tileContent}
      />
      <div className="mt-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">
          Workouts for {formatDate(selectedDate)}
        </h3>
        {selectedDateWorkouts.length > 0 ? (
          <ul className="list-disc list-inside">
            {selectedDateWorkouts.map((workout, index) => (
              <li key={index} className="text-gray-600">
                {workout.exerciseName}: {workout.sets} sets, {workout.reps}{" "}
                reps, {workout.weight} kg
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No workouts for this date.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
