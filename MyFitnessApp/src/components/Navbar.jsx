import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-200 p-4 shadow-md">
      <ul className="flex justify-around items-center">
        <li>
          <Link
            to="/"
            className="text-black text-lg font-semibold hover:text-gray-700"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/workouts"
            className="text-black text-lg font-semibold hover:text-gray-700"
          >
            Workouts
          </Link>
        </li>

        <li>
          <Link
            to="/search"
            className="text-black text-lg font-semibold hover:text-gray-700"
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            to="/progress"
            className="text-black text-lg font-semibold hover:text-gray-700"
          >
            Progress
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
