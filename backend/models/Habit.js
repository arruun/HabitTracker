const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    info: {
      type: String,
      required: true,
    },

    dates: [
      {
        date: {
          type: String,
          required: true,
        },

        activity: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
