const express = require("express");
const router = express.Router();

const habitsController = require("../controller/habits_controller");

router.post("/create", habitsController.create);
router.get("/get-habits", habitsController.getHabits);
router.delete("/delete-habit/:id", habitsController.delete);
router.put("/update-status", habitsController.updateStatus);

module.exports = router;
