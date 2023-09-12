import React, { useState } from "react";
import HabitContext from "./HabitContext";

const HabitState = (props) => {
  const [habits, setHabits] = useState([]);

  const host = "https://the-habit-tracker.onrender.com";

  // Fetching habits from backend
  const getHabits = async () => {
    let url = `${host}/habits/get-habits`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newHabits = await response.json();
    setHabits(newHabits);
  };

  // Getting previous 7 dates.
  const getDates = () => {
    const dates = [];
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      dates.push({ date: date.toISOString().slice(0, 10), activity: "none" });
    }
    return dates;
  };

  // Adding new Habit
  const addHabit = async (info) => {
    let url = `${host}/habits/create`;
    const dates = getDates();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ info, dates }),
    });

    const habit = await response.json();
    setHabits(habits.concat(habit));
  };

  // Deleting the habit
  const deleteHabit = async (id) => {
    let url = `${host}/habits/delete-habit/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({}),
    });
    const json = await response.json();

    // console.log(json);

    const newHabits = habits.filter((i) => {
      return i._id !== id;
    });
    setHabits(newHabits);
  };

  // Editing status based on clicked icon type

  const editStatusDone = async (habitId, dateId) => {
    let url = `${host}/habits/update-status`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habitId, dateId, clickedIcon: "done" }),
    });
    const json = await response.json();

    // console.log(json);

    getHabits();

    // Doing changes only in Frontend
    // const newHabits = habits.map((habit) => {
    //   if (habit.id === id) {
    //     const newDates = habit.dates.map((d) => {
    //       if (date === d.date) {
    //         return { ...d, activity: d.activity === "done" ? "none" : "done" };
    //       }
    //       return d;
    //     });
    //     habit.dates = newDates;
    //   }
    //   return habit;
    // });
    // setHabits(newHabits);
  };

  const editStatusNotDone = async (habitId, dateId) => {
    // API Call
    let url = `${host}/habits/update-status`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habitId, dateId, clickedIcon: "notdone" }),
    });
    const json = await response.json();

    //  console.log(json);

    getHabits();
  };

  const editStatusNone = async (habitId, dateId) => {
    let url = `${host}/habits/update-status`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habitId, dateId, clickedIcon: "none" }),
    });
    const json = await response.json();

    // console.log(json);

    getHabits();
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        deleteHabit,
        editStatusDone,
        editStatusNotDone,
        editStatusNone,
        getHabits,
      }}
    >
      {props.children}
    </HabitContext.Provider>
  );
};

export { HabitState };
