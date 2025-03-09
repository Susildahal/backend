require("dotenv").config();
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.cloud_Name,
  api_key: process.env.Api_Key,
  api_secret: process.env.Api_Secret,
});

module.exports = cloudinary;
