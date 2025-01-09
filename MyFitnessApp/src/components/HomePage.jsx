import React from "react";
import CalendarView from "./CalendarView";
import TodayWorkout from "./TodayWorkout";

const HomePage = () => {
  return (
    <div className="bg-gray-200  min-h-screen flex flex-col items-center">
      <div className="text-center mb-8 md:mb-3   p-4 md:p-8 w-full ">
        <h1 className="text-4xl md:text-7xl font-bold text-gray-800">Hello,</h1>
        <p className="text-lg text-gray-600">Ready to Make your Body Perfect</p>
      </div>
      <div className="flex-grow p-4 md:p-8 w-full ">
        <CalendarView />
      </div>
      <div className="flex-grow p-4 md:p-8 w-full ">
        <TodayWorkout />
      </div>
    </div>
  );
};

export default HomePage;
