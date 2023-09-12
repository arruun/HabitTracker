import React from "react";
import { useState, useContext, useEffect } from "react";
import HabitContext from "../context/HabitContext";
import HabitItem from "./HabitItem";

const Home = () => {
  const [habit, setHabit] = useState("");

  const context = useContext(HabitContext);
  const { addHabit, habits, getHabits } = context;

  // Fetching habits initially
  useEffect(() => {
    getHabits();
  }, []);

  const onChange = (e) => {
    setHabit(e.target.value);
  };

  // Add Habit handler
  const clickHandler = (e) => {
    e.preventDefault();
    addHabit(habit);
    setHabit("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="habit" className="form-label mt-3 mb-3">
                <h3>Add Habit</h3>
              </label>
              <input
                type="text"
                className="form-control"
                required
                id="habit"
                name="habit"
                onChange={onChange}
                value={habit}
                placeholder="e.g. : Go to gym."
              />
            </div>
            <button
              disabled={habit.length < 1}
              onClick={clickHandler}
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </form>
        </div>
        <div className="col-md-6 container">
          <h3 className="p-3">Your Habits</h3>
          <div className="container">
            {habits.length === 0 && "No habits to display"}
          </div>
          {habits.map((habit, index) => {
            return <HabitItem key={index} habit={habit} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
