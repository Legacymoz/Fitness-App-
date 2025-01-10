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
- View workout history and monitor progress over time.
- Interactive calendar to view and organize workouts by date.
- Search for exercises and access detailed information about them.
- Edit and delete workouts as needed.
- Visualize progress with charts and graphs.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/fitness-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd fitness-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the application.
2. Use the navigation bar to switch between different sections of the app.
3. Log workouts, view workout history, search for workouts, and track your progress using interactive features.

## Components

1. **HomePage.jsx**  
   Displays a welcome message and includes the CalendarView and TodayWorkout components.

2. **CalendarView.jsx**  
   Interactive calendar to view workouts on specific dates.

3. **TodayWorkout.jsx**  
   Displays today's workouts with options to edit, delete, and view details.

4. **WorkoutLog.jsx**  
   Form to log new workouts.

5. **WorkoutHistory.jsx**  
   Displays a detailed history of past workouts, with expandable sections for individual days.

6. **TotalWeightBarChart.jsx**  
   Bar chart showing the total weight lifted per day.

7. **TotalWorkoutsLineGraph.jsx**  
   Line graph visualizing the total number of workouts over time.

8. **SearchBar.jsx**  
   Component to search for exercises and access detailed information.

9. **ExerciseDetailsButton.jsx**  
   Button to view exercise details in a modal.

10. **EditButton.jsx**  
    Button to edit workout details via a modal.

11. **DeleteButton.jsx**  
    Button to delete a workout from the list.

12. **DoneButton.jsx**  
    Button to mark a workout as completed.

13. **Modal.jsx**  
    Reusable modal component for displaying pop-up content.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add detailed description of changes"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).

