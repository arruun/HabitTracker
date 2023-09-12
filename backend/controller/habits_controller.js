const Habit = require("../models/Habit");

// Fetching all habits
module.exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({});

    res.status(200).json(habits);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
};

// Creating a habit
module.exports.create = async (req, res) => {
  try {
    const { info, dates } = req.body;

    const habit = new Habit({
      info,
      dates,
    });

    const savedHabit = await habit.save();

    res.status(200).json(savedHabit);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
};

// Deleting the habit
module.exports.delete = async (req, res) => {
  try {
    // Find a habit to be deleted and check if it exists
    let habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).send("Habit not found.");
    }

    // actually deleting the habit
    habit = await Habit.findByIdAndDelete(req.params.id);
    return res.json({ success: "Habit successfully deleted", habit: habit });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
};

// Updating the status of habit on particular date
module.exports.updateStatus = async (req, res) => {
  try {
    const { habitId, dateId, clickedIcon } = req.body;

    let habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).send("Habit not found.");
    }

    let newDates = habit.dates.map((d) => {
      // eslint-disable-next-line eqeqeq
      if (d._id == dateId) {
        if (clickedIcon === "done") {
          d.activity = d.activity === "done" ? "none" : "done";
        } else if (clickedIcon === "notdone") {
          d.activity = d.activity === "notdone" ? "none" : "notdone";
        } else {
          d.activity = "none";
        }
      }
      return d;
    });

    let newHabit = { info: habit.info, dates: newDates };

    habit = await Habit.findByIdAndUpdate(
      habitId,
      { $set: newHabit },
      { new: true }
    );

    return res.json({ success: "Status successfully changed", habit: habit });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal server error.", error });
  }
};
