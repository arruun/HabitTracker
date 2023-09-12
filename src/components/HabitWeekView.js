import React, { useContext } from "react";
import HabitContext from "../context/HabitContext";
import "./HabitItem.css";

const HabitWeekView = ({ habit }) => {
  const context = useContext(HabitContext);
  const { editStatusDone, editStatusNotDone, editStatusNone } = context;

  // Getting date in format Fri, Jul 28
  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", day: "numeric", month: "short" };
    return date.toLocaleDateString(undefined, options);
  };

  // Change status handlers

  const changeStatusDone = (e, item) => {
    editStatusDone(habit._id, item._id);
  };

  const changeStatusNotDone = (e, item) => {
    editStatusNotDone(habit._id, item._id);
  };

  const changeStatusNone = (e, item) => {
    editStatusNone(habit._id, item._id);
  };

  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">
          <h5>{habit.info}</h5>
        </div>
        <div className="card-body">
          <ul className="list-unstyled d-flex justify-content-between">
            {habit.dates.map((item, dateIndex) => (
              <li
                key={dateIndex}
                className="text-center bg-light rounded-4 p-2 d-flex flex-column"
              >
                <span className="mb-2">{getFormattedDate(item.date)}</span>
                <span>
                  <i
                    onClick={(e) => changeStatusDone(e, item)}
                    className={`fa-solid fa-square-check mx-3 ${
                      item.activity === "done" ? "check" : "uncheck"
                    }`}
                  ></i>
                  <i
                    onClick={(e) => changeStatusNotDone(e, item)}
                    className={`fa-solid fa-square-xmark mx-3 ${
                      item.activity === "notdone" ? "check" : "uncheck"
                    }`}
                  ></i>
                  <i
                    onClick={(e) => changeStatusNone(e, item)}
                    className={`fa-solid fa-square-minus mx-3 ${
                      item.activity === "none" ? "check" : "uncheck"
                    }`}
                  ></i>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HabitWeekView;
