import React from "react";
import { useContext, useEffect } from "react";
import HabitContext from "../context/HabitContext";
import "./HabitItem.css";
import HabitWeekView from "./HabitWeekView";

const WeekView = () => {
  const context = useContext(HabitContext);
  const { habits, getHabits } = context;

  // Fetching habits initially
  useEffect(() => {
    getHabits();
  }, []);

  return (
    <div className="container mt-3">
      <h3 className="mb-3">Habits Weekly Progress</h3>
      <div className="container">
        {habits.length === 0 && "No habits to display"}
      </div>
      <div>
        {habits.map((habit, index) => (
          <HabitWeekView key={index} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default WeekView;
