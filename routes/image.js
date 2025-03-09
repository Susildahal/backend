const { saveuser, getdata, getdatabyid, deleteuser, updateuser } = require("../Controllers/image");
const express = require("express");
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware'); // ✅ Import correctly

// Create user (Image is required)
router.post('/', upload.single("image"), saveuser);

// Get all users
router.get('/', getdata);

// Get user by ID
router.get('/:id', getdatabyid);

// Delete user by ID
router.delete('/:id', deleteuser);

// Update user (Image is optional)
router.put('/:id', upload.single("image"), updateuser);

module.exports = router;
