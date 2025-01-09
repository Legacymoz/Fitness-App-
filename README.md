# Fitness App

A fitness application to help users track their workouts, view their progress, and manage their exercise routines.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Features

- Log workouts with details such as sets, reps, and weight.
- View workout history and progress over time.
- Interactive calendar to view workouts on specific dates.
- Search for exercises and view detailed information.
- Edit and delete workouts.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/fitness-app.git

   Navigate to the project directory:

2.Install dependencies:
  npm install react react-dom react-router-dom react-scripts zustand tailwindcss react-calendar chart.js react-chartjs-2
  

3. Start the development server:
   npm run dev

##Usage

Open your browser and navigate to http://localhost:5173 to view the application.
Use the navigation bar to switch between different sections of the app.
Log workouts, view workout history,search for workouts, and track your progress.

##Components
1. HomePage.jsx - 
  Displays a welcome message and includes the CalendarView and TodayWorkout components.
2. CalendarView.jsx - 
  Interactive calendar to view workouts on specific dates.
3. TodayWorkout.jsx - 
  Displays today's workouts with options to edit, delete, and view details.
4. WorkoutLog.jsx - 
  Form to log new workouts.
5. WorkoutHistory.jsx -
  Displays the history of workouts with expandable details.
6. TotalWeightBarChart.jsx - 
  Bar chart showing the total weight lifted per day.
7. TotalWorkoutsLineGraphs.jsx -
  Line graph showing the total number of workouts over time.
8. SearchBar.jsx -
  Search for exercises and view detailed information.
9. ExerciseDetailsButton.jsx -
  Button to view detailed information about an exercise in a modal.
10. EditButton.jsx -
  Button to edit a workout in a modal.
11. DeleteButton.jsx -
  Button to delete a workout.
12. DoneButton.jsx -
  Button to mark a workout as done.
13. Modal.jsx -
  Reusable modal component to display content in a pop-up window.
  
##Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
