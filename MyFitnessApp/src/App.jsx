import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import WorkoutsPage from "./components/WorkoutsPage";
import ProgressPage from "./components/ProgressPage";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/search" element={<SearchBar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
