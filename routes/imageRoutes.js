const express = require("express");
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware'); // Import the multer middleware
const { uploadImage} = require('../Controllers/imageController'); // Import controller methods

// Single image upload route
router.post("/", upload.single("image"),uploadImage);


// // Multiple image upload route (optional)
// router.post("/upload-multiple", upload.array("images", 5), uploadMultipleImages);

module.exports = router;
