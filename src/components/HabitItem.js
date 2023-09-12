import React, { useContext } from "react";
import "./HabitItem.css";
import HabitContext from "../context/HabitContext";

const HabitItem = ({ habit }) => {
  // Delete habit handler
  const deleteX = () => { 
    deleteHabit(habit._id);
  };

  const context = useContext(HabitContext);
  const { deleteHabit } = context;

  return (
    <div className=" mb-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-content-center">
          <h6>{habit.info}</h6>
          <i
            className="fa-sharp fa-solid fa-trash mx-3 delete"
            onClick={deleteX}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
