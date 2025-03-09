const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const dburl = process.env.dburl;  // Declare dburl correctly

// Connect to MongoDB using the dburl from the .env file
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

module.exports = mongoose;
