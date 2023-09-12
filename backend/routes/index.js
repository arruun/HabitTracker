const express = require("express");
const router = express.Router();

router.use("/habits", require("./habits"));

console.log("router loaded");

module.exports = router;
