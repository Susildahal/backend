const express = require("express");
const router = express.Router();
const { saveData } = require("../Controllers/pratic"); // Ensure correct path

// Define route (POST for saving data)
router.post("/", saveData);

module.exports = router;
