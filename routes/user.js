const express = require("express");
const router = express.Router(); // ✅ Correct usage
const { alldata,savedata } = require("../Controllers/user"); // ✅ Ensure the correct path



// Define the route properly
router.post("/", savedata); // ✅ Use `get()` instead of `use()`\
router.get('/',alldata)



module.exports = router; // ✅ Export the router
