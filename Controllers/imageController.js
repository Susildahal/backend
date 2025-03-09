require('../config/cloudinary');

// Controller for uploading a single image
const uploadImage = async (req, res) => {
  try {
    if (req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }
console.log(req.file)
    // Cloudinary image URL is stored in req.file.path
    const imageUrl = req.file.path;
    res.status(202).json({ message: "Image uploaded successfully!",imageUrl: imageUrl,  });// Cloudinary URL 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for uploading multiple images
// const uploadMultipleImages = async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: "No files uploaded!" });
//     }

//     // Get Cloudinary URLs for each uploaded file
//     const imageUrls = req.files.map((file) => file.path);

//     res.json({
//       message: "Images uploaded successfully!",
//       imageUrls: imageUrls,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {uploadImage};
//   uploadMultipleImages,
// };
